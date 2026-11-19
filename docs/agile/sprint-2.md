# Sprint 2 Report: Routing Algorithms, Failure Recovery & Architectural Pivot

**Sprint Date:** November 19, 2026  
**Sprint Goal:** Implement Dijkstra shortest-path routing, satellite/link failure simulation, automated recovery rerouting, and initial resilience metrics.  
**Committed Story Points:** 24 SP | **Delivered Story Points:** 8 SP (Architectural Design & Scaffolding) | **Rolled Over:** 16 SP  
**Sprint Status:** Delayed / Scope Rolled into Sprint 3 Catch-Up  

---

## 1. Sprint Backlog & Commitments

| Story ID | Story Title | Estimate | Status at Sprint End | Notes |
|---|---|---|---|---|
| **US-05** | Dijkstra Shortest-Path Routing Engine | 5 SP | In Progress | Algorithm designed in Python; formal tests and API endpoint pending. |
| **US-06** | Interactive Source/Destination Selection | 3 SP | Blocked | Awaiting web UI completion. |
| **US-07** | Satellite Node Failure Simulation | 3 SP | In Progress | Failure state isolation design finalized. |
| **US-08** | Inter-Satellite Link Failure Simulation | 3 SP | In Progress | Link state toggle design finalized. |
| **US-09** | Automated Route Recovery & Recalculation | 5 SP | In Progress | Recovery trigger logic designed. |
| **US-10** | Path Highlighting & Visual State Transitions | 5 SP | Blocked | Awaiting Cytoscape web canvas. |

---

## 2. Work Completed During Sprint 2

1. **Algorithm & State Design (`docs/05-algorithm-design.md`):**
   - Formulated dynamic subgraph partitioning: $G_{\text{active}} = (V \setminus V_F, E \setminus E_F)$.
   - Benchmarked Python NetworkX vs. custom C++ implementations. NetworkX demonstrated sub-millisecond execution for graphs under 100 nodes with zero compilation frictions.
2. **Architectural Transition:**
   - Formalized transition from native C++ desktop to Python FastAPI + React/Cytoscape.js.
   - Defined REST API schema contracts for `/network/route`, `/network/nodes/{id}/fail`, and `/network/resilience`.

---

## 3. Root Cause of Sprint 2 Velocity Deficit

A comprehensive retrospective identified why only 8 out of 24 committed story points were completed:
1. **Architectural Debate & Tooling Pivot:**
   - The team spent 10+ hours attempting to resolve CMake and SFML DLL loading errors on Windows before reaching consensus to transition to the web stack.
2. **Underestimating Full-Stack Setup Overhead:**
   - Defining schemas, setting up virtual environments, and scaffolding Vite without a pre-existing CI template caused initial friction.
3. **No Continuous Integration (CI):**
   - Lack of automated testing meant bugs had to be diagnosed manually.

---

## 4. Sprint 2 Retrospective & Corrective Action Plan

- **What Went Well:**
  - Clear recognition of the technical roadblock early enough to pivot.
  - Comprehensive mathematical modeling of resilience metrics.
- **What Didn't Go Well:**
  - Story points carried over into the final sprint.
  - Working software was not delivered to staging by end of Nov 19.
- **Decisive Catch-Up Strategy for Sprint 3:**
  - Merge remaining Sprint 2 stories with Sprint 3 into an intensive 2-day execution sprint (Nov 20–21).
  - Adopt strict XP Pair Programming: one engineer owns backend API and TDD tests; the other owns React Cytoscape frontend; QA oversees CI and documentation verification.
  - Institute a WIP limit of 3 cards in development to ensure rapid throughput.
