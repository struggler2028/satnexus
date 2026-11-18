# SatNexus – User Guide and Demonstration

## 1. Introduction

SatNexus is a graph-based satellite communication network simulation. It allows users to visualise a satellite network, calculate communication routes, simulate failures, and analyse network connectivity.

This guide explains how to use the application and demonstrate its main features.

## 2. Network Overview

The sample network contains:

- 6 satellites: S1, S2, S3, S4, S5, S6
- 2 ground stations: G1 and G2
- 11 communication links
- 8 total nodes

Each communication link has distance and latency values.

The application uses these values to calculate communication routes.

## 3. How to Use the Application

### Step 1: Open the Application

Open the SatNexus application in a web browser.

The network graph is displayed with satellites, ground stations, and communication links.

### Step 2: Select Source and Destination

Choose the source and destination nodes for communication.

For example:

- Source: S1
- Destination: S4

### Step 3: Select the Path Metric

Choose whether the shortest path should be calculated using:

- Distance
- Latency

The application calculates the route using the selected metric.

### Step 4: Calculate the Route

Run the shortest path calculation.

The selected route is highlighted in the graph.

### Step 5: Simulate Message Transmission

Start message transmission to observe how the message moves through the selected route.

The application displays the transmission progress through the network.

### Step 6: Simulate a Failure

Use the failure controls to disable a satellite, ground station, or communication link.

The graph and network analysis are updated according to the failure.

### Step 7: Restore the Network

Use the restore controls or reset the simulation to return the network to its initial state.

## 4. Demonstration Scenario 1 – Normal Network

**Objective:** Demonstrate shortest path calculation under normal network conditions.

Select:

- Source: S1
- Destination: S4
- Metric: Distance or Latency

### Expected Result

The selected route is:

S1 → S2 → S4

Communication links:

- E0: S1–S2
- E6: S2–S4

Total distance:

120 + 220 = 340 km

Total latency:

15 + 21 = 36 ms

Total hops: 2

Both distance and latency select this route in the sample network.

## 5. Demonstration Scenario 2 – Communication Link Failure

**Objective:** Demonstrate alternative route calculation after a link failure.

Disable communication link E6 between S2 and S4.

The original route S1 → S2 → S4 is no longer available.

### Expected Result

The application calculates an alternative route:

S1 → S3 → S4

Communication links:

- E5: S1–S3
- E2: S3–S4

Total distance:

250 + 140 = 390 km

Total latency:

24 + 16 = 40 ms

Total hops: 2

The message can still reach S4 through the alternative route.

This demonstrates successful rerouting after a communication link failure.

## 6. Demonstration Scenario 3 – Ground Station Isolation

**Objective:** Demonstrate how a failure can disconnect a ground station from the network.

Disable communication link E8 between S1 and G1.

G1 has only one communication link, so disabling E8 isolates G1.

### Expected Result

- Active nodes: 8
- Active links: 10
- Connected components: 2
- Nodes reachable from S1: 7 out of 8
- Network reachability: 87.5%
- Active bridges: 0
- Articulation points: 0

There is no active route from G1 to S4, so message transmission from G1 to S4 fails.

The result shows that a network can contain active nodes that are not connected to the rest of the network.

## 7. Resetting the Simulation

After completing the failure scenarios, use the reset or restore functionality to return the network to its original configuration.

This allows the user to perform the demonstrations again from the baseline network.

## 8. Important Results

The demonstration shows three important behaviours:

1. The application can calculate shortest communication routes.
2. The application can find an alternative route when a communication link fails, if another route is available.
3. The application can identify network disconnection when a critical communication link fails.

## 9. Conclusion

SatNexus demonstrates the use of graph theory in satellite communication network simulation.

Through network visualization, shortest path calculation, failure simulation, and connectivity analysis, users can understand how communication networks behave under normal and failure conditions.
