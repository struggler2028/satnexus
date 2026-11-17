# SatNexus – Algorithm Design

## 1. Introduction

SatNexus is a graph-based satellite communication network simulation that focuses on routing, network failures, and communication recovery.

The algorithm design defines how satellites are connected, how communication paths are calculated, and how the system responds when a satellite or communication link becomes unavailable.

The primary objective is to maintain communication between satellites by identifying alternative routes whenever possible.

## 2. Graph Representation

The satellite network is represented using a graph:

**G = (V, E)**

Where:

- V represents the set of satellites (nodes).
- E represents the communication links (edges) between satellites.

Each node represents an individual satellite, while each edge represents a possible communication connection between two satellites.

The graph can store additional information such as:

- Satellite identification.
- Connection status.
- Link availability.
- Communication latency.
- Link weight or cost.

## 3. Network Data Structure

An adjacency list can be used to represent the satellite network.

In this representation, every satellite maintains a list of its directly connected satellites.

### Example

Consider a network containing four satellites:

- Satellite A
- Satellite B
- Satellite C
- Satellite D

Possible connections:

- A → B
- A → C
- B → D
- C → D

The adjacency list representation would be:

A: B, C
B: A, D
C: A, D
D: B, C

This representation helps manage satellite connections efficiently and makes it easier to identify neighbouring satellites.

## 4. Pathfinding Algorithm

Pathfinding is responsible for finding a communication route between a source satellite and a destination satellite.

The system examines available connections and identifies a suitable path through the network.

The algorithm selection depends on the network requirements:

### 4.1 Breadth-First Search (BFS)

BFS explores neighbouring nodes level by level.

It can be used to find the shortest path in terms of the number of edges when all connections are treated equally.

### 4.2 Dijkstra's Algorithm

Dijkstra's algorithm calculates the shortest path in a weighted graph with non-negative edge weights.

It can be considered when communication links have different costs or latency values.

The final pathfinding algorithm will be selected according to the project's network model and routing requirements.

## 5. Failure Detection

Network failures can interrupt communication between satellites.

SatNexus considers two major failure scenarios:

### 5.1 Satellite Node Failure

A satellite becomes unavailable and cannot participate in communication.

The failed satellite is excluded from future route calculations.

### 5.2 Communication Link Failure

A communication connection between two satellites becomes unavailable.

The affected edge is treated as inactive so that the routing process does not use that connection.

## 6. Alternative Route Calculation

When the existing communication route becomes unavailable, the system attempts to identify another valid path.

The recovery process follows these steps:

1. Identify the failed satellite or communication link.
2. Update the network to mark the affected component unavailable.
3. Recalculate the path between the source and destination.
4. Check whether an alternative route exists.
5. Use the new route if it is valid.
6. Report communication failure if no alternative route is available.

This process helps demonstrate the resilience of the satellite network.

## 7. Network Recovery Workflow

The general recovery workflow is:

Start
  |
Initialize Satellite Network
  |
Select Source and Destination
  |
Calculate Communication Path
  |
Start Communication
  |
Simulate Network Failure
  |
Check Existing Path
  |
Is Path Available?
  |             |
 Yes            No
  |             |
Continue     Detect Failure
Communication   |
             Update Network
                 |
          Find Alternative Path
                 |
          Is Alternative Found?
             |          |
            Yes         No
             |          |
        Restore       Report
       Communication  Failure
             |          |
             +----+-----+
                  |
           Performance Analysis
                  |
                 End

## 8. Algorithm Performance Analysis

The performance of the network algorithms can be evaluated using the following parameters:

- **Time Complexity:** Measures the time required to calculate communication routes.
- **Space Complexity:** Measures the memory required to represent the network and execute algorithms.
- **Path Availability:** Determines whether a valid communication route exists.
- **Recovery Success:** Measures whether communication can be restored after a failure.
- **Communication Latency:** Evaluates the delay associated with communication routes.

The actual performance values will be determined during implementation and testing.

## 9. Expected Outcomes

The algorithm design aims to achieve:

- Efficient representation of satellite connections.
- Identification of communication routes.
- Detection and simulation of network failures.
- Calculation of alternative communication paths.
- Improved understanding of network resilience.
- Evaluation of routing and recovery performance.

## 10. Future Enhancements

Possible improvements include:

- Dynamic routing based on changing network conditions.
- Latency-aware path selection.
- Multiple simultaneous satellite failure simulation.
- Advanced recovery strategies.
- Intelligent routing optimization.

## 11. Conclusion

The algorithm design of SatNexus provides the foundation for simulating satellite communication and network recovery.

By using graph-based representation, pathfinding techniques, and failure-handling mechanisms, the system aims to demonstrate how satellite communication can continue even when individual network components become unavailable.

The proposed algorithms will be refined and evaluated during the implementation and testing phases.
