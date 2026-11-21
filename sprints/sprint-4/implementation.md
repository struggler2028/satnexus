# Sprint 4 – Implementation Details

## 1. Introduction

This document records the implementation activities performed during Sprint 4 of SatNexus.

The objective is to introduce network analytics and performance monitoring capabilities to evaluate the efficiency and reliability of the satellite communication network.

## 2. Technologies Used

- C++17
- Standard Template Library (STL)
- SFML 3.x
- CMake
- Git and GitHub

## 3. Implementation Modules

| Module | Responsibility |
|---|---|
| Network Analytics | Calculates network statistics |
| Connectivity Analyzer | Identifies active and disconnected nodes |
| Cost Analyzer | Evaluates communication costs |
| Reliability Analyzer | Evaluates network reliability |
| Performance Monitor | Records execution and transmission metrics |
| Statistics Renderer | Displays network statistics graphically |

## 4. Network Connectivity Analysis

The system will analyze the current satellite network by calculating:

- Total number of satellites.
- Number of operational satellites.
- Number of failed satellites.
- Number of active communication links.
- Number of disconnected satellites.

## 5. Communication Cost Analysis

The system will evaluate communication costs using the weights assigned to network connections.

The analysis will include:

- Shortest communication route cost.
- Average communication link cost.
- Comparison of alternative routes.
- Identification of efficient communication paths.

## 6. Network Reliability Evaluation

The system will evaluate network reliability under different failure scenarios.

It will:

- Identify unavailable satellites.
- Detect failed communication links.
- Analyze remaining network connectivity.
- Evaluate alternative route availability.
- Record network status after failures.

## 7. Performance Monitoring

The performance monitoring module will record:

- Routing execution time.
- Successful message transmissions.
- Failed message transmissions.
- Message delivery results.
- Performance under different network conditions.

## 8. Graphical Statistics Dashboard

SFML will be used to display network statistics.

The dashboard will aim to show:

- Active and failed satellites.
- Available and unavailable links.
- Communication cost information.
- Network connectivity statistics.
- Message transmission results.

## 9. Implementation Evidence

The following evidence will be added after successful execution:

- Network analytics source code.
- Connectivity analysis output.
- Communication cost results.
- Performance monitoring output.
- Graphical dashboard screenshots.

## 10. Implementation Status

The implementation status and verified results will be updated as development progresses.
