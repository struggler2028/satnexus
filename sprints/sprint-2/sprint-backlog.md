# Sprint 2 – Sprint Backlog

## 1. Selected User Stories

| ID | User Story | Priority | Story Points |
|---|---|---|---:|
| US-04 | Shortest Path Routing | High | 5 |
| US-05 | Satellite Failure Simulation | High | 5 |
| US-06 | Communication Link Failure | High | 3 |
| US-07 | Alternative Route Identification | High | 5 |

**Total Story Points: 18**

## 2. Detailed Task Breakdown

### US-04: Shortest Path Routing

- Implement Dijkstra's algorithm.
- Calculate minimum-cost routes.
- Track predecessor nodes.
- Reconstruct the shortest path.
- Display total path cost.

### US-05: Satellite Failure Simulation

- Implement satellite failure functionality.
- Mark selected satellites as unavailable.
- Prevent routing through failed satellites.
- Update network connectivity.

### US-06: Communication Link Failure

- Implement communication link failure functionality.
- Mark selected links as unavailable.
- Prevent routing through failed links.
- Validate remaining connections.

### US-07: Alternative Route Identification

- Recalculate routes after failures.
- Identify alternative communication paths.
- Compare available routes.
- Report when no alternative route exists.

## 3. Acceptance Criteria

### US-04
- Shortest paths are calculated correctly.
- Path costs are displayed.
- Invalid or unreachable destinations are handled.

### US-05
- Satellites can be marked unavailable.
- Failed satellites are excluded from routing.
- Network connectivity is updated.

### US-06
- Communication links can be disabled.
- Disabled links cannot be used for routing.
- Remaining connections continue to function.

### US-07
- Alternative routes are calculated when available.
- The system identifies disconnected destinations.
- Route calculations reflect network failures.

## 4. Sprint Priority

1. Shortest-path routing.
2. Satellite failure simulation.
3. Communication link failure.
4. Alternative route identification.

## 5. Current Progress

Implementation and testing progress will be updated as tasks are completed.
