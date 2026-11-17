# SatNexus – System Architecture

## 1. Introduction

SatNexus is a graph-based satellite communication network simulation designed to study network resilience and failure recovery.

The system represents satellites as nodes and communication links as edges in a graph. It simulates communication between satellites and examines how the network responds when a satellite or communication link becomes unavailable.

The main objective is to maintain communication by identifying alternative routes whenever failures occur.

## 2. System Architecture Overview

The proposed system consists of the following major components:

1. **Satellite Network Model:** Represents satellites and communication links using a graph structure.
2. **Network Initialization:** Creates the initial satellite network with nodes and connections.
3. **Communication Module:** Handles communication requests between source and destination satellites.
4. **Pathfinding Module:** Finds suitable routes between satellites.
5. **Failure Simulation Module:** Simulates satellite or communication link failures.
6. **Recovery Module:** Identifies alternative routes when the original communication path becomes unavailable.
7. **Performance Analysis Module:** Evaluates network performance under normal and failure conditions.

## 3. Graph-Based Network Representation

SatNexus uses graph theory to represent the satellite communication network.

Let:

**G = (V, E)**

Where:

- **V (Vertices):** Represents individual satellites in the network.
- **E (Edges):** Represents communication links between satellites.

Each communication link may contain information such as:

- Connection status (active or failed).
- Communication latency.
- Link cost or weight.

This graph-based representation helps in modelling satellite connectivity and analyzing different communication routes.

## 4. Major System Components

### 4.1 Network Initialization

The network initialization module creates the satellite network by defining the satellites and establishing communication links between them.

It provides the initial network structure for further simulation.

### 4.2 Communication Module

This module handles communication requests between two satellites.

It uses the network structure to determine whether a communication route is available between the source and destination.

### 4.3 Pathfinding Module

The pathfinding module identifies a suitable path between two satellites.

It analyzes the available connections and helps determine a route for successful communication.

### 4.4 Failure Simulation Module

This module introduces failures into the network to test its reliability.

Possible failure scenarios include:

- Satellite node failure.
- Communication link failure.
- Loss of connectivity between network components.

When a failure occurs, the affected node or link is treated as unavailable during route calculation.

### 4.5 Recovery Module

The recovery module handles communication disruptions caused by network failures.

Its responsibilities include:

- Detecting when the existing route becomes unavailable.
- Identifying alternative communication paths.
- Recalculating routes using available network connections.
- Restoring communication whenever an alternative path exists.

If no alternative path is available, the system identifies the communication failure.

### 4.6 Performance Analysis Module

This module evaluates the behaviour of the network under different conditions.

The analysis may include:

- Successful communication attempts.
- Failed communication attempts.
- Network recovery performance.
- Route availability.
- Changes in communication latency.

## 5. System Workflow

The overall working process of SatNexus follows these steps:

1. Initialize the satellite network.
2. Create satellites and communication links.
3. Select source and destination satellites.
4. Calculate a communication path.
5. Simulate communication through the selected path.
6. Introduce a satellite or link failure.
7. Check whether the existing route is still available.
8. Search for an alternative route if necessary.
9. Restore communication if a valid alternative path exists.
10. Analyze and record the simulation results.

## 6. Architecture Diagram
flowchart TD
    A[Start Simulation] --> B[Network Initialization]
    B --> C[Graph-Based Satellite Network]
    C --> D[Communication Request]
    D --> E[Pathfinding Module]
    E --> F[Communication]
    F --> G[Failure Simulation]
    G --> H{Route Available?}
    H -->|Yes| I[Continue Communication]
    H -->|No| J[Recovery Module]
    J --> K[Find Alternative Route]
    K --> L{Alternative Found?}
    L -->|Yes| I
    L -->|No| M[Communication Failed]
    I --> N[Performance Analysis]
    M --> N
    N --> O[End Simulation]

## 7. Expected Outcomes

The proposed architecture aims to achieve the following:

- Provide a graph-based representation of satellite communication networks.
- Simulate different network failure scenarios.
- Identify alternative communication routes.
- Demonstrate network resilience and recovery.
- Analyze communication performance under different network conditions.

## 8. Future Enhancements

Possible future improvements include:

- Dynamic satellite movement simulation.
- More advanced routing algorithms.
- Real-time network monitoring.
- Intelligent failure prediction.
- Advanced network performance visualization.

## 9. Conclusion

SatNexus provides a simulation-based approach to understanding satellite communication networks and their resilience against failures.

By combining graph-based network representation, pathfinding, failure simulation, and route recovery, the system aims to demonstrate how communication can be maintained even when parts of the network become unavailable.
