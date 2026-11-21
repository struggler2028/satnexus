# Sprint 3 – Testing and Validation

## 1. Testing Objective

The objective of Sprint 3 testing is to verify message creation, satellite-to-satellite communication, message forwarding, transmission status tracking and graphical message visualization.

## 2. Planned Test Cases

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| TC-20 | Create a valid message | Message is created |
| TC-21 | Select a valid source satellite | Source is accepted |
| TC-22 | Select an invalid destination | Validation error is displayed |
| TC-23 | Transmit between connected satellites | Message is delivered |
| TC-24 | Transmit through intermediate satellites | Message follows the selected route |
| TC-25 | Transmit after a link failure | An alternative route is used if available |
| TC-26 | Transmit when no route exists | Transmission fails |
| TC-27 | Transmit through a failed satellite | Failed satellite is excluded |
| TC-28 | Track successful transmission | Delivered status is displayed |
| TC-29 | Display message movement | Message movement is visualized |

## 3. Testing Approach

Testing will be performed using:

- Functional testing.
- Input validation.
- Message transmission testing.
- Route integration testing.
- Failure handling testing.
- Graphical interface testing.
- Integration testing.

## 4. Testing Results

Actual results, pass/fail status and supporting screenshots will be recorded after running the test cases.

| Test ID | Actual Result | Status |
|---|---|---|
| TC-20 to TC-29 | Pending execution | Not Tested |

## 5. Defect Tracking

Any message delivery errors, incorrect forwarding, routing integration issues or graphical rendering problems will be documented and resolved.

## 6. Conclusion

Sprint 3 testing will validate the message transmission and network communication capabilities of SatNexus.
