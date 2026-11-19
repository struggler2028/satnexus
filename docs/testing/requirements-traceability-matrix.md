# Requirements Traceability Matrix (RTM) — SatNexus

**Document Version:** 2.0  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  

---

## 1. Bidirectional Traceability Matrix

This matrix maps Functional Requirements (FR) and Non-Functional Requirements (NFR) to User Stories (US), Architectural Components, Implementation Modules, and Automated Test Cases (TC).

| Req ID | Requirement Description | User Story ID | Architectural Component | Implementation Module | Test Case ID | Status |
|---|---|---|---|---|---|---|
| **FR-01** | Graph Topology Initialization | US-03 | Graph Engine | `backend/app/services/graph_service.py` | TC-GRAPH-01, TC-GRAPH-03 | Verified |
| **FR-02** | Custom Node & Link Configuration | US-03 | Graph Engine | `backend/app/services/graph_service.py` | TC-GRAPH-02, TC-GRAPH-04, TC-GRAPH-05 | Verified |
| **FR-03** | Source & Destination Route Selection | US-06 | Frontend & API | `frontend/src/components/RouteSelector.tsx` | TC-UI-01, TC-ROUTE-04 | Verified |
| **FR-04** | Dijkstra Shortest-Path Computation | US-05 | Routing Service | `backend/app/services/graph_service.py` | TC-ROUTE-01, TC-ROUTE-02, TC-API-02 | Verified |
| **FR-05** | Satellite Node Failure Simulation | US-07 | Failure Manager | `backend/app/services/graph_service.py` | TC-FAIL-01, TC-FAIL-02, TC-FAIL-04, TC-FAIL-05 | Verified |
| **FR-06** | Communication Link Failure Simulation | US-08 | Failure Manager | `backend/app/services/graph_service.py` | TC-FAIL-03 | Verified |
| **FR-07** | Automated Route Recovery & Recalculation | US-09 | Routing Service | `backend/app/services/graph_service.py` | TC-RECOV-01, TC-API-03 | Verified |
| **FR-08** | Route State & Visual Color Coding | US-10 | Cytoscape View | `frontend/src/components/CytoscapeCanvas.tsx` | TC-VIS-02, TC-FE-02 | Verified |
| **FR-09** | Network Partition & Disconnection Warning | US-11 | Routing / UI | `backend/app/services/graph_service.py` | TC-ROUTE-03, TC-PART-01, TC-FE-03 | Verified |
| **FR-10** | Comprehensive Network Restoration / Reset | US-12 | Full-Stack | `backend/app/api/network_router.py` | TC-RESET-01 | Verified |
| **FR-11** | Resilience Analytics Engine | US-13 | Metrics Service | `backend/app/services/metrics_service.py` | TC-METRIC-01 to TC-METRIC-04 | Verified |
| **FR-12** | Event Audit Log & Timeline | US-18 | Audit Service | `backend/app/services/audit_service.py` | TC-AUDIT-01 | Verified |
| **FR-13** | Critical Cut-Vertices & Bridges | US-17 | Tarjan Service | `backend/app/services/graph_service.py` | TC-ALGO-01 | Verified |
| **FR-14** | Predefined Constellation Scenarios | US-16 | Scenarios Service | `backend/app/services/scenario_service.py` | TC-SCEN-01 | Verified |
| **NFR-01**| Pathfinding Latency $< 15\text{ ms}$ | US-05 | Routing Service | `backend/app/services/graph_service.py` | TC-ROUTE-01 | Verified |
| **NFR-02**| API Response Time $< 50\text{ ms}$ | US-15 | FastAPI Core | `backend/app/main.py` | TC-API-01 | Verified |
| **NFR-04**| Robust Input Exception Handling | US-03 | API Validation | `backend/app/api/network_router.py` | TC-GRAPH-04, TC-ROUTE-05 | Verified |
| **NFR-05**| State Separation & Immutable Topology | US-07 | Domain Core | `backend/app/services/graph_service.py` | TC-FAIL-01, TC-RESET-01 | Verified |
| **NFR-06**| Space Dark Mission-Control Theme | US-14 | Frontend UI | `frontend/src/App.tsx` | TC-FE-01 | Verified |
| **NFR-08**| Test Coverage $\ge 85\%$ & CI | US-19, US-21 | DevOps & QA | `.github/workflows/ci.yml` | TC-ALL-01 to TC-ALL-20 | Verified |
