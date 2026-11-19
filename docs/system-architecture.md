# System Architecture & Technical Specification — SatNexus

**Document Version:** 2.0  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  
**Architecture Pattern:** Clean Layered Client-Server Architecture (REST API + Reactive SPA)  

---

## 1. Architectural Overview

SatNexus utilizes a decoupled client-server architecture. The backend serves as the deterministic Graph Simulation Engine, maintaining topological models, routing algorithms, failure states, and resilience calculations. The frontend is a Single-Page Application (SPA) designed as an aerospace mission-control console, communicating with the backend over HTTP REST APIs and rendering interactive graph elements via Cytoscape.js.

---

## 2. Mermaid Diagrams Suite

### Diagram 1: System Architecture
```mermaid
graph TB
    subgraph ClientLayer["Frontend Client (React 18 + TypeScript + Vite)"]
        UI["Mission Control Dashboard"]
        Cyto["Cytoscape.js Graph Canvas"]
        Charts["Recharts Metric Displays"]
        State["Zustand / React State Store"]
        APIClient["Axios REST API Client"]
    end

    subgraph APILayer["Backend Server (FastAPI + Uvicorn)"]
        Router["FastAPI REST Endpoints (/api/v1)"]
        Validation["Pydantic Data Models & Schemas"]
        Middleware["CORS & Error Handling Middleware"]
    end

    subgraph ServiceLayer["Core Domain & Simulation Services"]
        GraphEngine["SatelliteNetwork Engine"]
        RoutingService["Dijkstra & K-Shortest Path Service"]
        FailureManager["Failure & State Isolation Service"]
        ResilienceCalc["Resilience Analytics Calculator"]
        TarjanService["Cut-Vertex & Bridge Detector"]
    end

    subgraph DataLayer["Persistence & Memory Layer"]
        NXGraph["NetworkX In-Memory Topology Graph"]
        StateOverlay["Failure State Bitmasks & Overlays"]
        SQLiteDB["SQLite Simulation Audit Database"]
    end

    UI --> State
    State --> Cyto & Charts
    State --> APIClient
    APIClient -->|JSON over HTTP| Router
    Router --> Validation
    Validation --> ServiceLayer
    ServiceLayer --> DataLayer
```

---

### Diagram 2: User Interaction & Use Case Diagram
```mermaid
flowchart TD
    User(("Mission Controller / Student"))
    
    subgraph SatNexus["SatNexus Simulation System"]
        UC1["Initialize Constellation Topology"]
        UC2["Select Source & Destination Satellites"]
        UC3["Compute Shortest Communication Route"]
        UC4["Simulate Satellite Node Failure"]
        UC5["Simulate Inter-Satellite Link Failure"]
        UC6["Trigger Automatic Route Recovery"]
        UC7["Evaluate Resilience Metrics"]
        UC8["Identify Cut-Vertices & Bridges"]
        UC9["Reset Constellation to Healthy State"]
        UC10["Export Simulation Audit Log"]
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC10
```

---

### Diagram 3: Domain Class Diagram
```mermaid
classDiagram
    class Satellite {
        +int id
        +string name
        +float x
        +float y
        +string orbit_plane
        +bool is_operational
        +to_dict() dict
    }

    class Link {
        +int source_id
        +int target_id
        +float latency_ms
        +bool is_active
        +to_dict() dict
    }

    class SatelliteNetwork {
        -dict~int, Satellite~ satellites
        -dict~tuple, Link~ links
        -set~int~ failed_satellites
        -set~tuple~ failed_links
        +add_satellite(id, name, x, y) bool
        +add_link(u, v, latency) bool
        +fail_satellite(id) bool
        +recover_satellite(id) bool
        +fail_link(u, v) bool
        +recover_link(u, v) bool
        +get_active_graph() nx.Graph
        +compute_shortest_path(source, target) PathResult
        +compute_resilience_metrics() ResilienceMetrics
        +get_critical_components() CriticalComponents
        +reset_network() void
    }

    class PathResult {
        +List~int~ path
        +float total_latency
        +float computation_time_ms
        +bool is_reachable
        +string status
    }

    class ResilienceMetrics {
        +float node_availability_pct
        +float link_availability_pct
        +float lcc_ratio
        +float reachability_ratio
        +float latency_delta_pct
        +float recovery_computation_time_ms
        +int total_operational_nodes
        +int total_failed_nodes
    }

    class SimulationEvent {
        +string timestamp
        +string event_type
        +string target_id
        +string description
        +float resulting_latency
    }

    SatelliteNetwork "1" *-- "*" Satellite : manages
    SatelliteNetwork "1" *-- "*" Link : manages
    SatelliteNetwork ..> PathResult : generates
    SatelliteNetwork ..> ResilienceMetrics : computes
    SatelliteNetwork ..> SimulationEvent : logs
```

