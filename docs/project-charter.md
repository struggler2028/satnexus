# Project Charter — SatNexus

**Project Name:** SatNexus: Graph-Based Satellite Communication Network Resilience and Failure Recovery  
**Academic Course:** Agile Software Development (Fifth-Semester B.Tech, CSE/IT)  
**Institution:** Jaypee Institute of Information Technology (JIIT)  
**Academic Year:** 2026–2027 (Odd Semester)  
**Project Start Date:** November 17, 2026  
**Final Submission Deadline:** Saturday, November 21, 2026 (23:59 IST)  

---

## 1. Project Purpose & Background

Satellite Mega-Constellations in Low Earth Orbit (LEO) such as SpaceX Starlink, OneWeb, and Kuiper are transforming global telecommunications by establishing high-throughput, low-latency inter-satellite laser links (ISLs). However, LEO satellites operate in harsh orbital environments subject to space debris collisions, solar radiation damage, power depletion in eclipse zones, and mechanical antenna pointing misalignments. When a satellite or inter-satellite link fails, critical communications across continents can be instantly disrupted.

Traditional static routing mechanisms and manual ground-station recovery procedures cannot keep pace with the dynamic topology and microsecond rerouting demands of modern satellite meshes.

**SatNexus** is conceived to solve this critical engineering challenge through a software-defined, graph-theoretic simulation dashboard. By modeling satellite constellations as dynamic weighted graphs (where satellites are vertices and inter-satellite communication links are weighted edges based on propagation latency), SatNexus enables aerospace and network engineers to simulate catastrophic single- and multi-point failures, evaluate automated Dijkstra and alternative path rerouting algorithms, and measure network survivability via quantitative resilience metrics in real time.

---

## 2. Project Objectives & Success Criteria

1. **Graph-Theoretic Network Modeling:** Accurately represent satellite constellations as directed/undirected weighted graphs with positive edge weights representing speed-of-light inter-satellite latency ($d / c$).
2. **Dynamic Failure Simulation:** Provide interactive point-and-click and automated failure injection for individual satellite nodes, communication links, and multi-component failure cascades.
3. **Autonomous Rerouting & Recovery:** Implement Dijkstra's shortest-path algorithm and K-alternative paths to automatically recalculate operational routes within milliseconds of component failure.
4. **Resilience Analytics:** Quantitatively compute and visualize real-time survivability metrics:
   - Node Availability ($\%$)
   - Link Availability ($\%$)
   - Largest Connected Component (LCC) Ratio
   - Network Reachability Ratio
   - Latency Degredation ($\Delta \text{Latency}$)
   - Algorithmic Recovery Computation Time ($\mu\text{s} / \text{ms}$)
5. **Mission-Control Visual Dashboard:** Deliver a high-performance web dashboard featuring Cytoscape.js interactive topology rendering, live telemetry cards, latency degradation charts, and audit event logs.
6. **Agile Software Development Rigor:** Exemplify complete Agile SDLC standards—incorporating Scrum iterative sprints, Kanban flow management with WIP limits, Extreme Programming (TDD, pair programming, simple design), and automated CI pipelines.

---

## 3. Project Scope & Boundaries

### In-Scope
- Weighted graph network representation with coordinates and latency weights.
- Point-and-click selection of Source and Destination communication endpoints.
- Real-time Dijkstra shortest-path computation with visual path highlighting.
- Node failure injection (preserving physical topology while isolating state).
- Edge failure injection (simulating inter-satellite link degradation).
- Automatic alternative route recovery with color-coded path transitions.
- Graph partitioning and unreachable destination detection.
- Complete network restoration and reset functionality.
- Articulation point (cut vertex) and bridge identification to detect single points of failure.
- Full-stack client-server architecture with FastAPI REST API and React/Vite/Cytoscape.js dashboard.
- Pytest and Vitest automated test suites with GitHub Actions CI.

### Out-of-Scope
- Physical SGP4 orbital mechanics propagation and real-time Keplerian ephemeris calculation.
- Direct radio frequency (RF) hardware signal modulation or Doppler shift hardware emulation.
- User authentication, multi-tenant RBAC, billing, or enterprise cloud microservice sprawl.
- Live satellite ground-station telemetry streaming from orbiting hardware.

---

## 4. Key Stakeholders

- **Course Faculty / Evaluators:** Agile Software Development Academic Review Board, Department of Computer Science & Engineering.
- **Project Team Members:**
  - Project Lead / Software Architect: Kabir (`struggler2028`)
  - Full-Stack Developer & Algorithm Specialist: Sarthak
  - Agile Scrum Master & QA Engineer: Development Catch-Up Team
- **End Users:** Satellite network architects, aerospace engineering researchers, network operations center (NOC) operators.

---

## 5. High-Level Project Milestones & Timeline

| Milestone | Target Window | Deliverables |
|---|---|---|
| **Sprint 1: Inception & Core Foundation** | Nov 17 – Nov 18, 2026 | Project charter, requirements SRS, initial graph model, visual rendering prototype. |
| **Sprint 2: Routing, Failure & Recovery** | Nov 19, 2026 | Dijkstra shortest path, node/edge failure simulation, automated recovery rerouting, unit tests. |
| **Sprint 3: Dashboard, Integration & Release** | Nov 20 – Nov 21, 2026 | Full-stack FastAPI + React dashboard, resilience analytics, Pytest/Vitest TDD, CI/CD, final demo package. |
| **Final Academic Submission** | Nov 21, 2026 (23:59 IST) | Complete repository, CI badge green, live demonstration, comprehensive SDLC documentation. |
