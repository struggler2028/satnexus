# Detailed User Stories — SatNexus

**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  
**Standard Format:** "As a [Role], I want [Feature], so that [Business Benefit]"  
**Acceptance Criteria Format:** Given-When-Then (Gherkin syntax)  

---

### US-01: Repository & Environment Initialization
- **User Story:** As a **Lead Developer**, I want to initialize a standardized Git repository with gitignore, documentation structure, and development environments so that the team can collaborate cleanly without committing binary artifacts or build debris.
- **Business Value:** High (Establishes foundational team productivity and artifact integrity).
- **Priority:** P0 | **Story Points:** 2 | **Sprint:** Sprint 1 | **Status:** Done
- **Dependencies:** None
- **Acceptance Criteria:**
  - *Given* a fresh project workspace, *when* Git is initialized with remote origin, *then* `.gitignore` prevents virtual environments and node modules from being tracked.
- **Technical Tasks:** Create `.gitignore`, configure Git branches, establish folder scaffolding.
- **Test Reference:** TC-ENV-01

---

### US-02: Problem Statement & Scope Definition
- **User Story:** As a **Product Owner**, I want a formalized problem statement, requirements specification, and project charter so that team deliverables remain tightly bounded and academically compliant.
- **Business Value:** High (Eliminates scope creep and aligns technical delivery with academic goals).
- **Priority:** P0 | **Story Points:** 2 | **Sprint:** Sprint 1 | **Status:** Done
- **Dependencies:** US-01
- **Acceptance Criteria:**
  - *Given* project kickoff, *when* requirements are gathered, *then* in-scope and out-of-scope boundaries are clearly documented.
- **Technical Tasks:** Draft problem statement, project charter, and initial requirements markdown.
- **Test Reference:** TC-DOC-01

---

### US-03: Weighted Graph Constellation Data Model
- **User Story:** As a **Software Architect**, I want a robust graph data structure where satellites are vertices with coordinates and links are edges with positive latency weights so that the constellation can be modeled mathematically.
- **Business Value:** High (Core domain entity driving all routing and failure calculations).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 1 | **Status:** Done
- **Dependencies:** US-01
- **Acceptance Criteria:**
  - *Given* a graph instance, *when* a satellite is added with unique ID and coordinates, *then* it is stored successfully.
  - *Given* two satellites, *when* an inter-satellite link is added with weight $w > 0$, *then* a bidirectional edge is created.
  - *Given* a request with weight $w \le 0$ or self-loop $u = v$, *then* the system rejects the operation.
- **Technical Tasks:** Define `Satellite` and `Link` structures; implement adjacency list and NetworkX models.
- **Test Reference:** TC-GRAPH-01, TC-GRAPH-02, TC-GRAPH-03

---

### US-04: Initial Network Visualization Prototype
- **User Story:** As an **Aerospace Researcher**, I want a visual 2D rendering of satellite nodes and connecting communication links so that I can inspect the physical constellation topology.
- **Business Value:** Medium (Provides visual proof of concept for network connectivity).
- **Priority:** P1 | **Story Points:** 5 | **Sprint:** Sprint 1 | **Status:** Done
- **Dependencies:** US-03
- **Acceptance Criteria:**
  - *Given* a configured network graph, *when* the renderer initializes, *then* satellite positions and link lines are drawn on screen.
- **Technical Tasks:** Prototype basic 2D rendering (SFML exploratory spike in Sprint 1).
- **Test Reference:** TC-VIS-01

---

### US-05: Dijkstra Shortest-Path Routing Engine
- **User Story:** As a **Network Operations Specialist**, I want to calculate the shortest path between any two satellites based on communication link latency so that data packets follow the lowest-delay trajectory.
- **Business Value:** Critical (Core routing algorithm required for satellite telecommunications).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-03
- **Acceptance Criteria:**
  - *Given* a healthy satellite graph, *when* Dijkstra routing is queried from Source to Target, *then* the path with minimum total latency is returned with ordered hops.
  - *Given* identical edge weights, *when* shortest path is computed, *then* the path with fewest hops is selected.