---

### Diagram 4: Sequence Diagram — Shortest-Path Calculation
```mermaid
sequenceDiagram
    autonumber
    actor User as Operator
    participant UI as Dashboard UI (React)
    participant API as FastAPI Router
    participant Engine as SatelliteNetwork Engine
    participant NX as NetworkX Dijkstra

    User->>UI: Select Source (e.g., SAT-1) & Destination (e.g., SAT-5)
    UI->>API: POST /api/v1/network/route {source: 1, target: 5}
    API->>Engine: compute_shortest_path(1, 5)
    Engine->>Engine: Filter out failed nodes and links
    Engine->>NX: dijkstra_path(active_subgraph, 1, 5, weight="latency")
    NX-->>Engine: Path: [1, 2, 4, 5], Latency: 33.0ms
    Engine-->>API: PathResult object
    API-->>UI: JSON {path: [1, 2, 4, 5], latency: 33.0, status: "OPTIMAL"}
    UI->>UI: Highlight route edges in Blue (#3b82f6)
    UI->>User: Display route latency and hop breakdown
```

---

### Diagram 5: Sequence Diagram — Failure & Autonomous Route Recovery
```mermaid
sequenceDiagram
    autonumber
    actor User as Operator
    participant UI as Dashboard UI
    participant API as FastAPI Router
    participant Engine as SatelliteNetwork Engine
    participant Metrics as Resilience Calculator

    User->>UI: Click "Simulate Failure" on SAT-2 (on active path)
    UI->>API: POST /api/v1/network/nodes/2/fail
    API->>Engine: fail_satellite(2)
    Engine->>Engine: Add 2 to failed_satellites set
    Engine->>Engine: Check if SAT-2 was on active route [1, 2, 4, 5]
    Engine->>Engine: Trigger autonomous recomputation from 1 to 5
    Engine->>Engine: Dijkstra on updated subgraph excluding node 2
    Engine-->>API: Alternative Path: [1, 3, 4, 5], Latency: 40.0ms
    API->>Metrics: compute_resilience_metrics()
    Metrics-->>API: Updated availability, LCC ratio, latency delta
    API-->>UI: JSON {path: [1, 3, 4, 5], status: "RECOVERED", latency_delta: +21.2%, metrics: {...}}
    UI->>UI: Render SAT-2 in Red (#ef4444)
    UI->>UI: Animate recovered path in Purple (#a855f7)
    UI->>UI: Update resilience cards and append to Event Timeline
    UI->>User: Display Recovery Alert with latency impact
```

---

### Diagram 6: Activity Diagram — Failure Simulation Lifecycle
```mermaid
flowchart TD
    Start([User Initiates Failure Simulation]) --> SelectType{Component Type?}
    SelectType -->|Satellite Node| InjectNode["Set Node Status = FAILED"]
    SelectType -->|Communication Link| InjectLink["Set Link Status = FAILED"]
    
    InjectNode --> IsNodeOnPath{"Is Node on Active Route?"}
    InjectLink --> IsLinkOnPath{"Is Link on Active Route?"}
    
    IsNodeOnPath -->|No| RecalcMetrics["Update Constellation Resilience Metrics"]
    IsLinkOnPath -->|No| RecalcMetrics
    
    IsNodeOnPath -->|Yes| Reroute["Initiate Rerouting Engine"]
    IsLinkOnPath -->|Yes| Reroute
    
    Reroute --> CheckAlt{"Alternative Path Exists?"}
    CheckAlt -->|Yes| SetRecovered["Set Route Status = RECOVERED<br/>Color: Purple (#a855f7)"]
    CheckAlt -->|No| SetDisconnected["Set Route Status = DISCONNECTED<br/>Raise Disconnection Alert Banner"]
    
    SetRecovered --> RecalcMetrics
    SetDisconnected --> RecalcMetrics
    
    RecalcMetrics --> LogEvent["Record Simulation Event in Audit Trail"]
    LogEvent --> RenderUI["Update Cytoscape Canvas & Recharts Dashboards"]
    RenderUI --> End([Simulation State Stable])
```

---

