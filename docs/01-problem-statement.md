
# Problem Statement and Project Vision

## 1. Background
Satellite communication networks consist of interconnected satellites that exchange information through communication links.

Failures in satellites or communication links can affect network connectivity, resulting in communication disruption.

## 2. Problem Definition
Traditional fixed communication paths may become unavailable when a network component fails.

A simulation-based approach is needed to study network behavior, detect disruptions, and evaluate alternative communication paths.

## 3. Proposed Solution
SatNexus will represent a satellite network as a weighted graph:

- Vertices represent satellites.
- Edges represent communication links.
- Edge weights represent simulated communication costs or latency.

The system will simulate component failures and use graph algorithms to determine alternative routes.

## 4. Project Goals
1. Develop an interactive network visualization.
2. Implement shortest-path routing.
3. Simulate node and edge failures.
4. Support automatic route recalculation.
5. Measure network resilience.
6. Provide an intuitive monitoring dashboard.

## 5. Project Scope

### In Scope
- Graph-based network simulation
- Interactive satellite topology
- Node and link failure simulation
- Shortest-path computation
- Route recovery
- Network performance metrics

### Out of Scope
- Real satellite hardware integration
- Live satellite telemetry
- Physical orbital propagation
- Real-world communication protocols

## 6. Expected Outcome
A functional simulation platform demonstrating how graph algorithms can support resilient satellite communication networks.