- **Technical Tasks:** Implement Dijkstra algorithm using min-heap priority queue; benchmark execution time.
- **Test Reference:** TC-ROUTE-01, TC-ROUTE-02

---

### US-06: Interactive Source & Destination Selection
- **User Story:** As a **Mission Controller**, I want to select any operational satellite as source and another as destination via the UI so that I can evaluate point-to-point communication routes.
- **Business Value:** High (Enables user-driven routing experiments).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-05
- **Acceptance Criteria:**
  - *Given* a rendered constellation, *when* the user clicks or selects a source node $S$ and target node $D$, *then* the route between them is instantly computed and displayed.
- **Technical Tasks:** Add dropdown and click handlers for source/destination selection; validate $S \neq D$.
- **Test Reference:** TC-UI-01

---

### US-07: Satellite Node Failure Simulation
- **User Story:** As a **Resilience Engineer**, I want to simulate the sudden failure of any satellite node so that I can observe how the constellation tolerates orbital space hazards.
- **Business Value:** Critical (Fundamental feature for testing fault tolerance).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-03, US-05
- **Acceptance Criteria:**
  - *Given* an operational satellite $v$, *when* failure simulation is toggled on $v$, *then* $v$ is marked as `FAILED`, excluded from active routing, but remains visible on the dashboard in Red.
- **Technical Tasks:** Implement `fail_satellite(id)` method with failure state bitmask overlay.
- **Test Reference:** TC-FAIL-01, TC-FAIL-02

---

### US-08: Inter-Satellite Link Failure Simulation
- **User Story:** As a **Systems Operator**, I want to simulate the failure of a specific inter-satellite communication link so that I can test network resilience against antenna misalignment or solar interference.
- **Business Value:** High (Simulates link degradation without losing satellite nodes).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-03, US-05
- **Acceptance Criteria:**
  - *Given* an active link $(u, v)$, *when* link failure is simulated, *then* edge $(u, v)$ is deactivated and excluded from pathfinding.
- **Technical Tasks:** Implement `fail_link(u, v)` state isolation.
- **Test Reference:** TC-FAIL-03

---

### US-09: Automated Route Recovery & Recalculation
- **User Story:** As a **Network Controller**, I want the system to automatically recalculate an alternative route when an active component fails so that communication continues with minimal disruption.
- **Business Value:** Critical (Delivers the core value proposition of SatNexus: autonomous resilience).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-05, US-07, US-08
- **Acceptance Criteria:**
  - *Given* an active route $P$, *when* a node $u \in P$ fails, *then* the system immediately recomputes an alternative path $P'$ avoiding $u$.
  - *Given* the recovered path $P'$, *then* the system computes the latency delta $\Delta L$ and execution time.
- **Technical Tasks:** Trigger automated Dijkstra recalculation upon failure event; compute route latency delta.
- **Test Reference:** TC-RECOV-01, TC-RECOV-02

---

