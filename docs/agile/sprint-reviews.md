# Sprint Reviews & Stakeholder Demonstrations — SatNexus

**Course:** Agile Software Development  
**Product:** SatNexus (Graph-Based Satellite Communication Network Resilience)  

---

## Sprint 1 Review (November 18, 2026)

### 1. Attendees
- Project Lead: Kabir
- Developer: Sarthak
- Internal Academic Reviewer

### 2. Goal & Scope
- Establish repository foundation, define initial requirements, and build a working graph representation of satellites with basic 2D rendering.

### 3. Demo Walkthrough
- **Demonstrated:**
  1. Adjacency list creation in C++ (`src/SatelliteNetwork.cpp`).
  2. Addition of 5 satellites (SAT-A through SAT-E) and 6 links.
  3. Console printout verifying topology structure and weight constraints ($w > 0$).
  4. SFML window attempt.
- **Stakeholder Feedback:**
  - *Positive:* Mathematical graph representation is solid; link latency constraints correctly enforced.
  - *Critical Concern:* SFML window required local DLL installation and failed on machine without `assets/arial.ttf`. The evaluation committee requires a seamless, cross-platform demonstration that can be run on any standard browser without complex C++ compilation setups.
- **Release Decision:** Increment 0.1.0 tagged as internal prototype; pivot to web-based full stack approved for Sprint 2.

---

## Sprint 2 Review (November 19, 2026)

### 1. Attendees
- Project Lead: Kabir
- Developer: Sarthak
- Scrum Master / QA Lead

### 2. Goal & Scope
- Implement Dijkstra routing algorithms, satellite/link failure simulation, and alternative route recalculation.

### 3. Demo Walkthrough
- **Demonstrated:**
  1. Algorithmic specification for dynamic subgraph extraction $G_{\text{active}} = (V \setminus V_F, E \setminus E_F)$.
  2. Proof-of-concept Python script running Dijkstra on 8-node satellite network with sub-millisecond execution time.
  3. REST API contracts for FastAPI backend.
- **Stakeholder Feedback:**
  - *Critical Concern:* Only 8 out of 24 planned story points were fully delivered to working software by the end of Nov 19. No working UI or automated tests exist yet in the main branch.
- **Corrective Action Committed:**
  - The team committed to an accelerated Sprint 3 catch-up plan consolidating the remaining 16 story points with Sprint 3's planned 24 points (total 40 SP) using strict pair programming and TDD.

---

## Sprint 3 Review (November 21, 2026)

### 1. Attendees
- Complete SatNexus Team (Kabir, Sarthak, QA Lead)
- Academic Evaluation Committee / Faculty Assessors

### 2. Goal & Scope
- Demonstrate end-to-end mission-control web dashboard, dynamic failure simulation, autonomous route recovery, real-time resilience metrics, automated test suite, and CI/CD verification.

### 3. Demo Walkthrough & Evidence
- **Demonstrated Live:**
  1. *Healthy Topology:* 8-satellite network rendered cleanly on dark Cytoscape canvas with green nodes and cyan active links.
  2. *Route Computation:* Selected SAT-1 (source) and SAT-5 (destination). Dijkstra calculated shortest path `[1, 2, 4, 5]` with total latency `33.0 ms` in $0.32\text{ ms}$.
  3. *Dynamic Failure Injection:* Toggled SAT-2 to `FAILED`. SAT-2 turned crimson red; active route instantly re-routed to alternative path `[1, 3, 4, 5]` with latency `40.0 ms` ($+21.2\%$ latency degradation).
  4. *Multi-Node Failure & Partitioning:* Failed SAT-3 and SAT-4. System detected complete network disconnection; displayed clear amber/red alert banner: `Destination Reachability: DISCONNECTED`.
  5. *Network Restoration:* Single-click "Reset Constellation" restored all nodes to operational state and cleared failure overlays.
  6. *Resilience Telemetry:* Real-time updates verified for Node Availability, Link Availability, LCC Ratio, and Reachability Ratio.
  7. *Test Evidence & CI:* 100% automated test suite passing via Pytest and Vitest; GitHub Actions CI pipeline showing green status badge.
- **Stakeholder Feedback:**
  - *Assessment:* Full compliance with Agile SDLC standards; exceptional UI/UX aesthetics; rigorous algorithmic foundation.
- **Acceptance Decision:** **Accepted for Final Academic Submission.**
