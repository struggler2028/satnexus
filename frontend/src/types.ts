export interface SatelliteNode {
  id: int;
  name: string;
  x: number;
  y: number;
  status: 'OPERATIONAL' | 'FAILED';
  is_operational: boolean;
  orbit_plane?: string;
}

export type int = number;

export interface LinkEdge {
  source: int;
  target: int;
  latency: number;
  status: 'ACTIVE' | 'FAILED';
  is_active: boolean;
}

export interface TopologySummary {
  total_satellites: number;
  operational_satellites: number;
  failed_satellites: number;
  total_links: number;
  active_links: number;
  failed_links: number;
}

export interface TopologyResponse {
  nodes: SatelliteNode[];
  links: LinkEdge[];
  summary: TopologySummary;
}

export interface AlternativePath {
  path: number[];
  total_latency_ms: number;
}

export interface RouteResponse {
  source_id: number;
  target_id: number;
  is_reachable: boolean;
  path: number[];
  path_names: string[];
  total_latency_ms: number | null;
  hop_count: number;
  status: 'OPTIMAL' | 'RECOVERED' | 'DISCONNECTED' | 'SAME_NODE';
  computation_time_ms: number;
  alternative_paths: AlternativePath[];
  message?: string;
}

export interface ResilienceMetrics {
  node_availability_pct: number;
  link_availability_pct: number;
  lcc_ratio_pct: number;
  reachability_ratio_pct: number;
  total_satellites: number;
  active_satellites: number;
  failed_satellites: number;
  total_links: number;
  active_links: number;
  failed_links: number;
  network_status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
}

export interface CriticalComponents {
  articulation_points: number[];
  bridges: [number, number][];
  analysis: string;
}

export interface SimulationEvent {
  id: number;
  timestamp: string;
  event_type: string;
  target: string;
  description: string;
  route_latency?: number | null;
  recovery_time_ms?: number | null;
}

export interface ScenarioItem {
  id: string;
  name: string;
  description: string;
  node_count: number;
  link_count: number;
}
