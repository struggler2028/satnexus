# Sprint 2 – Implementation Details

## 1. Introduction

This document records the implementation activities performed during Sprint 2 of SatNexus.

The objective is to enhance the existing satellite network with routing capabilities and failure simulation.

## 2. Technologies Used

- C++17
- Standard Template Library (STL)
- SFML 3.x
- CMake
- Git and GitHub

## 3. Implementation Modules

| Module | Responsibility |
|---|---|
| ShortestPath | Calculates minimum-cost routes |
| Dijkstra Algorithm | Finds shortest paths in the weighted graph |
| Satellite Failure | Handles unavailable satellites |
| Link Failure | Handles unavailable communication links |
| Route Recovery | Identifies alternative paths |
| Network Update | Updates network state after failures |

## 4. Shortest Path Routing

Dijkstra's algorithm will be implemented to calculate the minimum-cost path between two operational satellites.

The algorithm will:

- Select the node with minimum tentative distance.
- Relax available neighboring connections.
- Maintain predecessor information.
- Reconstruct the shortest route.
- Calculate the total route cost.

## 5. Satellite Failure Simulation

The system will allow selected satellites to be marked as failed.

Failed satellites will be excluded from future routing calculations.

## 6. Communication Link Failure

The system will simulate communication link failures by disabling selected connections.

Routing operations will consider only operational links.

## 7. Alternative Route Identification

When a satellite or communication link fails, the system will recalculate the route between the source and destination.

If another valid route exists, it will be identified and its total cost calculated.

## 8. Implementation Evidence

The following evidence will be added after successful execution:

- Dijkstra algorithm source code.
- Satellite failure demonstration.
- Communication link failure demonstration.
- Alternative route output.
- Graphical simulation screenshots.

## 9. Implementation Status

The implementation status and verified results will be updated as development progresses.
