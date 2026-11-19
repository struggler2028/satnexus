import pytest
import networkx as nx
from app.services.graph_service import SatelliteNetworkService


@pytest.fixture
def clean_service():
    """Provides an isolated clean instance of SatelliteNetworkService."""
    service = SatelliteNetworkService()
    service.clear()
    return service


@pytest.fixture
def standard_mesh_service():
    """Provides a fresh instance of SatelliteNetworkService with default topology."""
    service = SatelliteNetworkService()
    service.load_default_topology()
    return service


def test_create_satellite(clean_service):
    """TC-GRAPH-01: Successfully add satellite vertices."""
    assert clean_service.add_satellite(1, "SAT-1", 100.0, 200.0, "LEO-1") is True
    topo = clean_service.get_topology()
    assert topo.summary.total_satellites == 1
    assert topo.nodes[0].name == "SAT-1"
    assert topo.nodes[0].is_operational is True


def test_reject_duplicate_satellite(clean_service):
    """TC-GRAPH-02: Reject duplicate satellite node IDs."""
    clean_service.add_satellite(1, "SAT-1", 100.0, 200.0)
    with pytest.raises(ValueError, match="already exists"):
        clean_service.add_satellite(1, "SAT-1-DUP", 150.0, 250.0)


def test_add_valid_link(clean_service):
    """TC-GRAPH-03: Add weighted communication link between satellites."""
    clean_service.add_satellite(1, "SAT-1", 100.0, 200.0)
    clean_service.add_satellite(2, "SAT-2", 300.0, 200.0)
    assert clean_service.add_link(1, 2, 12.5) is True

    topo = clean_service.get_topology()
    assert topo.summary.total_links == 1
    assert topo.links[0].latency == 12.5


def test_reject_negative_latency(clean_service):
    """TC-GRAPH-04: Reject negative or zero latency link weights."""
    clean_service.add_satellite(1, "SAT-1", 100.0, 200.0)
    clean_service.add_satellite(2, "SAT-2", 300.0, 200.0)

    with pytest.raises(ValueError, match="Link latency must be strictly positive"):
        clean_service.add_link(1, 2, -5.0)

    with pytest.raises(ValueError, match="Link latency must be strictly positive"):
        clean_service.add_link(1, 2, 0.0)


def test_reject_self_loop(clean_service):
    """TC-GRAPH-05: Reject self-loops on satellite nodes."""
    clean_service.add_satellite(1, "SAT-1", 100.0, 200.0)
    with pytest.raises(ValueError, match="Self-loops are not allowed"):
        clean_service.add_link(1, 1, 10.0)


def test_dijkstra_shortest_path(standard_mesh_service):
    """TC-ROUTE-01: Compute Dijkstra shortest path between connected satellites."""
    # From SAT-A1 (1) to SAT-E5 (5)
    # Direct ring path: 1 -> 2 (10) -> 3 (14) -> 5 (17) = 41ms
    # or cross-plane: 1 -> 7 (18) -> 6 (13) -> 5 (12) = 43ms
    route = standard_mesh_service.compute_shortest_path(1, 5)
    assert route.is_reachable is True
    assert route.path[0] == 1
    assert route.path[-1] == 5
    assert route.total_latency_ms is not None
    assert route.total_latency_ms > 0
    assert route.status in ["OPTIMAL", "RECOVERED"]
    assert len(route.path_names) == len(route.path)


def test_dijkstra_same_source_target(standard_mesh_service):
    """TC-ROUTE-04: Source and destination are identical."""
    route = standard_mesh_service.compute_shortest_path(1, 1)
    assert route.is_reachable is True
    assert route.path == [1]
    assert route.total_latency_ms == 0.0
    assert route.status == "SAME_NODE"


def test_dijkstra_unreachable_node(clean_service):
    """TC-ROUTE-03: Destination unreachable in disconnected graph."""
    clean_service.add_satellite(1, "SAT-1", 100.0, 100.0)
    clean_service.add_satellite(2, "SAT-2", 200.0, 200.0)
    clean_service.add_satellite(3, "SAT-3-ISLAND", 500.0, 500.0)
    clean_service.add_link(1, 2, 10.0)

    route = clean_service.compute_shortest_path(1, 3)
    assert route.is_reachable is False
    assert route.status == "DISCONNECTED"
    assert route.path == []
    assert route.total_latency_ms is None


def test_fail_satellite_isolates_node(standard_mesh_service):
    """TC-FAIL-01: Satellite failure isolates node from active routing while preserving topology."""
    standard_mesh_service.fail_satellite(2)
    topo = standard_mesh_service.get_topology()

    sat2 = next(n for n in topo.nodes if n.id == 2)
    assert sat2.status == "FAILED"
    assert sat2.is_operational is False

    # Node 2 must not appear in any active routing path
    route = standard_mesh_service.compute_shortest_path(1, 4)
    assert 2 not in route.path


def test_fail_link_reroutes_path(clean_service):
    """TC-FAIL-03: Link failure deactivates edge and forces rerouting."""
    clean_service.add_satellite(1, "SAT-1", 100, 100)
    clean_service.add_satellite(2, "SAT-2", 200, 100)
    clean_service.add_satellite(3, "SAT-3", 200, 200)
    clean_service.add_satellite(4, "SAT-4", 300, 100)

    # Path 1: 1 -> 2 -> 4 (latency: 10 + 10 = 20)
    # Path 2: 1 -> 3 -> 4 (latency: 15 + 15 = 30)
    clean_service.add_link(1, 2, 10.0)
    clean_service.add_link(2, 4, 10.0)
    clean_service.add_link(1, 3, 15.0)
    clean_service.add_link(3, 4, 15.0)

    # Initial route should take 1 -> 2 -> 4
    r1 = clean_service.compute_shortest_path(1, 4)
    assert r1.path == [1, 2, 4]
    assert r1.total_latency_ms == 20.0

    # Fail the link (2, 4)
    clean_service.fail_link(2, 4)

    # Rerouted path must now take 1 -> 3 -> 4
    r2 = clean_service.compute_shortest_path(1, 4)
    assert r2.path == [1, 3, 4]
    assert r2.total_latency_ms == 30.0


