from fastapi.testclient import TestClient
import pytest
from app.main import app

client = TestClient(app)


def test_health_endpoint():
    """TC-API-01: Health check returns 200 and healthy status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_get_topology():
    """TC-API-01: Topology endpoint returns nodes, links, and summary."""
    response = client.get("/api/v1/network/topology")
    assert response.status_code == 200
    data = response.json()
    assert "nodes" in data
    assert "links" in data
    assert "summary" in data
    assert data["summary"]["total_satellites"] >= 8


def test_post_route_calculation():
    """TC-API-02: Route calculation between valid nodes."""
    response = client.post(
        "/api/v1/network/route",
        json={"source_id": 1, "target_id": 4},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["is_reachable"] is True
    assert data["source_id"] == 1
    assert data["target_id"] == 4
    assert len(data["path"]) >= 2
    assert data["total_latency_ms"] > 0


def test_post_node_fail():
    """TC-API-03: Simulate satellite node failure."""
    response = client.post("/api/v1/network/nodes/2/fail")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["node_id"] == 2

    # Check topology reflects failure
    topo = client.get("/api/v1/network/topology").json()
    sat2 = next(n for n in topo["nodes"] if n["id"] == 2)
    assert sat2["status"] == "FAILED"
    assert sat2["is_operational"] is False


def test_post_node_recover():
    """Restore failed satellite."""
    response = client.post("/api/v1/network/nodes/2/recover")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"

    topo = client.get("/api/v1/network/topology").json()
    sat2 = next(n for n in topo["nodes"] if n["id"] == 2)
    assert sat2["status"] == "OPERATIONAL"


def test_post_link_fail():
    """Simulate link failure."""
    response = client.post(
        "/api/v1/network/links/fail",
        json={"source_id": 1, "target_id": 2},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "SUCCESS"


def test_post_network_reset():
    """Reset constellation."""
    response = client.post("/api/v1/network/reset")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"

    topo = client.get("/api/v1/network/topology").json()
    assert topo["summary"]["failed_satellites"] == 0
    assert topo["summary"]["failed_links"] == 0


def test_get_resilience_metrics():
    """Retrieve resilience analytics."""
    response = client.get("/api/v1/network/resilience")
    assert response.status_code == 200
    data = response.json()
    assert "node_availability_pct" in data
    assert "link_availability_pct" in data
    assert "lcc_ratio_pct" in data
    assert "reachability_ratio_pct" in data


def test_get_critical_components():
    """Detect articulation points and bridges."""
    response = client.get("/api/v1/network/critical-components")
    assert response.status_code == 200
    data = response.json()
    assert "articulation_points" in data
    assert "bridges" in data
    assert "analysis" in data


def test_scenarios_listing_and_loading():
    """List and load constellation scenarios."""
    scenarios_resp = client.get("/api/v1/network/scenarios")
    assert scenarios_resp.status_code == 200
    scenarios = scenarios_resp.json()
    assert len(scenarios) >= 3

    # Load starlink polar scenario
    load_resp = client.post("/api/v1/network/scenarios/starlink_polar/load")
    assert load_resp.status_code == 200
    data = load_resp.json()
    assert data["status"] == "SUCCESS"
    assert data["topology"]["summary"]["total_satellites"] == 10
