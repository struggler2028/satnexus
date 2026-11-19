# REST API Specification — SatNexus

**API Version:** 1.0.0  
**Base URL:** `http://localhost:8000/api/v1`  
**Protocol:** HTTP/1.1  
**Content-Type:** `application/json`  

---

## 1. Overview

The SatNexus Backend REST API exposes endpoints for managing satellite constellation topologies, querying graph states, computing shortest paths, simulating node/link failures, and retrieving real-time resilience analytics.

---

## 2. Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health check and version status |
| `GET` | `/network/topology` | Retrieve full constellation topology (nodes, links, status) |
| `POST` | `/network/reset` | Restore constellation to 100% operational baseline |
| `POST` | `/network/route` | Compute shortest communication route between source and target |
| `POST` | `/network/nodes/{node_id}/fail` | Inject failure into a specific satellite node |
| `POST` | `/network/nodes/{node_id}/recover` | Recover a failed satellite node |
| `POST` | `/network/links/fail` | Inject failure into an inter-satellite link $(u, v)$ |
| `POST` | `/network/links/recover` | Recover a failed inter-satellite link $(u, v)$ |
| `GET` | `/network/resilience` | Retrieve real-time constellation resilience metrics |
| `GET` | `/network/critical-components`| Identify cut-vertices (articulation points) and bridges |
| `GET` | `/network/events` | Retrieve audit event history |
| `GET` | `/scenarios` | List predefined constellation scenarios |
| `POST` | `/scenarios/{scenario_id}/load`| Load a specific predefined constellation scenario |

---

## 3. Detailed Endpoint Contracts

### 3.1 Health Check
- **`GET /health`**
- **Response (200 OK):**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-11-20T10:00:00Z"
}
```

---

### 3.2 Get Constellation Topology
- **`GET /network/topology`**
- **Response (200 OK):**
```json
{
  "nodes": [
    {
      "id": 1,
      "name": "SAT-A",
      "x": 150.0,
      "y": 180.0,
      "status": "OPERATIONAL",
      "is_operational": true
    },
    {
      "id": 2,
      "name": "SAT-B",
      "x": 450.0,
      "y": 130.0,
      "status": "OPERATIONAL",
      "is_operational": true
    }
  ],
  "links": [
    {
      "source": 1,
      "target": 2,
      "latency": 10.0,
      "status": "ACTIVE",
      "is_active": true
    }
  ],
  "summary": {
    "total_satellites": 8,
    "operational_satellites": 8,
    "failed_satellites": 0,
    "total_links": 12,
    "active_links": 12
  }
}
```

---

### 3.3 Compute Shortest Communication Route
- **`POST /network/route`**
- **Request Body:**
```json
{
  "source_id": 1,
  "target_id": 5
}
```
- **Response (200 OK):**
```json
{
  "source_id": 1,
  "target_id": 5,
  "is_reachable": true,
  "path": [1, 2, 4, 5],
  "path_names": ["SAT-A", "SAT-B", "SAT-D", "SAT-E"],
  "total_latency_ms": 33.0,
  "hop_count": 3,
  "status": "OPTIMAL",
  "computation_time_ms": 0.32,
  "alternative_paths": [
    {
      "path": [1, 3, 4, 5],
      "total_latency_ms": 40.0
    }
  ]
}
```
- **Error Response (404 Not Found - Destination Unreachable):**
```json
{
  "source_id": 1,
  "target_id": 5,
  "is_reachable": false,
  "path": [],
  "total_latency_ms": null,
  "hop_count": 0,
  "status": "DISCONNECTED",
  "computation_time_ms": 0.15,
  "message": "No active communication path exists between SAT-A and SAT-E due to network partition."
}
```

---

### 3.4 Simulate Satellite Failure
- **`POST /network/nodes/{node_id}/fail`**
- **Response (200 OK):**
```json
{
  "node_id": 2,
  "name": "SAT-B",
  "status": "FAILED",
  "message": "Satellite SAT-B marked as FAILED. Routing graphs updated.",
  "active_route_affected": true,
  "recovered_route": {
    "path": [1, 3, 4, 5],
    "total_latency_ms": 40.0,
    "status": "RECOVERED",
    "latency_delta_pct": 21.21,
    "recovery_computation_time_ms": 0.41
  }
}
```

---

### 3.5 Simulate Link Failure
- **`POST /network/links/fail`**
- **Request Body:**
```json
{
  "source_id": 2,
  "target_id": 4
}
```
- **Response (200 OK):**
```json
{
  "link": [2, 4],
  "status": "FAILED",
  "message": "Inter-satellite link (2, 4) disabled."
}
```

---

### 3.6 Constellation Resilience Analytics
- **`GET /network/resilience`**
- **Response (200 OK):**
```json
{
  "node_availability_pct": 87.5,
  "link_availability_pct": 91.67,
  "lcc_ratio_pct": 87.5,
  "reachability_ratio_pct": 76.19,
  "total_satellites": 8,
  "active_satellites": 7,
  "failed_satellites": 1,
  "total_links": 12,
  "active_links": 11,
  "failed_links": 1,
  "network_status": "DEGRADED"
}
```

---

### 3.7 Critical Components (Cut Vertices & Bridges)
- **`GET /network/critical-components`**
- **Response (200 OK):**
```json
{
  "articulation_points": [3],
  "bridges": [
    [3, 6]
  ],
  "analysis": "SAT-C is an articulation point. Loss of SAT-C partitions subnet SAT-F from the constellation."
}
```