def test_automatic_route_recovery(standard_mesh_service):
    """TC-RECOV-01: Automatic route recovery when intermediate node fails."""
    # Find initial path between 1 and 4
    r1 = standard_mesh_service.compute_shortest_path(1, 4)
    assert r1.is_reachable is True
    original_path = r1.path
    intermediate_node = original_path[1]

    # Fail the intermediate node
    standard_mesh_service.fail_satellite(intermediate_node)

    # Recompute route
    r2 = standard_mesh_service.compute_shortest_path(1, 4)
    assert r2.is_reachable is True
    assert intermediate_node not in r2.path
    assert r2.status == "RECOVERED"


def test_multi_node_cascade_partition(clean_service):
    """TC-PART-01: Multiple failures cause constellation partition."""
    clean_service.add_satellite(1, "A", 100, 100)
    clean_service.add_satellite(2, "B", 200, 100)
    clean_service.add_satellite(3, "C", 300, 100)
    clean_service.add_link(1, 2, 10.0)
    clean_service.add_link(2, 3, 10.0)

    # Fail the bridge satellite 2
    clean_service.fail_satellite(2)

    route = clean_service.compute_shortest_path(1, 3)
    assert route.is_reachable is False
    assert route.status == "DISCONNECTED"


def test_network_reset_restores_health(standard_mesh_service):
    """TC-RESET-01: Reset fully restores all failed nodes and links."""
    standard_mesh_service.fail_satellite(1)
    standard_mesh_service.fail_satellite(2)
    standard_mesh_service.fail_link(3, 4)

    topo_degraded = standard_mesh_service.get_topology()
    assert topo_degraded.summary.failed_satellites == 2
    assert topo_degraded.summary.failed_links == 1

    standard_mesh_service.reset_network()

    topo_restored = standard_mesh_service.get_topology()
    assert topo_restored.summary.failed_satellites == 0
    assert topo_restored.summary.failed_links == 0
    assert topo_restored.summary.operational_satellites == 8


def test_resilience_metrics_calculation(standard_mesh_service):
    """TC-METRIC-01 to 03: Verify resilience metric formulas."""
    m_healthy = standard_mesh_service.get_resilience_metrics()
    assert m_healthy.node_availability_pct == 100.0
    assert m_healthy.link_availability_pct == 100.0
    assert m_healthy.lcc_ratio_pct == 100.0
    assert m_healthy.reachability_ratio_pct == 100.0
    assert m_healthy.network_status == "OPTIMAL"

    # Fail 1 node out of 8 (87.5% availability)
    standard_mesh_service.fail_satellite(1)
    m_degraded = standard_mesh_service.get_resilience_metrics()
    assert m_degraded.node_availability_pct == 87.50
    assert m_degraded.failed_satellites == 1
    assert m_degraded.active_satellites == 7


def test_resilience_metrics_empty_graph(clean_service):
    """TC-METRIC-04: Guard against divide-by-zero on empty constellation."""
    m = clean_service.get_resilience_metrics()
    assert m.node_availability_pct == 0.0
    assert m.link_availability_pct == 0.0
    assert m.lcc_ratio_pct == 0.0
    assert m.reachability_ratio_pct == 0.0
    assert m.network_status == "CRITICAL"


def test_tarjan_cut_vertices_and_bridges(clean_service):
    """TC-ALGO-01: Detect articulation points and bridges."""
    clean_service.add_satellite(1, "SAT-1", 100, 100)
    clean_service.add_satellite(2, "SAT-2", 200, 100)
    clean_service.add_satellite(3, "SAT-3-HUB", 300, 100)
    clean_service.add_satellite(4, "SAT-4", 400, 100)

    clean_service.add_link(1, 2, 10.0)
    clean_service.add_link(2, 3, 10.0)
    clean_service.add_link(3, 4, 10.0)

    crit = clean_service.get_critical_components()
    # In a line 1-2-3-4, nodes 2 and 3 are articulation points
    assert 2 in crit.articulation_points
    assert 3 in crit.articulation_points
    assert len(crit.bridges) == 3


def test_recover_link(standard_mesh_service):
    """Test link recovery."""
    standard_mesh_service.fail_link(1, 2)
    topo = standard_mesh_service.get_topology()
    link12 = next(l for l in topo.links if (l.source == 1 and l.target == 2) or (l.source == 2 and l.target == 1))
    assert link12.is_active is False

    assert standard_mesh_service.recover_link(1, 2) is True
    topo2 = standard_mesh_service.get_topology()
    link12_rec = next(l for l in topo2.links if (l.source == 1 and l.target == 2) or (l.source == 2 and l.target == 1))
    assert link12_rec.is_active is True


def test_walker_delta_scenario(clean_service):
    """Test loading Walker Delta scenario."""
    from app.services.scenario_service import ScenarioService
    assert ScenarioService.load_scenario(clean_service, "walker_delta") is True
    topo = clean_service.get_topology()
    assert topo.summary.total_satellites == 12
    assert topo.summary.total_links == 22


def test_invalid_source_destination(clean_service):
    """Test error handling when querying non-existent satellites."""
    clean_service.add_satellite(1, "A", 100, 100)
    with pytest.raises(ValueError, match="not found"):
        clean_service.compute_shortest_path(1, 999)
