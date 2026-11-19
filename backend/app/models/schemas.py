from typing import List, Optional, Tuple
from pydantic import BaseModel, Field


class SatelliteNode(BaseModel):
    id: int
    name: str
    x: float
    y: float
    status: str = "OPERATIONAL"
    is_operational: bool = True
    orbit_plane: Optional[str] = "LEO-Plane-1"


class LinkEdge(BaseModel):
    source: int
    target: int
    latency: float
    status: str = "ACTIVE"
    is_active: bool = True


class TopologySummary(BaseModel):
    total_satellites: int
    operational_satellites: int
    failed_satellites: int
    total_links: int
    active_links: int
    failed_links: int


class TopologyResponse(BaseModel):
    nodes: List[SatelliteNode]
    links: List[LinkEdge]
    summary: TopologySummary


class RouteRequest(BaseModel):
    source_id: int
    target_id: int


class AlternativePath(BaseModel):
    path: List[int]
    total_latency_ms: float


class RouteResponse(BaseModel):
    source_id: int
    target_id: int
    is_reachable: bool
    path: List[int]
    path_names: List[str] = []
    total_latency_ms: Optional[float] = None
    hop_count: int = 0
    status: str = "OPTIMAL"  # OPTIMAL, RECOVERED, DISCONNECTED, SAME_NODE
    computation_time_ms: float = 0.0
    alternative_paths: List[AlternativePath] = []
    message: Optional[str] = None


class LinkFailureRequest(BaseModel):
    source_id: int
    target_id: int


class ResilienceMetricsResponse(BaseModel):
    node_availability_pct: float
    link_availability_pct: float
    lcc_ratio_pct: float
    reachability_ratio_pct: float
    total_satellites: int
    active_satellites: int
    failed_satellites: int
    total_links: int
    active_links: int
    failed_links: int
    network_status: str  # OPTIMAL, DEGRADED, CRITICAL


class CriticalComponentsResponse(BaseModel):
    articulation_points: List[int]
    bridges: List[List[int]]
    analysis: str


class SimulationEventItem(BaseModel):
    id: int
    timestamp: str
    event_type: str
    target: str
    description: str
    route_latency: Optional[float] = None
    recovery_time_ms: Optional[float] = None


class ScenarioItem(BaseModel):
    id: str
    name: str
    description: str
    node_count: int
    link_count: int
