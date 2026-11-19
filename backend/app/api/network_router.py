from typing import List, Optional
from fastapi import APIRouter, HTTPException, status

from app.models.schemas import (
    CriticalComponentsResponse,
    LinkEdge,
    LinkFailureRequest,
    ResilienceMetricsResponse,
    RouteRequest,
    RouteResponse,
    ScenarioItem,
    SimulationEventItem,
    TopologyResponse,
)
from app.services.audit_service import audit_service
from app.services.graph_service import graph_service
from app.services.scenario_service import ScenarioService

router = APIRouter(prefix="/network", tags=["Satellite Network Simulation"])


@router.get("/topology", response_model=TopologyResponse)
def get_topology():
    """Retrieve full satellite constellation topology with component operational states."""
    return graph_service.get_topology()


@router.post("/route", response_model=RouteResponse)
def compute_route(req: RouteRequest):
    """Compute Dijkstra shortest path between source and target satellites."""
    try:
        route = graph_service.compute_shortest_path(req.source_id, req.target_id)
        if route.is_reachable:
            audit_service.log_event(
                event_type="ROUTE_COMPUTED",
                target=f"SAT-{req.source_id} -> SAT-{req.target_id}",
                description=f"Calculated path {route.path_names} with latency {route.total_latency_ms}ms",
                route_latency=route.total_latency_ms,
                recovery_time_ms=route.computation_time_ms,
            )
        else:
            audit_service.log_event(
                event_type="ROUTE_DISCONNECTED",
                target=f"SAT-{req.source_id} -> SAT-{req.target_id}",
                description="Destination unreachable due to network partition.",
            )
        return route
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/nodes/{node_id}/fail")
def fail_satellite_node(node_id: int):
    """Simulate failure of a satellite node."""
    try:
        graph_service.fail_satellite(node_id)
        topo = graph_service.get_topology()
        node_name = next((n.name for n in topo.nodes if n.id == node_id), f"SAT-{node_id}")

        event = audit_service.log_event(
            event_type="NODE_FAILURE",
            target=node_name,
            description=f"Satellite {node_name} suffered failure and was taken offline.",
        )

        # If a route was active, recalculate it
        recovered_route: Optional[RouteResponse] = None
        if graph_service._last_source and graph_service._last_target:
            recovered_route = graph_service.compute_shortest_path(
                graph_service._last_source, graph_service._last_target
            )

        return {
            "status": "SUCCESS",
            "message": f"Satellite {node_name} marked as FAILED.",
            "node_id": node_id,
            "recovered_route": recovered_route,
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@router.post("/nodes/{node_id}/recover")
def recover_satellite_node(node_id: int):
    """Restore an individual failed satellite node to operational status."""
    try:
        success = graph_service.recover_satellite(node_id)
        topo = graph_service.get_topology()
        node_name = next((n.name for n in topo.nodes if n.id == node_id), f"SAT-{node_id}")

        if success:
            audit_service.log_event(
                event_type="NODE_RECOVERED",
                target=node_name,
                description=f"Satellite {node_name} rebooted and restored to service.",
            )

        recovered_route: Optional[RouteResponse] = None
        if graph_service._last_source and graph_service._last_target:
            recovered_route = graph_service.compute_shortest_path(
                graph_service._last_source, graph_service._last_target
            )

        return {
            "status": "SUCCESS" if success else "NOOP",
            "message": f"Satellite {node_name} restored to OPERATIONAL.",
            "node_id": node_id,
            "recovered_route": recovered_route,
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/links/fail")
def fail_communication_link(req: LinkFailureRequest):
    """Simulate failure of an inter-satellite communication link."""
    try:
        graph_service.fail_link(req.source_id, req.target_id)
        link_str = f"Link ({req.source_id} <-> {req.target_id})"

        audit_service.log_event(
            event_type="LINK_FAILURE",
            target=link_str,
            description=f"Inter-satellite optical crosslink {link_str} lost.",
        )

        recovered_route: Optional[RouteResponse] = None
        if graph_service._last_source and graph_service._last_target:
            recovered_route = graph_service.compute_shortest_path(
                graph_service._last_source, graph_service._last_target
            )

        return {
            "status": "SUCCESS",
            "message": f"Link between {req.source_id} and {req.target_id} marked as FAILED.",
            "recovered_route": recovered_route,
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/links/recover")
def recover_communication_link(req: LinkFailureRequest):
    """Restore an inter-satellite link to operational status."""
    try:
        success = graph_service.recover_link(req.source_id, req.target_id)
        link_str = f"Link ({req.source_id} <-> {req.target_id})"

        if success:
            audit_service.log_event(
                event_type="LINK_RECOVERED",
                target=link_str,
                description=f"Inter-satellite crosslink {link_str} re-established.",
            )

        recovered_route: Optional[RouteResponse] = None
        if graph_service._last_source and graph_service._last_target:
            recovered_route = graph_service.compute_shortest_path(
                graph_service._last_source, graph_service._last_target
            )

        return {
            "status": "SUCCESS" if success else "NOOP",
            "message": f"Link between {req.source_id} and {req.target_id} restored.",
            "recovered_route": recovered_route,
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/reset")
def reset_network_state():
    """Restore entire constellation to 100% operational health."""
    graph_service.reset_network()
    audit_service.log_event(
        event_type="SYSTEM_RESET",
        target="Constellation",
        description="All failed satellites and links restored to healthy operational baseline.",
    )

    restored_route: Optional[RouteResponse] = None
    if graph_service._last_source and graph_service._last_target:
        restored_route = graph_service.compute_shortest_path(
            graph_service._last_source, graph_service._last_target
        )

    return {
        "status": "SUCCESS",
        "message": "Constellation fully restored.",
        "route": restored_route,
    }


@router.get("/resilience", response_model=ResilienceMetricsResponse)
def get_resilience_metrics():
    """Get quantitative constellation survivability and resilience metrics."""
    return graph_service.get_resilience_metrics()


@router.get("/critical-components", response_model=CriticalComponentsResponse)
def get_critical_components():
    """Detect single points of failure (cut vertices and bridges) via Tarjan's DFS."""
    return graph_service.get_critical_components()


@router.get("/events", response_model=List[SimulationEventItem])
def get_audit_events():
    """Retrieve event history timeline."""
    return audit_service.get_events()


@router.get("/scenarios", response_model=List[ScenarioItem])
def get_scenarios():
    """List predefined constellation topology presets."""
    return ScenarioService.get_available_scenarios()


@router.post("/scenarios/{scenario_id}/load")
def load_scenario(scenario_id: str):
    """Load a predefined constellation topology scenario."""
    success = ScenarioService.load_scenario(graph_service, scenario_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scenario '{scenario_id}' not found.",
        )

    audit_service.log_event(
        event_type="SCENARIO_LOADED",
        target=scenario_id,
        description=f"Loaded predefined constellation scenario: {scenario_id}.",
    )
    return {
        "status": "SUCCESS",
        "message": f"Scenario {scenario_id} loaded successfully.",
        "topology": graph_service.get_topology(),
    }
