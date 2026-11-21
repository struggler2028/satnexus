# Sprint 2 – Testing and Validation

## 1. Testing Objective

The objective of Sprint 2 testing is to verify shortest-path calculation, satellite failure handling, communication link failure and alternative route identification.

## 2. Planned Test Cases

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| TC-11 | Calculate shortest path between connected satellites | Minimum-cost path is returned |
| TC-12 | Calculate path to unreachable satellite | No path is reported |
| TC-13 | Calculate route with multiple possible paths | Lowest-cost path is selected |
| TC-14 | Mark a satellite as failed | Satellite becomes unavailable |
| TC-15 | Calculate route through a failed satellite | Failed satellite is excluded |
| TC-16 | Disable a communication link | Link becomes unavailable |
| TC-17 | Calculate route after link failure | Remaining valid path is selected |
| TC-18 | Calculate route when an alternative exists | Alternative route is returned |
| TC-19 | Calculate route when all paths are unavailable | No valid route is reported |

## 3. Testing Approach

Testing will be performed using:

- Functional testing.
- Algorithm correctness testing.
- Failure simulation testing.
- Graph connectivity verification.
- Route cost validation.
- Integration testing.

## 4. Testing Results

Actual results, pass/fail status and supporting screenshots will be recorded after running the test cases.

| Test ID | Actual Result | Status |
|---|---|---|
| TC-11 to TC-19 | Pending execution | Not Tested |

## 5. Defect Tracking

Compilation errors, incorrect route calculations and failure-handling issues will be documented and resolved.

## 6. Conclusion

Sprint 2 testing will validate the routing and failure simulation capabilities of the SatNexus network.
