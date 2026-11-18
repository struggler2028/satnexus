# Sprint 1 – Implementation Details

## 1. Introduction

This document records the implementation activities performed during Sprint 1 of SatNexus.

The objective is to develop the initial satellite communication network using graph data structures and C++.

## 2. Technologies Used

- C++17
- Standard Template Library (STL)
- SFML 3.x
- CMake
- Git and GitHub
- VS Code

## 3. Source Code Modules

| File | Responsibility |
|---|---|
| Satellite.h | Defines satellite attributes |
| SatelliteNetwork.h | Declares graph operations |
| SatelliteNetwork.cpp | Implements graph operations |
| NetworkRenderer.h | Declares graphical rendering functions |
| NetworkRenderer.cpp | Implements network visualization |
| main.cpp | Initializes and runs the application |

## 4. Satellite Data Structure

Each satellite contains:

- Unique satellite ID.
- Satellite name.
- X-coordinate.
- Y-coordinate.

These attributes represent the identity and graphical position of each satellite.

## 5. Graph Representation

The satellite communication network is represented using an adjacency list.

Each graph node represents a satellite, while each edge represents a communication link.

Every communication link stores a weight representing its communication cost or distance.

The initial implementation uses an undirected weighted graph.

## 6. Network Visualization

SFML is used to develop the graphical representation.

The renderer is responsible for:

- Drawing satellite nodes.
- Displaying communication links.
- Showing satellite labels.
- Displaying connection weights.

## 7. Implementation Evidence

The following evidence will be added after successful execution:

- Source code screenshots.
- Graphical network screenshot.
- Sample execution output.
- GitHub commit references.

## 8. Implementation Status

The implementation status and verified results will be updated as development progresses.
