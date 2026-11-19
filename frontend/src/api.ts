import {
  TopologyResponse,
  RouteResponse,
  ResilienceMetrics,
  CriticalComponents,
  SimulationEvent,
  ScenarioItem,
} from './types';

const API_BASE = '/api/v1/network';

export async function fetchTopology(): Promise<TopologyResponse> {
  const res = await fetch(`${API_BASE}/topology`);
  if (!res.ok) throw new Error('Failed to fetch topology');
  return res.json();
}

export async function computeRoute(sourceId: number, targetId: number): Promise<RouteResponse> {
  const res = await fetch(`${API_BASE}/route`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source_id: sourceId, target_id: targetId }),
  });
  if (!res.ok) throw new Error('Failed to compute route');
  return res.json();
}

export async function failSatellite(nodeId: number): Promise<any> {
  const res = await fetch(`${API_BASE}/nodes/${nodeId}/fail`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`Failed to simulate failure of node ${nodeId}`);
  return res.json();
}

export async function recoverSatellite(nodeId: number): Promise<any> {
  const res = await fetch(`${API_BASE}/nodes/${nodeId}/recover`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`Failed to recover node ${nodeId}`);
  return res.json();
}

export async function failLink(sourceId: number, targetId: number): Promise<any> {
  const res = await fetch(`${API_BASE}/links/fail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source_id: sourceId, target_id: targetId }),
  });
  if (!res.ok) throw new Error('Failed to fail link');
  return res.json();
}

export async function recoverLink(sourceId: number, targetId: number): Promise<any> {
  const res = await fetch(`${API_BASE}/links/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source_id: sourceId, target_id: targetId }),
  });
  if (!res.ok) throw new Error('Failed to recover link');
  return res.json();
}

export async function resetNetwork(): Promise<any> {
  const res = await fetch(`${API_BASE}/reset`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to reset network');
  return res.json();
}

export async function fetchResilienceMetrics(): Promise<ResilienceMetrics> {
  const res = await fetch(`${API_BASE}/resilience`);
  if (!res.ok) throw new Error('Failed to fetch resilience metrics');
  return res.json();
}

export async function fetchCriticalComponents(): Promise<CriticalComponents> {
  const res = await fetch(`${API_BASE}/critical-components`);
  if (!res.ok) throw new Error('Failed to fetch critical components');
  return res.json();
}

export async function fetchEvents(): Promise<SimulationEvent[]> {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch event history');
  return res.json();
}

export async function fetchScenarios(): Promise<ScenarioItem[]> {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error('Failed to fetch scenarios');
  return res.json();
}

export async function loadScenario(scenarioId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/scenarios/${scenarioId}/load`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to load scenario');
  return res.json();
}
