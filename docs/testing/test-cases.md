# Detailed Test Cases Specification — SatNexus

**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  
**Standard:** IEEE 829 Test Case Specification  

---

## 1. Test Cases Suite

| Test Case ID | Test Category | Target User Story | Description & Inputs | Expected Output | Actual Result |
|---|---|---|---|---|---|
| **TC-GRAPH-01** | Graph Engine | US-03 | Add satellite with valid ID, name, coordinates (ID: 1, "SAT-A", 150, 180) | Satellite successfully stored in network; node count increments | Pass |
| **TC-GRAPH-02** | Graph Engine | US-03 | Reject duplicate satellite ID (Add ID: 1 twice) | ValueError raised; duplicate rejected | Pass |
| **TC-GRAPH-03** | Graph Engine | US-03 | Add bidirectional link with positive latency weight (1, 2, latency: 10.0ms) | Edge added in both directions with weight 10.0 | Pass |
| **TC-GRAPH-04** | Graph Engine | US-03 | Reject negative or zero link weight (1, 2, latency: -5.0ms) | ValueError: "Link latency must be strictly positive" | Pass |
| **TC-GRAPH-05** | Graph Engine | US-03 | Reject self-loop link (1, 1, latency: 10.0ms) | ValueError: "Self-loops are not allowed" | Pass |
| **TC-ROUTE-01** | Routing | US-05 | Compute Dijkstra shortest path between connected nodes (Source: 1, Dest: 5) | Optimal path `[1, 2, 4, 5]` returned; total latency = 33.0ms | Pass |
| **TC-ROUTE-02** | Routing | US-05 | Dijkstra on identical weights chooses minimum hop path | Minimum hop path chosen deterministically | Pass |
| **TC-ROUTE-03** | Routing | US-11 | Compute route to unreachable disconnected node | `is_reachable = False`, `status = DISCONNECTED`, path empty | Pass |
| **TC-ROUTE-04** | Routing | US-05 | Compute route when Source = Destination (Source: 1, Dest: 1) | Path `[1]`, total latency = 0.0ms, status = "SAME_NODE" | Pass |
| **TC-ROUTE-05** | Routing | US-05 | Query route with non-existent satellite ID (Source: 999, Dest: 1) | ValueError / HTTP 404: "Satellite ID not found" | Pass |
| **TC-FAIL-01** | Failure Sim | US-07 | Fail satellite node (Node: 2) | Node marked FAILED; excluded from active subgraph; topology preserved | Pass |
| **TC-FAIL-02** | Failure Sim | US-07 | Fail already failed satellite node (Node: 2 again) | Operation idempotent; node remains FAILED | Pass |
| **TC-FAIL-03** | Failure Sim | US-08 | Fail inter-satellite communication link (Link: (2, 4)) | Link deactivated; path avoiding link (2, 4) calculated | Pass |
| **TC-FAIL-04** | Failure Sim | US-07 | Fail the active communication source node (Source: 1 fails) | Route status = DISCONNECTED; warning: "Source node is failed" | Pass |
| **TC-FAIL-05** | Failure Sim | US-07 | Fail the active communication target node (Target: 5 fails) | Route status = DISCONNECTED; warning: "Target node is failed" | Pass |
| **TC-RECOV-01** | Recovery | US-09 | Automatic route recovery when intermediate node on path fails (Node: 2 fails) | System automatically recalculates path `[1, 3, 4, 5]`, latency 40.0ms | Pass |
| **TC-RECOV-02** | Recovery | US-09 | Latency degradation calculation ($\Delta L$) after recovery | $\Delta L = ((40.0 - 33.0)/33.0) \times 100 = +21.21\%$ | Pass |
| **TC-PART-01** | Partition | US-11 | Multiple cascade failures causing constellation partition (Nodes 2 & 3 fail) | LCC ratio drops; destination unreachable; DISCONNECTED alert raised | Pass |
| **TC-RESET-01** | Restoration | US-12 | Restore constellation after multi-component failures | Failed sets emptied; all nodes/links OPERATIONAL; primary route restored | Pass |
| **TC-METRIC-01** | Metrics | US-13 | Calculate Node Availability (7 active of 8 total) | Node availability = 87.50% | Pass |
| **TC-METRIC-02** | Metrics | US-13 | Calculate Link Availability (11 active of 12 total) | Link availability = 91.67% | Pass |
| **TC-METRIC-03** | Metrics | US-13 | Calculate LCC Ratio and Reachability Ratio on healthy graph | LCC = 100.0%, Reachability = 100.0% | Pass |
| **TC-METRIC-04** | Metrics | US-13 | Edge case: Zero division protection on empty graph (0 nodes) | Returns 0.0% across metrics without ZeroDivisionError | Pass |
| **TC-ALGO-01** | Algorithms | US-17 | Identify cut-vertices (articulation points) and bridges | Correct critical articulation points and bridges identified via Tarjan | Pass |
| **TC-API-01** | REST API | US-15 | `GET /api/v1/network/topology` returns valid JSON with all nodes/links | HTTP 200 OK with compliant schema | Pass |
| **TC-API-02** | REST API | US-15 | `POST /api/v1/network/route` with valid source/target | HTTP 200 OK with route array and latency | Pass |
| **TC-API-03** | REST API | US-15 | `POST /api/v1/network/nodes/{id}/fail` triggers failure & reroute | HTTP 200 OK with updated route state | Pass |
| **TC-FE-01** | Frontend | US-14 | Mission-control dashboard mounts and renders Cytoscape canvas | Canvas element rendered; nodes displayed in green | Pass |
| **TC-FE-02** | Frontend | US-10 | Visual color transition on node failure | Node background color transitions to red (#ef4444) | Pass |
| **TC-FE-03** | Frontend | US-11 | Display disconnection banner when reachability is false | Red alert banner "Destination Disconnected" rendered | Pass |
