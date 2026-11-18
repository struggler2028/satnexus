# SatNexus – Implementation Details

## 1. Introduction

SatNexus is a graph-based satellite communication network simulation developed to demonstrate how satellite communication networks can be represented, analysed, and recovered after failures.

The application represents satellites and ground stations as vertices and communication links as edges. It allows users to view the network, find shortest paths, simulate failures, and analyse network connectivity.

## 2. Technology Stack

The project uses the following technologies:

- **Next.js 15:** Framework used to build the web application.
- **React:** Used to create the user interface and interactive components.
- **TypeScript:** Used to implement graph operations and application logic.
- **Cytoscape.js:** Used for graph visualization, route highlighting, and message transmission animation.
- **Next.js API Routes:** Used to handle communication between the application and snapshot storage.
- **LocalStorage:** Used as a browser-based fallback for storing network snapshots.
- **Supabase PostgreSQL:** Optional database storage when configured.
- **C++:** Used for the standalone Stage 1 reference implementation.
- **Git and GitHub:** Used for version control and project collaboration.
- **Vercel:** Used as the deployment platform.

## 3. Network Configuration

The sample network contains:

- 6 satellites: S1, S2, S3, S4, S5, S6
- 2 ground stations: G1, G2
- 8 total vertices
- 11 communication links

The network is represented using an undirected weighted graph.

Each communication link contains two weights:

- Distance in kilometres
- Latency in milliseconds

These weights are used to calculate the shortest communication route according to the selected parameter.

## 4. Implementation Modules

### 4.1 Graph Representation

The network is represented using a graph structure. Satellites and ground stations are stored as vertices, while communication links are stored as edges.

Each edge contains information about its connected nodes, distance, latency, and active or failed status.

### 4.2 Shortest Path Calculation

Dijkstra's algorithm is used to calculate the shortest path between two selected nodes.

The user can choose distance or latency as the path calculation parameter. The application considers only active communication links.

### 4.3 Network Traversal

BFS and DFS are used to explore the network.

- BFS explores neighbouring nodes level by level.
- DFS explores one branch before moving to another branch.

These algorithms help analyse network reachability and connectivity.

### 4.4 Failure Simulation

The application allows users to manually disable a satellite, ground station, or communication link.

When a failure occurs, the graph is updated to reflect the inactive component. The application then recalculates network connectivity and available routes.

### 4.5 Alternative Route Calculation

If a communication link fails, the application checks whether another active route is available.

If an alternative path exists, the message can be rerouted through that path. If no path exists, message transmission fails.

### 4.6 Critical Node and Link Detection

Articulation point detection is used to identify important vertices whose removal can disconnect the network.

Bridge detection is used to identify important communication links whose removal can increase the number of connected components.

### 4.7 Graph Visualization

Cytoscape.js is used to display the network graph.

The interface highlights selected routes and shows message movement through the communication links.

## 5. Data Storage and API

The application uses the Next.js API route `/api/snapshot` to handle network snapshot operations.

- GET is used to retrieve a saved network snapshot.
- PUT is used to save or update a network snapshot.

Browser LocalStorage is available as a fallback storage mechanism.

Supabase PostgreSQL can be used for optional persistent storage when configured.

The project also contains an SQL schema for networks, events, and transmissions. These tables are not currently connected to the application's runtime persistence.

## 6. Testing

The project includes 10 automated tests divided into two test files:

- `src/lib/graph.test.ts` contains 7 tests.
- `src/lib/simulation.integration.test.ts` contains 3 tests.

These tests check graph operations and simulation logic, including important network and transmission behaviour.

The tests do not represent complete browser-based end-to-end testing.

## 7. Implementation Workflow

The general workflow of the application is:

1. Load the sample satellite network.
2. Display satellites, ground stations, and communication links.
3. Select source and destination nodes.
4. Calculate the shortest communication path.
5. Simulate message transmission.
6. Disable a selected node or communication link.
7. Recalculate connectivity and alternative routes.
8. Display the updated network analysis.

## 8. C++ Reference Implementation

The project also contains a standalone C++ Stage 1 reference implementation.

It demonstrates graph-related logic using C++. The current browser application uses its TypeScript graph engine and does not directly call the C++ implementation.

## 9. Conclusion

The implementation of SatNexus demonstrates how graph theory can be applied to satellite communication network simulation.

Using graph traversal, shortest path algorithms, failure simulation, and connectivity analysis, the application shows how network failures can affect communication and how alternative routes can help maintain connectivity.
