import time
from typing import Dict, List, Optional, Set, Tuple
import networkx as nx

from app.models.schemas import (
    AlternativePath,
    CriticalComponentsResponse,
    LinkEdge,
    ResilienceMetricsResponse,
    RouteResponse,
    SatelliteNode,
    TopologyResponse,
    TopologySummary,
)


class SatelliteNetworkService:
    """Core Graph Simulation Engine for SatNexus.
    
    Maintains an immutable base graph of satellite nodes and inter-satellite
    optical communication links while managing dynamic failure state overlays
    independently. Executes Dijkstra shortest path, Tarjan cut-vertex analysis,
    and resilience analytics.
    """

    def __init__(self):
        # Base graph storing full constellation topology
        self._graph = nx.Graph()
        self._node_attrs: Dict[int, dict] = {}
        self._edge_attrs: Dict[Tuple[int, int], float] = {}

        # Dynamic failure state overlays (isolated from base topology)
        self._failed_satellites: Set[int] = set()
        self._failed_links: Set[Tuple[int, int]] = set()

        # Last selected active route for recovery monitoring
        self._last_source: Optional[int] = None
        self._last_target: Optional[int] = None
        self._baseline_latency: Optional[float] = None

        # Initialize with standard 8-satellite redundant mesh
        self.load_default_topology()

    def _normalize_edge(self, u: int, v: int) -> Tuple[int, int]:
        return (min(u, v), max(u, v))

    def clear(self) -> None:
        """Clear all nodes, links, and state."""
        self._graph.clear()
        self._node_attrs.clear()
        self._edge_attrs.clear()
        self._failed_satellites.clear()
        self._failed_links.clear()
        self._last_source = None
        self._last_target = None
        self._baseline_latency = None

    def add_satellite(
        self,
        node_id: int,
        name: str,
        x: float,
        y: float,
        orbit_plane: str = "LEO-Plane-1",
    ) -> bool:
        """Add a satellite vertex to the constellation."""
        if not name or name.strip() == "":
            raise ValueError("Satellite name cannot be empty")
        if node_id in self._graph:
            raise ValueError(f"Satellite ID {node_id} already exists in constellation")

        self._graph.add_node(node_id)
        self._node_attrs[node_id] = {
            "name": name,
            "x": float(x),
            "y": float(y),
            "orbit_plane": orbit_plane,
        }
        return True

    def add_link(self, u: int, v: int, latency_ms: float) -> bool:
        """Add a bidirectional communication link with positive latency weight."""
        if u not in self._graph:
            raise ValueError(f"Satellite ID {u} does not exist")
        if v not in self._graph:
            raise ValueError(f"Satellite ID {v} does not exist")
        if u == v:
            raise ValueError("Self-loops are not allowed in satellite constellations")
        if latency_ms <= 0:
            raise ValueError("Link latency must be strictly positive (w > 0)")

        norm_edge = self._normalize_edge(u, v)
        self._graph.add_edge(u, v, latency=float(latency_ms))
        self._edge_attrs[norm_edge] = float(latency_ms)
        return True

    def fail_satellite(self, node_id: int) -> bool:
        """Simulate failure of a satellite node."""
        if node_id not in self._graph:
            raise ValueError(f"Satellite ID {node_id} does not exist")
        self._failed_satellites.add(node_id)
        return True

    def recover_satellite(self, node_id: int) -> bool:
        """Restore an individual satellite node to operational state."""
        if node_id in self._failed_satellites:
            self._failed_satellites.remove(node_id)
            return True
        return False

    def fail_link(self, u: int, v: int) -> bool:
        """Simulate failure of an inter-satellite communication link."""
        norm_edge = self._normalize_edge(u, v)
        if norm_edge not in self._edge_attrs:
            raise ValueError(f"Link between {u} and {v} does not exist")
        self._failed_links.add(norm_edge)
        return True

    def recover_link(self, u: int, v: int) -> bool:
        """Restore an inter-satellite link to operational status."""
        norm_edge = self._normalize_edge(u, v)
        if norm_edge in self._failed_links:
            self._failed_links.remove(norm_edge)
            return True
        return False

    def reset_network(self) -> None:
        """Restore all satellites and links to 100% operational status."""
        self._failed_satellites.clear()
        self._failed_links.clear()

    def get_active_subgraph(self) -> nx.Graph:
        """Extract active operational subgraph excluding failed nodes and links."""
        active_nodes = [
            n for n in self._graph.nodes() if n not in self._failed_satellites
        ]
        sub = self._graph.subgraph(active_nodes).copy()

        # Remove failed links
        for u, v in self._failed_links:
            if sub.has_edge(u, v):
                sub.remove_edge(u, v)

        return sub

    def compute_shortest_path(
        self, source_id: int, target_id: int
    ) -> RouteResponse:
        """Compute Dijkstra shortest path over active operational constellation."""
        start_time = time.perf_counter()

        if source_id not in self._graph or target_id not in self._graph:
            raise ValueError("Source or destination satellite ID not found in topology")

        # Handle Source == Target
        if source_id == target_id:
            duration_ms = (time.perf_counter() - start_time) * 1000.0
            return RouteResponse(
                source_id=source_id,
                target_id=target_id,
                is_reachable=True,
                path=[source_id],
                path_names=[self._node_attrs[source_id]["name"]],
                total_latency_ms=0.0,
                hop_count=0,
                status="SAME_NODE",
                computation_time_ms=round(duration_ms, 3),
                alternative_paths=[],
                message="Source and Destination are the same satellite node.",
            )

        # Handle failed source or target
        if source_id in self._failed_satellites:
            duration_ms = (time.perf_counter() - start_time) * 1000.0
            return RouteResponse(
                source_id=source_id,
                target_id=target_id,
                is_reachable=False,
                path=[],
                total_latency_ms=None,
                hop_count=0,
                status="DISCONNECTED",
                computation_time_ms=round(duration_ms, 3),
                alternative_paths=[],
                message=f"Source satellite {self._node_attrs[source_id]['name']} is in FAILED state.",
            )

        if target_id in self._failed_satellites:
            duration_ms = (time.perf_counter() - start_time) * 1000.0
            return RouteResponse(
                source_id=source_id,
                target_id=target_id,
                is_reachable=False,
                path=[],
                total_latency_ms=None,
                hop_count=0,
                status="DISCONNECTED",
                computation_time_ms=round(duration_ms, 3),
                alternative_paths=[],
                message=f"Destination satellite {self._node_attrs[target_id]['name']} is in FAILED state.",
            )

        active_sub = self.get_active_subgraph()

        try:
            path = nx.dijkstra_path(
                active_sub, source_id, target_id, weight="latency"
            )
            total_latency = nx.dijkstra_path_length(
                active_sub, source_id, target_id, weight="latency"
            )

            # Check alternative paths using simple shortest paths generator
            alt_paths: List[AlternativePath] = []
            try:
                paths_gen = nx.shortest_simple_paths(
                    active_sub, source_id, target_id, weight="latency"
                )
                count = 0
                for p in paths_gen:
                    if p != path:
                        l = sum(
                            active_sub[p[i]][p[i + 1]]["latency"]
                            for i in range(len(p) - 1)
                        )
                        alt_paths.append(
                            AlternativePath(path=p, total_latency_ms=round(l, 2))
                        )
                        count += 1
                        if count >= 2:
                            break
            except Exception:
                pass

            duration_ms = (time.perf_counter() - start_time) * 1000.0

            # Determine if this is a primary optimal route or a recovered route
            is_recovered = len(self._failed_satellites) > 0 or len(self._failed_links) > 0
            status_label = "RECOVERED" if is_recovered else "OPTIMAL"

            path_names = [self._node_attrs[nid]["name"] for nid in path]
            self._last_source = source_id
            self._last_target = target_id

            return RouteResponse(
                source_id=source_id,
                target_id=target_id,
                is_reachable=True,
                path=path,
                path_names=path_names,
                total_latency_ms=round(total_latency, 2),
                hop_count=len(path) - 1,
                status=status_label,
                computation_time_ms=round(duration_ms, 3),
                alternative_paths=alt_paths,
                message=f"Active route calculated successfully ({status_label}).",
            )

        except (nx.NetworkXNoPath, nx.NodeNotFound):
            duration_ms = (time.perf_counter() - start_time) * 1000.0
            return RouteResponse(
                source_id=source_id,
                target_id=target_id,
                is_reachable=False,
                path=[],
                path_names=[],
                total_latency_ms=None,
                hop_count=0,
                status="DISCONNECTED",
                computation_time_ms=round(duration_ms, 3),
                alternative_paths=[],
                message="Destination unreachable due to constellation partition or component failure.",
            )

    def get_resilience_metrics(self) -> ResilienceMetricsResponse:
        """Compute 6 quantitative resilience metrics on current constellation state."""
        total_nodes = len(self._graph.nodes())
        total_links = len(self._edge_attrs)

        if total_nodes == 0:
            return ResilienceMetricsResponse(
                node_availability_pct=0.0,
                link_availability_pct=0.0,
                lcc_ratio_pct=0.0,
                reachability_ratio_pct=0.0,
                total_satellites=0,
                active_satellites=0,
                failed_satellites=0,
                total_links=0,
                active_links=0,
                failed_links=0,
                network_status="CRITICAL",
            )

        active_nodes_count = total_nodes - len(self._failed_satellites)
        failed_nodes_count = len(self._failed_satellites)

        active_links_count = total_links - len(self._failed_links)
        failed_links_count = len(self._failed_links)

        # 1. Node Availability (%)
        node_avail = (active_nodes_count / total_nodes) * 100.0

        # 2. Link Availability (%)
        link_avail = (
            (active_links_count / total_links) * 100.0 if total_links > 0 else 0.0
        )

        active_sub = self.get_active_subgraph()

        # 3. Largest Connected Component (LCC) Ratio (%)
        if active_nodes_count == 0 or len(active_sub) == 0:
            lcc_ratio = 0.0
        else:
            components = list(nx.connected_components(active_sub))
            largest_comp = max(len(c) for c in components) if components else 0
            lcc_ratio = (largest_comp / total_nodes) * 100.0

        # 4. Pairwise Reachability Ratio across active operational nodes
        if active_nodes_count <= 1:
            reachability_ratio = 100.0 if active_nodes_count == 1 else 0.0
        else:
            total_pairs = active_nodes_count * (active_nodes_count - 1)
            connected_pairs = 0
            active_node_list = list(active_sub.nodes())
            for i in range(len(active_node_list)):
                for j in range(i + 1, len(active_node_list)):
                    u = active_node_list[i]
                    v = active_node_list[j]
                    if nx.has_path(active_sub, u, v):
                        connected_pairs += 2  # Bidirectional pairs

            reachability_ratio = (connected_pairs / total_pairs) * 100.0

        # Determine overall network health status
        if node_avail >= 95.0 and link_avail >= 95.0 and lcc_ratio >= 95.0:
            net_status = "OPTIMAL"
        elif node_avail >= 70.0 and lcc_ratio >= 60.0:
            net_status = "DEGRADED"
        else:
            net_status = "CRITICAL"

        return ResilienceMetricsResponse(
            node_availability_pct=round(node_avail, 2),
            link_availability_pct=round(link_avail, 2),
            lcc_ratio_pct=round(lcc_ratio, 2),
            reachability_ratio_pct=round(reachability_ratio, 2),
            total_satellites=total_nodes,
            active_satellites=active_nodes_count,
            failed_satellites=failed_nodes_count,
            total_links=total_links,
            active_links=active_links_count,
            failed_links=failed_links_count,
            network_status=net_status,
        )

    def get_critical_components(self) -> CriticalComponentsResponse:
        """Detect articulation points (cut vertices) and bridges using Tarjan's algorithm."""
        active_sub = self.get_active_subgraph()

        if len(active_sub) == 0:
            return CriticalComponentsResponse(
                articulation_points=[],
                bridges=[],
                analysis="Constellation is empty or completely disabled.",
            )

        cut_vertices = list(nx.articulation_points(active_sub))
        bridges = [list(e) for e in nx.bridges(active_sub)]

        analysis_parts = []
        if cut_vertices:
            names = [self._node_attrs[n]["name"] for n in cut_vertices]
            analysis_parts.append(
                f"Critical Satellites (Cut Vertices): {', '.join(names)}. "
                "Failure of any of these will partition the active constellation."
            )
        else:
            analysis_parts.append("No cut vertices detected; node redundancy is healthy.")

        if bridges:
            bridge_names = [
                f"({self._node_attrs[u]['name']} <-> {self._node_attrs[v]['name']})"
                for u, v in bridges
            ]
            analysis_parts.append(
                f"Critical Bridge Links: {', '.join(bridge_names)}. "
                "Loss of these links will cause network partitions."
            )
        else:
            analysis_parts.append("No bridge links detected; link redundancy is healthy.")

        return CriticalComponentsResponse(
            articulation_points=cut_vertices,
            bridges=bridges,
            analysis=" ".join(analysis_parts),
        )

    def get_topology(self) -> TopologyResponse:
        """Get the complete constellation topology with component states."""
        nodes: List[SatelliteNode] = []
        for nid, data in self._node_attrs.items():
            is_failed = nid in self._failed_satellites
            nodes.append(
                SatelliteNode(
                    id=nid,
                    name=data["name"],
                    x=data["x"],
                    y=data["y"],
                    status="FAILED" if is_failed else "OPERATIONAL",
                    is_operational=not is_failed,
                    orbit_plane=data.get("orbit_plane", "LEO-Plane-1"),
                )
            )

        links: List[LinkEdge] = []
        for (u, v), latency in self._edge_attrs.items():
            is_failed = (u, v) in self._failed_links
            # Link also considered inactive if either endpoint satellite has failed
            endpoint_failed = (
                u in self._failed_satellites or v in self._failed_satellites
            )
            links.append(
                LinkEdge(
                    source=u,
                    target=v,
                    latency=latency,
                    status="FAILED" if (is_failed or endpoint_failed) else "ACTIVE",
                    is_active=not (is_failed or endpoint_failed),
                )
            )

        total_nodes = len(nodes)
        failed_nodes = len(self._failed_satellites)
        total_links = len(links)
        failed_links = len(self._failed_links)

        summary = TopologySummary(
            total_satellites=total_nodes,
            operational_satellites=total_nodes - failed_nodes,
            failed_satellites=failed_nodes,
            total_links=total_links,
            active_links=total_links - failed_links,
            failed_links=failed_links,
        )

        return TopologyResponse(nodes=nodes, links=links, summary=summary)

    def load_default_topology(self) -> None:
        """Load default 8-satellite redundant mesh scenario."""
        self.clear()
        # 8 satellites with 2D coordinates arranged in an orbital ring mesh
        satellites = [
            (1, "SAT-A1", 150.0, 180.0, "LEO-Polar-1"),
            (2, "SAT-B2", 350.0, 120.0, "LEO-Polar-1"),
            (3, "SAT-C3", 600.0, 130.0, "LEO-Polar-1"),
            (4, "SAT-D4", 800.0, 220.0, "LEO-Polar-1"),
            (5, "SAT-E5", 850.0, 450.0, "LEO-Polar-2"),
            (6, "SAT-F6", 650.0, 550.0, "LEO-Polar-2"),
            (7, "SAT-G7", 400.0, 520.0, "LEO-Polar-2"),
            (8, "SAT-H8", 180.0, 420.0, "LEO-Polar-2"),
        ]
        for nid, name, x, y, plane in satellites:
            self.add_satellite(nid, name, x, y, plane)

        # 13 inter-satellite crosslinks with latency in ms (w > 0)
        links = [
            (1, 2, 10.0),
            (2, 3, 14.0),
            (3, 4, 11.0),
            (4, 5, 15.0),
            (5, 6, 12.0),
            (6, 7, 13.0),
            (7, 8, 10.0),
            (8, 1, 16.0),
            # Cross-plane inter-satellite links for redundancy
            (1, 7, 18.0),
            (2, 8, 20.0),
            (2, 6, 25.0),
            (3, 7, 22.0),
            (3, 5, 17.0),
        ]
        for u, v, w in links:
            self.add_link(u, v, w)


# Global singleton instance
graph_service = SatelliteNetworkService()