### Diagram 7: Component Diagram
```mermaid
graph LR
    subgraph FrontendModule["Frontend Client Application"]
        TopologyCanvas["CytoscapeView Component"]
        ControlPanel["SimulationControls Component"]
        MetricsPanel["ResilienceDashboard Component"]
        TimelineView["EventTimeline Component"]
        APIClientModule["Axios API Client"]
    end

    subgraph BackendModule["FastAPI Application Core"]
        NetworkRouter["Network API Router (/network)"]
        ScenariosRouter["Scenarios API Router (/scenarios)"]
        GraphCore["GraphService (NetworkX Engine)"]
        MetricsEngine["MetricsService"]
        AuditLogger["AuditLogService"]
    end

    ControlPanel & TopologyCanvas --> APIClientModule
    APIClientModule -->|HTTP JSON| NetworkRouter & ScenariosRouter
    NetworkRouter --> GraphCore
    ScenariosRouter --> GraphCore
    GraphCore --> MetricsEngine
    GraphCore --> AuditLogger
    MetricsEngine --> NetworkRouter
    AuditLogger --> NetworkRouter
```

---

### Diagram 8: Database ER Diagram (Simulation Audit Persistence)
```mermaid
erDiagram
    SIMULATION_SESSION {
        string session_id PK
        string scenario_name
        datetime created_at
        int total_nodes
        int total_links
    }

    SIMULATION_EVENT {
        int event_id PK
        string session_id FK
        datetime timestamp
        string event_type
        string target_id
        string description
        float route_latency_ms
        float recovery_time_ms
    }

    RESILIENCE_SNAPSHOT {
        int snapshot_id PK
        string session_id FK
        datetime timestamp
        float node_availability_pct
        float link_availability_pct
        float lcc_ratio
        float reachability_ratio
        int active_components_count
    }

    SIMULATION_SESSION ||--o{ SIMULATION_EVENT : logs
    SIMULATION_SESSION ||--o{ RESILIENCE_SNAPSHOT : records
```

---

### Diagram 9: Agile Development Lifecycle
```mermaid
flowchart LR
    subgraph SprintCadence["Iterative Sprint Cycle"]
        SprintPlan["Sprint Planning<br/>(Backlog Refinement)"]
        DailyScrum["Daily Standup<br/>(Kanban Flow Sync)"]
        Development["XP Development<br/>(TDD + Simple Design)"]
        SprintReview["Sprint Review<br/>(Live Demo & Verification)"]
        Retrospective["Retrospective<br/>(Continuous Improvement)"]
    end

    SprintPlan --> DailyScrum
    DailyScrum --> Development
    Development --> SprintReview
    SprintReview --> Retrospective
    Retrospective -->|Next Sprint Inputs| SprintPlan
```

---

### Diagram 10: TDD Red-Green-Refactor Cycle
```mermaid
flowchart TD
    Red["1. RED: Write Failing Test<br/>(Define expected behavior before code)"]
    VerifyRed["Run Test: Verify Failure Reason"]
    Green["2. GREEN: Write Minimum Code<br/>(Make test pass immediately)"]
    VerifyGreen["Run Test: Verify PASS"]
    Refactor["3. REFACTOR: Clean & Optimize<br/>(Improve structure, remove duplication)"]
    VerifyRefactor["Run Full Test Suite: Ensure No Regressions"]

    Red --> VerifyRed
    VerifyRed --> Green
    Green --> VerifyGreen
    VerifyGreen --> Refactor
    Refactor --> VerifyRefactor
    VerifyRefactor -->|Next Feature| Red
```

---

### Diagram 11: Continuous Integration Pipeline (GitHub Actions)
```mermaid
flowchart LR
    Push["Git Push / PR to main"] --> CI["GitHub Actions Runner"]
    
    subgraph BackendJob["Backend CI Stage"]
        PySetup["Setup Python 3.14"]
        PyInstall["Install backend dependencies"]
        PyLint["Flake8 / Syntax Verification"]
        PyTest["Pytest Suite + Coverage Report"]
    end

    subgraph FrontendJob["Frontend CI Stage"]
        NodeSetup["Setup Node.js 24"]
        NodeInstall["npm ci / install"]
        TypeCheck["TypeScript tsc --noEmit"]
        Vitest["Vitest Unit Tests"]
        ViteBuild["npm run build (Vite Production)"]
    end

    CI --> BackendJob
    CI --> FrontendJob
    PyTest & ViteBuild --> Verification["Quality Gate Passed & Artifact Ready"]
```
