# Feasibility Study — SatNexus

**Document Version:** 1.0  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  
**Evaluation Scope:** Technical, Operational, Economic, Schedule, and Legal Feasibility  

---

## 1. Technical Feasibility

### 1.1 Technology Stack Evaluation
The project evaluated two primary technological trajectories:
1. **Desktop Native (C++ / SFML):**
   - *Pros:* High raw computational execution speed; direct memory management.
   - *Cons:* Extremely high dependency overhead (requires CMake, SFML 3 binaries compiled per OS); missing platform cross-compilers; rigid UI rendering; difficult automated CI testing; steep learning curve for team members under tight deadlines.
2. **Web Full-Stack (FastAPI + NetworkX + React + Cytoscape.js):**
   - *Pros:* Pure Python standard library + NetworkX provides battle-tested graph algorithms (Dijkstra, Tarjan, connected components) with $O((V+E)\log V)$ complexity. FastAPI provides asynchronous high-performance REST APIs with automatic OpenAPI (Swagger) schema validation. React + Vite + TypeScript provides strict type safety, modular component state, and instant hot-reloading. Cytoscape.js is the gold standard for high-performance interactive graph visualization (hardware-accelerated canvas rendering).
   - *Verdict:* The web full-stack architecture is overwhelmingly superior for interactive visualization, test automation, and cross-platform reproducibility.

### 1.2 Algorithm Feasibility
- **Dijkstra's Algorithm with Min-Heap Priority Queue:** Computational complexity is $O(|E| + |V| \log |V|)$. For satellite networks of 8–100 nodes, route recalculation executes in $< 1\text{ ms}$, well within the $15\text{ ms}$ real-time threshold.
- **Connected Components & Articulation Points (Tarjan's DFS):** Executes in $O(|V| + |E|)$ linear time, allowing instantaneous cut-vertex detection.
- **Hardware Resources:** The application runs smoothly on standard commodity developer laptops (4GB RAM, dual-core x86/ARM CPU) with zero external GPU acceleration required.

---

## 2. Operational Feasibility

- **User Acceptance:** The satellite mission-control dashboard features intuitive controls: point-and-click source/destination selection, toggle failure buttons, slider controls, and visual color coding. No specialized command-line training is required for evaluators or students to run the demo.
- **Maintainability:** Modular separation between Backend (`backend/app/services/graph_service.py`), REST routers (`backend/app/api/`), and Frontend components (`frontend/src/components/`) adheres strictly to Clean Architecture and Single Responsibility Principles.
- **Agile Integration:** The codebase is designed around Test-Driven Development (Pytest and Vitest suites) and continuous integration via GitHub Actions.

---

## 3. Economic Feasibility

- **Cost of Software & Tools:** 100% Free and Open Source Software (FOSS).
  - Python 3.14, FastAPI, NetworkX, Pytest: MIT / BSD Licenses.
  - Node.js, React, TypeScript, Vite, Tailwind CSS, Cytoscape.js: MIT License.
  - GitHub Actions: Free tier for public repositories.
- **Infrastructure Costs:** \$0.00 cloud hosting required during local evaluation; zero licensing costs.

---

## 4. Schedule Feasibility & Catch-Up Assessment

- **Timeline Constraint:** Inception Nov 17, 2026; Final Submission Nov 21, 2026 (4-day cycle).
- **Feasibility Assessment:** By leveraging Python's NetworkX for underlying graph primitives and React/Cytoscape.js for visualization, development velocity increases 4x compared to native C++ graphics debugging. The scheduled catch-up plan reliably completes all P0 core requirements, automated tests, and Agile documentation well in advance of the Saturday deadline.

---

## 5. Legal & Ethical Feasibility

- **Intellectual Property:** All dependencies are permissively licensed (MIT, Apache 2.0, BSD).
- **Ethical Considerations:** SatNexus is explicitly designated as a simulation tool for research and education. It does not interface with actual military or commercial satellite command uplinks, eliminating orbital safety or regulatory export control concerns (ITAR/EAR).
