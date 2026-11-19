# Software Requirements Specification (SRS) — SatNexus

**Document Version:** 2.0  
**Status:** Approved for Sprint 3 Baseline  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the SatNexus Satellite Network Simulation and Resilience Dashboard. It provides the definitive baseline for developers, testers, and academic evaluators during Sprint 2 and Sprint 3.

### 1.2 System Scope
SatNexus is a full-stack web application consisting of a high-performance Python FastAPI graph simulation engine and an interactive React/TypeScript mission-control dashboard. The application models satellite communication networks as weighted graphs, simulates satellite and link failures, computes optimal alternative routes, and calculates real-time network resilience metrics.

---

## 2. Functional Requirements (FR)

| Req ID | Requirement Title | Detailed Description | Priority |
|---|---|---|---|
| **FR-01** | Graph Topology Initialization | The system shall initialize and maintain a satellite constellation graph $G = (V, E)$, where each vertex represents a satellite (with unique integer ID, callsign string, and 2D orbital coordinates) and each edge represents a bidirectional inter-satellite communication link with a positive float weight representing latency in milliseconds ($w > 0$). | **P0** |
| **FR-02** | Custom Node & Link Configuration | The system shall allow programmatic and API-based addition and deletion of satellite nodes and communication links. Self-loops and duplicate edges must be rejected. | **P1** |
| **FR-03** | Source & Destination Route Selection | The user shall be able to designate any active operational satellite as the communication source node ($S$) and any distinct active satellite as destination node ($D$). | **P0** |
| **FR-04** | Dijkstra Shortest-Path Computation | The system shall compute the shortest (lowest-latency) path from $S$ to $D$ using Dijkstra's algorithm over active nodes and active links, returning the ordered sequence of nodes, total path latency ($ms$), and algorithmic execution time ($\mu s$). | **P0** |
| **FR-05** | Satellite Node Failure Simulation | The system shall allow any satellite node to be toggled between `OPERATIONAL` and `FAILED` states. Failed satellites must remain physically visible on the UI (rendered in red with warning icons) but must be strictly excluded from routing graphs. | **P0** |
| **FR-06** | Communication Link Failure Simulation | The system shall allow any communication link $(u, v)$ to be toggled between `ACTIVE` and `FAILED`. Failed links must be rendered with dashed red lines and excluded from routing calculations. | **P0** |
| **FR-07** | Automated Route Recovery & Recalculation | Upon failure of any node or link situated along the active communication route, the system shall automatically recompute an alternative shortest route using surviving operational components. | **P0** |
| **FR-08** | Route State & Visual Color Coding | The UI shall clearly distinguish between operational components (Green #10b981), failed components (Red #ef4444), primary shortest routes (Cyan/Blue #3b82f6), degraded network states (Amber #f59e0b), and recovered alternative paths (Purple #a855f7). | **P0** |
| **FR-09** | Network Partition & Disconnection Warning | When no valid path exists between source $S$ and destination $D$ (e.g., due to catastrophic partitions or target node failure), the system shall detect the disconnection and present an explicit warning banner stating destination reachability status = `DISCONNECTED`. | **P0** |
| **FR-10** | Comprehensive Network Restoration / Reset | The system shall provide a single-click reset control that restores all failed satellites and links to `OPERATIONAL` state, clears route cache, and resets event history. | **P0** |
| **FR-11** | Resilience Analytics Engine | The system shall compute and display real-time network survivability metrics: Node Availability ($\%$), Link Availability ($\%$), Largest Connected Component (LCC) Ratio, Pairwise Reachability Ratio, Latency Delta ($\Delta L$), and Recovery Calculation Time ($t_{rec}$). | **P0** |
| **FR-12** | Event Audit Log & Timeline | The system shall log every failure, recovery, rerouting, and restoration event with timestamp, event type, affected component ID, and resulting path latency. | **P0** |
| **FR-13** | Critical Component Identification (Cut Vertices & Bridges) | The system shall compute articulation points (satellites whose failure splits the constellation) and bridges (links whose failure partitions the network) using Tarjan's or Hopcroft-Tarjan algorithms. | **P1** |
| **FR-14** | Predefined Constellation Scenarios | The system shall support one-click loading of realistic constellation topologies: (1) Starlink Polar Orbital Mesh (10 satellites), (2) Walker Delta Cross-Plane Mesh (12 satellites), (3) Resilient Ring Mesh (8 satellites). | **P1** |
| **FR-15** | K-Shortest Alternative Path Preview | The system shall calculate up to $K=3$ alternative paths (using Yen's algorithm) to display secondary backup routes prior to simulated failure. | **P1** |

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Performance & Latency
- **NFR-01 (Pathfinding Latency):** Shortest-path routing over graphs with up to 100 satellites shall compute in less than 15 milliseconds.
- **NFR-02 (API Response Time):** REST API endpoints shall respond within 50 milliseconds under local server execution.
- **NFR-03 (Rendering Frame Rate):** Cytoscape.js interactive topology graph shall maintain a smooth rendering frame rate ($\ge 60\text{ fps}$) during pan, zoom, and node dragging.

### 3.2 Reliability, Availability & Robustness
- **NFR-04 (Input Sanitization & Exception Handling):** The system shall gracefully handle invalid inputs (negative weights, non-existent node IDs, disconnected targets, empty graphs) without unhandled exceptions or server crashes, returning standardized HTTP 400/404/422 JSON error responses.
- **NFR-05 (State Separation):** Graph topology must be immutable in memory during simulation; failure states must be maintained as state overlays to prevent data corruption.

### 3.3 Usability & Accessibility
- **NFR-06 (Theme & Contrast):** The interface shall implement a dark mission-control theme (Deep Space Navy #0b0f19 / Slate) with high-contrast text and WCAG AA-compliant visual indicators. Never rely on color alone; use status text, badges, and icons.
- **NFR-07 (Responsive Layout):** The dashboard shall be fully responsive across desktop screen resolutions from $1280 \times 720$ to $2560 \times 1440$.

### 3.4 Maintainability & Verifiability
- **NFR-08 (Test Coverage & CI):** The codebase shall achieve $\ge 85\%$ test coverage for core graph and routing algorithms, verified automatically by GitHub Actions CI on every commit and PR.
