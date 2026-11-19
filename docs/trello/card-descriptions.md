# Trello Card Descriptions & Templates — SatNexus

**Board Name:** `SatNexus | Agile Software Development`  

This document provides copy-paste ready card specifications for Trello cards, complete with acceptance criteria checklists and technical sub-tasks.

---

### Card Template: [US-05] Dijkstra Shortest-Path Routing Engine
- **List:** Done
- **Labels:** `Priority: P0 - Critical`, `Component: Backend`, `Component: Graph Algorithms`
- **Story Points:** 5
- **Description:**
  ```markdown
  ### User Story
  As a Network Operations Specialist,
  I want to calculate the shortest path between any two satellites based on communication link latency,
  So that data packets follow the lowest-delay trajectory through the orbital constellation.

  ### Acceptance Criteria (Given-When-Then)
  - [x] Given a connected graph of satellites with positive weights, when Dijkstra routing is executed from source S to destination D, then the path with minimum total latency is returned.
  - [x] Given identical link weights, then the path with fewest hops is returned.
  - [x] Given an unreachable destination, then is_reachable=false is returned without throwing an unhandled exception.

  ### Technical Checklist
  - [x] Implement Min-Heap Dijkstra using NetworkX backend
  - [x] Measure high-precision algorithmic computation time
  - [x] Create Pydantic PathResult serialization schema
  - [x] Add Pytest unit tests in test_graph_service.py
  ```

---

### Card Template: [US-09] Automated Route Recovery & Recalculation
- **List:** Done
- **Labels:** `Priority: P0 - Critical`, `Component: Backend`, `Component: Graph Algorithms`
- **Story Points:** 5
- **Description:**
  ```markdown
  ### User Story
  As a Network Controller,
  I want the system to automatically recalculate an alternative route when an active component fails,
  So that communication continues with minimal disruption.

  ### Acceptance Criteria
  - [x] Given an active route P, when any intermediate satellite node u in P fails, then the system automatically computes an alternative route P' excluding u.
  - [x] Given the alternative route P', then the system computes the latency degradation percentage Delta L = ((L_new - L_orig) / L_orig) * 100%.
  - [x] Given that all alternative paths are severed, then status is marked as DISCONNECTED.

  ### Technical Checklist
  - [x] Hook failure state updates to automatic reroute trigger
  - [x] Isolate failed nodes without mutating original topology
  - [x] Calculate route latency delta and execution time
  - [x] Add TDD test cases in test_graph_service.py
  ```

---

### Card Template: [US-13] Real-Time Quantitative Resilience Analytics
- **List:** Done
- **Labels:** `Priority: P0 - Critical`, `Component: Backend`, `Component: Graph Algorithms`
- **Story Points:** 5
- **Description:**
  ```markdown
  ### User Story
  As a Systems Analyst,
  I want quantitative metrics (Node Availability %, Link Availability %, LCC Ratio, Reachability Ratio),
  So that I can objectively measure constellation resilience under failure stress.

  ### Acceptance Criteria
  - [x] Node Availability = (active_nodes / total_nodes) * 100%
  - [x] Link Availability = (active_links / total_links) * 100%
  - [x] LCC Ratio = (largest_connected_component_size / total_nodes) * 100%
  - [x] Guard against divide-by-zero on empty or completely failed graphs.

  ### Technical Checklist
  - [x] Implement ResilienceMetrics calculator
  - [x] Connect Tarjan connected components analysis
  - [x] Create /network/resilience API endpoint
  - [x] Write Pytest unit tests for all edge cases
  ```

---

### Card Template: [US-14] Mission-Control Web Dashboard
- **List:** Done
- **Labels:** `Priority: P0 - Critical`, `Component: Frontend`
- **Story Points:** 8
- **Description:**
  ```markdown
  ### User Story
  As an End User,
  I want a modern dark-themed web dashboard with interactive graph controls, metric cards, and failure toggles,
  So that I have a professional mission-control interface to operate simulations.

  ### Acceptance Criteria
  - [x] Space-inspired dark theme (Navy #0b0f19)
  - [x] Interactive Cytoscape.js canvas with drag, pan, zoom
  - [x] Distinct color states (Green=Active, Red=Failed, Blue=Route, Purple=Recovered)
  - [x] Live KPI cards and Event Timeline
  - [x] Predefined scenario selector

  ### Technical Checklist
  - [x] Vite + React + TypeScript scaffolding
  - [x] Cytoscape.js canvas component
  - [x] Simulation controls and failure injection buttons
  - [x] Event history log component
  ```
