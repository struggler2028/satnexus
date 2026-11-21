# Sprint 3 – Implementation Details

## 1. Introduction

This document records the implementation activities performed during Sprint 3 of SatNexus.

The objective is to introduce message transmission between satellites by integrating the existing graph representation, shortest-path routing and failure simulation functionalities.

## 2. Technologies Used

- C++17
- Standard Template Library (STL)
- SFML 3.x
- CMake
- Git and GitHub

## 3. Implementation Modules

| Module | Responsibility |
|---|---|
| Message | Stores message information |
| Message Handler | Creates and manages messages |
| Communication Manager | Coordinates message transmission |
| Routing Module | Determines the communication route |
| Forwarding Module | Handles intermediate satellite forwarding |
| Network Renderer | Visualizes message transmission |

## 4. Message Creation

The system will allow users to create messages by specifying:

- Message content.
- Source satellite ID.
- Destination satellite ID.

The system will validate the selected satellites before starting transmission.

## 5. Satellite Communication

The communication module will establish a logical transmission process between the selected source and destination satellites.

The existing routing functionality will be used to determine an available path.

## 6. Message Forwarding

Messages will travel through intermediate satellites according to the calculated route.

The system will:

- Identify the next satellite in the route.
- Forward the message to the next operational satellite.
- Check whether the communication link is available.
- Handle transmission failures.
- Confirm delivery at the destination.

## 7. Transmission Status Tracking

The system will maintain the transmission result.

Possible statuses include:

- Pending.
- In Transit.
- Delivered.
- Failed.

## 8. Graphical Visualization

SFML will be used to represent message transmission visually.

The graphical interface will aim to:

- Highlight source and destination satellites.
- Display the selected communication route.
- Show message movement between satellites.
- Indicate successful or failed transmission.

## 9. Implementation Evidence

The following evidence will be added after successful execution:

- Message creation source code.
- Message forwarding demonstration.
- Successful transmission output.
- Failed transmission demonstration.
- Graphical message movement screenshots.

## 10. Implementation Status

The implementation status and verified results will be updated as development progresses.
