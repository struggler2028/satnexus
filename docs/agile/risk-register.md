# Risk Register & Mitigation Strategy — SatNexus

**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  
**Risk Scoring:** Likelihood (1–5) $\times$ Impact (1–5) = Risk Severity Score (1–25)  
- **15–25 (Red):** Critical / High Risk — Requires active mitigation and daily monitoring.  
- **8–14 (Yellow):** Medium Risk — Requires proactive mitigation plan.  
- **1–7 (Green):** Low Risk — Accept and monitor periodically.  

---

## 1. Active Risk Register Table

| Risk ID | Category | Risk Description | Likelihood | Impact | Score | Mitigation Strategy | Contingency Plan | Status |
|---|---|---|:---:|:---:|:---:|---|---|---|
| **RSK-01** | Schedule | Imminent project submission deadline (Nov 21) leaving insufficient time for full-stack catch-up. | 4 | 5 | **20** | Enact aggressive scope prioritization (P0 features strictly first); apply Kanban WIP limits; pair program core modules. | Descope optional P1 features (e.g., K-shortest Yen's paths) if P0 testing is constrained. | **Mitigated** |
| **RSK-02** | Technical | Native C++ / SFML library dependencies fail to build across team and evaluation machines. | 5 | 4 | **20** | Pivot to Python FastAPI + React/Cytoscape web stack with zero native C++ compilation requirements. | Retain C++ prototype in `src/` as Sprint 1 proof-of-concept milestone. | **Resolved** |
| **RSK-03** | Algorithmic | Dijkstra routing crashes or enters infinite loops when constellation graph is partitioned or disconnected. | 3 | 4 | **12** | Catch `NetworkXNoPath` exceptions gracefully; return explicit `is_reachable = false` and `status = DISCONNECTED`. | Implement defensive fallback returning empty path and error banner. | **Resolved** |
| **RSK-04** | Data Integrity | Simulating node failure accidentally mutates and corrupts original graph topology in memory. | 3 | 4 | **12** | Strict state overlay pattern: keep base graph immutable; maintain dynamic failure state as separate integer sets (`failed_satellites`, `failed_links`). | Provide single-click `/network/reset` endpoint to clear all failure sets instantly. | **Resolved** |
| **RSK-05** | Mathematical | Divide-by-zero errors in resilience formulas when all satellites or links fail. | 3 | 3 | **9** | Implement defensive guard clauses in `ResilienceMetrics` formulas (return $0.0\%$ when total nodes $= 0$). | Write dedicated Pytest unit tests for empty and completely destroyed networks. | **Resolved** |
| **RSK-06** | DevOps | GitHub Actions CI fails on remote runner due to missing system dependencies or version mismatches. | 2 | 4 | **8** | Pin dependencies in `requirements.txt` and `package.json`; test build locally with clean environment before pushing. | Run tests in standard headless mode without GUI requirements. | **Resolved** |
| **RSK-07** | UI/UX | High graph node density causes Cytoscape layout overlap and poor readability. | 2 | 3 | **6** | Use preset coordinate-based layouts and physics repulsion spacing; limit demo scenarios to 8–12 satellites. | Provide pan, zoom, and interactive node drag controls. | **Resolved** |

---

## 2. Risk Burndown & Monitoring Frequency

Risks RSK-01 and RSK-02 were identified as critical blockers at the end of Sprint 2. Both risks were systematically mitigated through the architectural pivot and the intensive Sprint 3 catch-up plan, bringing the overall project risk profile from High (Score 20) to Low (Score 4) prior to final release.
