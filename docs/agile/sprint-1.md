# Sprint 1 Report: Foundation & Exploratory Prototyping

**Sprint Dates:** November 17, 2026 – November 18, 2026  
**Sprint Goal:** Establish repository foundation, define core requirements and architecture, and create an initial satellite graph model with basic visual rendering.  
**Committed Story Points:** 14 SP | **Delivered Story Points:** 14 SP (Technical Spike Delivered)  
**Sprint Status:** Completed with Architectural Findings  

---

## 1. Sprint Backlog & Commitments

| Story ID | Story Title | Estimate | Status | Evidence / Commit |
|---|---|---|---|---|
| **US-01** | Repository & Environment Setup | 2 SP | Done | Commit `fa2d1ff`, Git repo initialized, remote configured. |
| **US-02** | Problem Statement & Requirements | 2 SP | Done | `docs/01-problem-statement.md`, `docs/02-requirements.md` created. |
| **US-03** | Weighted Graph Constellation Model | 5 SP | Done | `src/Satellite.h`, `src/SatelliteNetwork.h`, `src/SatelliteNetwork.cpp` created. |
| **US-04** | Initial Network Visualization Prototype | 5 SP | Done (Spike) | `src/NetworkRenderer.h`, `src/NetworkRenderer.cpp` (SFML desktop prototype). |

---

## 2. Actual Work Completed & Git Evidence

1. **Graph Representation Implementation:**
   - Defined `Satellite` struct with `id`, `name`, `x`, `y` coordinates.
   - Built `SatelliteNetwork` adjacency list class with `addSatellite` and `addLink` methods validating against non-positive weights and duplicates.
   - Validated console output via `main.cpp` displaying 5 interconnected satellites (`SAT-A` through `SAT-E`).
2. **Exploratory SFML Visualization Spike:**
   - Developed `NetworkRenderer` using SFML 3 Graphics window to render nodes as circles and links as blue lines with latency labels.
3. **Agile Documentation Scaffolding:**
   - Created sprint planning, backlog, implementation, and review notes in `sprints/sprint-1/`.
   - Merged pull requests #2, #3, #4, #5, #6, #7 into `main`.

---

## 3. Sprint 1 Review & Impediments Discovered

While the graph data structure operated correctly in memory, the desktop visualization spike revealed severe impediments:
- **Missing Build Prerequisites:** SFML requires pre-compiled dynamic libraries (`sfml-graphics-3.dll`, etc.) and a system-installed CMake toolchain, which was missing across some team workstations.
- **Missing Assets:** `NetworkRenderer::initialize()` failed due to missing `assets/arial.ttf` font file.
- **Lack of Web Interactivity:** Desktop windows cannot easily be served in an Agile browser demo, nor can they be integrated with web-based Trello or automated web CI testing.

---

## 4. Sprint 1 Retrospective

- **What Went Well:**
  - Rapid conceptual alignment on graph-theoretic satellite modeling.
  - Good Git branch collaboration across Kabir and Sarthak.
- **What Didn't Go Well:**
  - C++ desktop graphics created an unnecessary dependency barrier.
  - Zero automated unit tests were written; verification relied on console print statements.
  - No `.gitignore` resulted in risking IDE debris.
- **Action Items for Sprint 2:**
  - Transition the production simulation platform to a Python FastAPI backend + React web frontend to enable cross-platform execution and browser accessibility.
  - Adopt strict Test-Driven Development (TDD) with Pytest.
