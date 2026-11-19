from datetime import datetime, timezone
from typing import List, Optional
from app.models.schemas import SimulationEventItem


class AuditService:
    def __init__(self):
        self._events: List[SimulationEventItem] = []
        self._counter: int = 1

    def log_event(
        self,
        event_type: str,
        target: str,
        description: str,
        route_latency: Optional[float] = None,
        recovery_time_ms: Optional[float] = None,
    ) -> SimulationEventItem:
        now_str = datetime.now(timezone.utc).strftime("%H:%M:%S.%f")[:-3] + " UTC"
        event = SimulationEventItem(
            id=self._counter,
            timestamp=now_str,
            event_type=event_type,
            target=target,
            description=description,
            route_latency=route_latency,
            recovery_time_ms=recovery_time_ms,
        )
        self._counter += 1
        self._events.insert(0, event)  # newest first
        if len(self._events) > 100:
            self._events.pop()
        return event

    def get_events(self, limit: int = 50) -> List[SimulationEventItem]:
        return self._events[:limit]

    def clear(self) -> None:
        self._events.clear()
        self._counter = 1


audit_service = AuditService()
