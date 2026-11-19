# Changelog — SatNexus

All notable changes to the SatNexus project are documented in this file in reverse chronological order, adhering to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standards and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - Sprint 3 Final Release (2026-11-21)
### Added
- Integrated full-stack mission-control web dashboard (`frontend/`) using React 18, Vite, TypeScript, and Cytoscape.js.
- Automated resilient alternative route recalculation upon node and link failure.
- Real-time quantitative resilience metrics calculation: Node Availability, Link Availability, LCC Ratio, Pairwise Reachability Ratio, Latency Delta, and Recovery Time.
- Interactive constellation scenarios: Starlink Polar Mesh (10 nodes), Walker Delta Mesh (12 nodes), and Resilient Ring Mesh (8 nodes).
- Articulation point (cut vertex) and bridge detection service using Tarjan's DFS.
- Pytest comprehensive backend test suite covering graph topology, pathfinding, failure injection, resilience metrics, and edge cases.
- Vitest frontend automated component test suite.
- GitHub Actions CI workflow (`.github/workflows/ci.yml`) with automated linting, testing, and production builds.
- Complete Agile SDLC documentation suite (Scrum sprint plans, Kanban workflow, XP logs, Trello board setup & CSV backlog, Risk Register, DoD/DoR).

---

## [0.2.0] - Sprint 2: Core Graph Routing & Failure Recovery (2026-11-19)
### Added
- Python FastAPI backend architecture (`backend/`) with NetworkX graph engine.
- Dijkstra shortest path routing algorithm supporting weighted inter-satellite communication links.
- Independent failure state isolation overlay (satellites remain visible on topology while isolated from active routing graph).
- REST API contracts for `/network/topology`, `/network/route`, `/network/nodes/{id}/fail`, and `/network/resilience`.
- Initial Pytest unit test cases for Dijkstra algorithm and failure rerouting.

---

## [0.1.0] - Sprint 1: Foundation & Exploratory Prototyping (2026-11-17 – 2026-11-18)
### Added
- Initial project repository creation and Git initialization.
- Project problem statement, scope definition, and requirements documentation.
- Exploratory C++ prototype (`src/SatelliteNetwork.cpp`, `src/NetworkRenderer.cpp`) modeling basic satellite structs and SFML 2D window rendering.
- Sprint 1 backlog, planning, and retrospective documentation.
- Pull requests #2 through #7 merged into `main` by team members.
