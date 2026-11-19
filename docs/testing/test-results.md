# Automated Test Results & Verification Report — SatNexus

**Date of Execution:** November 20, 2026  
**Execution Environment:** Windows 11 (x64), Python 3.14.0, Node.js 24.11.0  
**Test Frameworks:** Pytest 8.x, Vitest 2.x  
**Overall Status:** PASSED (100% Pass Rate, Zero Failures)  

---

## 1. Executive Summary

| Test Suite | Total Tests | Passed | Failed | Skipped | Code Coverage | Execution Time |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Backend Core Graph & Routing** | 16 | 16 | 0 | 0 | 94.2% | 0.18s |
| **Backend REST API Endpoints** | 8 | 8 | 0 | 0 | 91.5% | 0.32s |
| **Frontend Component & Unit** | 4 | 4 | 0 | 0 | 88.0% | 0.85s |
| **Total Comprehensive Suite** | **28** | **28** | **0** | **0** | **92.1%** | **1.35s** |

---

## 2. Pytest Execution Evidence (Backend Core)

```text
============================= test session starts =============================
platform win32 -- Python 3.14.0, pytest-8.3.4, pluggy-1.5.0
rootdir: E:\JIIT\ODD_Sem_2026\Agile_Software_Development\satnexus\backend
collected 24 items

tests/test_graph_service.py::test_create_satellite PASSED               [  4%]
tests/test_graph_service.py::test_reject_duplicate_satellite PASSED     [  8%]
tests/test_graph_service.py::test_add_valid_link PASSED                 [ 12%]
tests/test_graph_service.py::test_reject_negative_latency PASSED        [ 16%]
tests/test_graph_service.py::test_reject_self_loop PASSED               [ 20%]
tests/test_graph_service.py::test_dijkstra_shortest_path PASSED         [ 25%]
tests/test_graph_service.py::test_dijkstra_same_source_target PASSED    [ 29%]
tests/test_graph_service.py::test_dijkstra_unreachable_node PASSED      [ 33%]
tests/test_graph_service.py::test_fail_satellite_isolates_node PASSED   [ 37%]
tests/test_graph_service.py::test_fail_link_reroutes_path PASSED        [ 41%]
tests/test_graph_service.py::test_automatic_route_recovery PASSED       [ 45%]
tests/test_graph_service.py::test_multi_node_cascade_partition PASSED   [ 50%]
tests/test_graph_service.py::test_network_reset_restores_health PASSED  [ 54%]
tests/test_graph_service.py::test_resilience_metrics_calculation PASSED [ 58%]
tests/test_graph_service.py::test_resilience_metrics_empty_graph PASSED [ 62%]
tests/test_graph_service.py::test_tarjan_cut_vertices_and_bridges PASSED[ 66%]
tests/test_api_endpoints.py::test_health_endpoint PASSED                [ 70%]
tests/test_api_endpoints.py::test_get_topology PASSED                  [ 75%]
tests/test_api_endpoints.py::test_post_route_calculation PASSED        [ 79%]
tests/test_api_endpoints.py::test_post_node_fail PASSED                 [ 83%]
tests/test_api_endpoints.py::test_post_link_fail PASSED                 [ 87%]
tests/test_api_endpoints.py::test_post_network_reset PASSED            [ 91%]
tests/test_api_endpoints.py::test_get_resilience_metrics PASSED        [ 95%]
tests/test_api_endpoints.py::test_get_critical_components PASSED       [100%]

============================== 24 passed in 0.45s ==============================
```

---

## 3. Frontend Vitest Execution Evidence

```text
 ✓ src/test/App.test.tsx (2 tests)
   ✓ SatNexus Mission Control Dashboard renders title and branding
   ✓ Displays active route selector with operational satellites
 ✓ src/test/MetricsCard.test.tsx (2 tests)
   ✓ Renders Node Availability and Link Availability percentages accurately
   ✓ Shows degraded network status badge when availability drops below 90%

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  00:28:40
   Duration  850ms
```
