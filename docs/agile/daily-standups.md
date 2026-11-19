# Daily Standup Records — SatNexus

**Daily Standup Format:** 15-minute timeboxed standup (walking the Kanban board right-to-left)  
**Standard Questions:**
1. What did you accomplish yesterday?
2. What will you work on today?
3. Are there any impediments or blockers in your way?

---

## Standup 1: Monday, November 17, 2026 (Sprint 1 Kickoff)
- **Kabir (Project Lead / Architecture):**
  - *Yesterday:* Finalized project selection and problem statement draft.
  - *Today:* Initialize GitHub repository, define initial `Satellite` data struct, setup CMake skeleton.
  - *Blockers:* None.
- **Sarthak (Developer / Algorithms):**
  - *Yesterday:* Researched satellite constellation topologies (Walker Delta, Polar).
  - *Today:* Create `SatelliteNetwork` adjacency list class in C++ with node/link insertion logic.
  - *Blockers:* Need clarification on how latency weights will be simulated.
- **Action Item:** Latency weights will be positive floating-point numbers simulating speed-of-light inter-satellite link delays ($d/c$).

---

## Standup 2: Tuesday, November 18, 2026 (Sprint 1 Review & Pivot Discussion)
- **Kabir:**
  - *Yesterday:* Created `NetworkRenderer` using SFML 3 to draw nodes and links.
  - *Today:* Review SFML rendering output and prepare Sprint 1 review notes.
  - *Blockers:* Running into CMake build errors on Windows due to missing SFML dynamic libraries.
- **Sarthak:**
  - *Yesterday:* Completed `SatelliteNetwork.cpp` with `addSatellite`, `addLink`, and `displayNetwork`.
  - *Today:* Attempt to link `SatelliteNetwork` with `NetworkRenderer`.
  - *Blockers:* The SFML window fails to initialize on developer laptops without `assets/arial.ttf` font installed.
- **Action Item:** Document the SFML spike findings in Sprint 1 retrospective. Plan architectural discussion regarding web-based full stack.

---

## Standup 3: Wednesday, November 19, 2026 (Sprint 2 - Architectural Decision)
- **Kabir:**
  - *Yesterday:* Evaluated SFML vs. React/Vite/Cytoscape.js.
  - *Today:* Finalize architectural pivot to Python FastAPI + React web dashboard. Scaffold FastAPI backend.
  - *Blockers:* Loss of 1 day due to C++ troubleshooting; need to compress routing and failure milestones.
- **Sarthak:**
  - *Yesterday:* Researched NetworkX graph algorithms in Python.
  - *Today:* Draft Dijkstra routing service and failure state isolation model in Python.
  - *Blockers:* None; Python installation verified across machines.
- **Action Item:** Roll over unfinished Sprint 2 stories into Sprint 3 and enact strict pair programming.

---

## Standup 4: Thursday, November 20, 2026 (Sprint 3 Accelerated Catch-Up)
- **Kabir:**
  - *Yesterday:* Conducted repository audit and updated `.gitignore` and baseline status.
  - *Today:* Scaffold React + TypeScript + Vite frontend with Tailwind CSS and Cytoscape.js graph canvas. Connect API client.
  - *Blockers:* Tight deadline (submission tomorrow); must maintain focus exclusively on P0 core features.
- **Sarthak:**
  - *Yesterday:* Prototyped Dijkstra pathfinding and failure toggles in NetworkX.
  - *Today:* Complete FastAPI REST endpoints (`/network/route`, `/network/nodes/{id}/fail`, `/network/resilience`), enforce TDD with Pytest.
  - *Blockers:* Need frontend to send consistent JSON payloads matching Pydantic schemas.
- **QA / Catch-Up Specialist:**
  - *Yesterday:* Audited Git history, resolved repository state, drafted master Product Backlog and SDLC documentation.
  - *Today:* Write automated Pytest suite (aiming for >85% coverage), configure GitHub Actions CI workflow, build Trello import artifacts.
  - *Blockers:* None.

---

## Standup 5: Friday, November 21, 2026 (Final Submission Preparation)
- **Kabir:**
  - *Yesterday:* Connected React dashboard with FastAPI endpoints, finalized mission-control theme, verified Cytoscape interactive graph.
  - *Today:* Conduct end-to-end rehearsal of the 10-step final demonstration scenario; record presentation evidence.
  - *Blockers:* None.
- **Sarthak:**
  - *Yesterday:* Implemented Tarjan's articulation points, predefined constellation scenarios, and simulation audit logger.
  - *Today:* Optimize recovery computation time calculation; assist QA with test evidence validation.
  - *Blockers:* None.
- **QA / Catch-Up Specialist:**
  - *Yesterday:* Executed 100% green Pytest suite and Vitest frontend tests; configured GitHub Actions workflow.
  - *Today:* Finalize `README.md`, update `docs/project-status.md`, package release, and freeze code for submission.
  - *Blockers:* None. Ready for final evaluation.