### US-10: Path Highlighting & Visual State Transitions
- **User Story:** As an **Operator**, I want distinct color coding for operational components, failed components, primary routes, and recovered routes so that network state is instantly comprehensible.
- **Business Value:** High (Crucial for mission-control visual ergonomics and presentation demo).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-06, US-09
- **Acceptance Criteria:**
  - *Given* the dashboard display, *then* operational nodes are Green (#10b981), failed nodes are Red (#ef4444), primary routes are Blue/Cyan (#3b82f6), and recovered routes are Purple (#a855f7).
- **Technical Tasks:** Style Cytoscape graph elements dynamically based on node/edge state attributes.
- **Test Reference:** TC-VIS-02

---

### US-11: Network Partition & Disconnection Detection
- **User Story:** As an **Operations Engineer**, I want the system to detect when failures completely disconnect the destination so that I receive an explicit warning instead of an application crash.
- **Business Value:** Critical (Prevents unhandled crashes and alerts operators of communication blackouts).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 2 | **Status:** Done
- **Dependencies:** US-05, US-07
- **Acceptance Criteria:**
  - *Given* a partitioned network where no path connects $S$ and $D$, *when* routing is evaluated, *then* `is_reachable = false`, `status = DISCONNECTED`, and an alert banner is displayed.
- **Technical Tasks:** Handle `NetworkXNoPath` exception gracefully; return standardized HTTP 404/200 payload with `DISCONNECTED` status.
- **Test Reference:** TC-ROUTE-03, TC-PART-01

---

### US-12: Complete Constellation Reset & Restoration
- **User Story:** As an **Evaluator / User**, I want a single-click reset button to restore all failed satellites and links to 100% operational health so that I can run repeatable simulation scenarios.
- **Business Value:** High (Essential for rapid scenario testing and presentation demonstrations).
- **Priority:** P0 | **Story Points:** 2 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-07, US-08
- **Acceptance Criteria:**
  - *Given* a degraded constellation with failed nodes and links, *when* "Reset Constellation" is clicked, *then* all failure sets are cleared and the original route is restored.
- **Technical Tasks:** Implement `POST /api/v1/network/reset` endpoint and UI reset trigger.
- **Test Reference:** TC-RESET-01

---

### US-13: Real-Time Quantitative Resilience Analytics
- **User Story:** As a **Systems Analyst**, I want quantitative metrics (Node Availability %, Link Availability %, LCC Ratio, Reachability Ratio, Latency Delta) so that I can objectively measure constellation resilience.
- **Business Value:** Critical (Transforms the project from a qualitative visual toy to an analytical tool).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-03, US-07, US-08
- **Acceptance Criteria:**
  - *Given* any network state, *when* resilience metrics are computed, *then* all formulas match the system design specification without divide-by-zero errors.
- **Technical Tasks:** Implement `ResilienceMetrics` service computing availability, LCC, and pairwise reachability.
- **Test Reference:** TC-METRIC-01, TC-METRIC-02, TC-METRIC-03

---

### US-14: Mission-Control Web Dashboard (React/Cytoscape)
- **User Story:** As an **End User**, I want a modern dark-themed web dashboard with interactive graph controls, metric cards, and failure toggles so that I have a professional mission-control interface.
- **Business Value:** Critical (Primary user interface for academic demonstration).
- **Priority:** P0 | **Story Points:** 8 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-10, US-13, US-15
- **Acceptance Criteria:**
  - *Given* the web application in a browser, *then* the dark-themed dashboard loads smoothly with Cytoscape topology, KPI cards, and control panels.
- **Technical Tasks:** Build React components with Vite, TypeScript, Tailwind CSS, and Cytoscape.js.
- **Test Reference:** TC-UI-02, TC-UI-03

---

### US-15: FastAPI REST API Architecture & Endpoints
- **User Story:** As a **Frontend Developer**, I want clean REST endpoints with Pydantic validation and CORS headers so that the frontend can seamlessly interact with the Python simulation engine.
- **Business Value:** Critical (Connects user interface with backend computational engine).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-03, US-05, US-07
- **Acceptance Criteria:**
  - *Given* the FastAPI backend running on port 8000, *when* HTTP requests arrive from localhost:5173, *then* CORS headers allow communication and JSON schemas are validated.
- **Technical Tasks:** Implement FastAPI routers, Pydantic schemas, and CORS middleware.
- **Test Reference:** TC-API-01, TC-API-02

---

### US-16: Predefined Satellite Constellation Scenarios
- **User Story:** As a **Presenter / Evaluator**, I want one-click scenario presets (Starlink Polar, Walker Delta, Resilient Ring) so that I can immediately showcase complex multi-satellite topologies.
- **Business Value:** Medium (Dramatically streamlines academic presentations).
- **Priority:** P1 | **Story Points:** 3 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-03, US-14
- **Acceptance Criteria:**
  - *Given* the scenario selector, *when* a user selects "Walker Delta Mesh (12 nodes)", *then* the topology loads with 12 satellites and redundant crosslinks.
- **Technical Tasks:** Create scenario generator utility and corresponding API endpoint.
- **Test Reference:** TC-SCEN-01

---

### US-17: Critical Cut-Vertices & Bridge Detection
- **User Story:** As an **Aerospace Architect**, I want to identify articulation points and bridge links so that single points of orbital failure are proactively detected.
- **Business Value:** High (Provides advanced graph-theoretic vulnerability analysis).
- **Priority:** P1 | **Story Points:** 5 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-03
- **Acceptance Criteria:**
  - *Given* a constellation topology, *when* critical component analysis is triggered, *then* articulation points and bridges are returned and highlighted.
- **Technical Tasks:** Implement Tarjan's DFS articulation points and bridges detection.
- **Test Reference:** TC-ALGO-01

---

### US-18: Simulation Event Audit Trail & Logging
- **User Story:** As an **Auditor**, I want an event timeline recording every failure, recovery, and reroute event with timestamp and impact so that I have a verifiable audit log of the simulation run.
- **Business Value:** Medium (Provides traceability for compliance and retrospectives).
- **Priority:** P1 | **Story Points:** 3 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-07, US-09
- **Acceptance Criteria:**
  - *Given* any simulation action, *when* an event occurs, *then* it is appended to the event history with timestamp, component ID, and latency impact.
- **Technical Tasks:** Implement in-memory and SQLite-backed event logger.
- **Test Reference:** TC-AUDIT-01

---

### US-19: Test-Driven Development & Pytest Engine Suite
- **User Story:** As a **QA Engineer**, I want an automated Pytest test suite covering graph models, Dijkstra routing, failure simulation, and resilience metrics so that zero regressions occur.
- **Business Value:** Critical (Enforces XP engineering rigor and guarantees algorithmic correctness).
- **Priority:** P0 | **Story Points:** 5 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-03, US-05, US-07, US-13
- **Acceptance Criteria:**
  - *Given* the backend codebase, *when* `pytest` is executed, *then* all tests pass with $\ge 85\%$ line coverage.
- **Technical Tasks:** Write unit, edge-case, and integration tests in `backend/tests/`.
- **Test Reference:** TC-ALL-01 to TC-ALL-20

---

### US-20: Frontend Component & Integration Testing
- **User Story:** As a **QA Engineer**, I want Vitest component tests so that frontend controls, error banners, and metric displays are automatically verified.
- **Business Value:** High (Prevents UI regressions and broken user interactions).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-14
- **Acceptance Criteria:**
  - *Given* frontend source code, *when* `npm test` runs, *then* component rendering and user event tests pass.
- **Technical Tasks:** Configure Vitest with React Testing Library.
- **Test Reference:** TC-FE-01, TC-FE-02

---

### US-21: Continuous Integration Pipeline (GitHub Actions)
- **User Story:** As a **DevOps Engineer**, I want a GitHub Actions CI workflow that runs backend and frontend tests and builds on every push so that broken code cannot be merged into `main`.
- **Business Value:** Critical (Automates verification and enforces XP quality gates).
- **Priority:** P0 | **Story Points:** 3 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** US-19, US-20
- **Acceptance Criteria:**
  - *Given* a push to GitHub, *then* CI triggers, runs linting, executes Pytest and Vitest, and completes Vite production build.
- **Technical Tasks:** Create `.github/workflows/ci.yml`.
- **Test Reference:** TC-CI-01

---

### US-22: Release Packaging, User Guide & Final Demo
- **User Story:** As an **Academic Evaluator**, I want a comprehensive README, step-by-step Windows startup commands, and a reproducible demo scenario so that I can evaluate the project effortlessly.
- **Business Value:** Critical (Final academic deliverable and evaluation experience).
- **Priority:** P0 | **Story Points:** 2 | **Sprint:** Sprint 3 | **Status:** Done
- **Dependencies:** All preceding stories
- **Acceptance Criteria:**
  - *Given* the repository, *when* instructions are followed, *then* the application launches on Windows with working demo in under 2 minutes.
- **Technical Tasks:** Author comprehensive README, demonstration guide, and release package.
- **Test Reference:** TC-DEMO-01
