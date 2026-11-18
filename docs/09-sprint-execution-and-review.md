# SatNexus – Sprint Execution and Review

## 1. Introduction

SatNexus follows an Agile development approach to organise project tasks into smaller and manageable stages.

The project uses Scrum-style sprint planning, a Kanban-based task workflow, and Test-Driven Development (TDD) practices.

The development work is divided into three sprints.

## 2. Sprint Overview

| Sprint | Dates | Main Focus |
|---|---|---|
| Sprint 1 | 17–18 November 2026 | Foundation |
| Sprint 2 | 19 November 2026 | Failure Recovery |
| Sprint 3 | 20–21 November 2026 | Integration and Release |

## 3. Sprint 1 – Foundation

**Dates:** 17–18 November 2026

### Objectives

- Set up the project structure.
- Define the satellite communication network.
- Represent satellites and ground stations as graph vertices.
- Represent communication links as graph edges.
- Implement basic graph operations.
- Develop the initial graph visualization.

### Planned Tasks

- Create the initial network configuration.
- Implement graph representation.
- Implement BFS and DFS traversal.
- Implement shortest path calculation.
- Display the network graph.
- Test basic graph operations.

### Expected Deliverables

- Initial working graph model.
- Network visualization.
- Basic graph traversal and pathfinding functionality.

### Sprint Review

The team reviews the graph structure, initial visualization, and basic graph operations.

**Sprint Status:** To be updated by the team after the sprint review.

## 4. Sprint 2 – Failure Recovery

**Date:** 19 November 2026

### Objectives

- Implement network failure simulation.
- Identify critical nodes and communication links.
- Calculate alternative routes after failures.
- Analyse network connectivity.

### Planned Tasks

- Add controls to disable and restore satellites.
- Add controls to disable and restore communication links.
- Implement bridge detection.
- Implement articulation point detection.
- Implement connected components analysis.
- Recalculate shortest paths after failures.
- Test alternative route calculation.

### Expected Deliverables

- Working failure simulation.
- Critical node and link detection.
- Alternative route calculation.
- Updated network connectivity analysis.

### Sprint Review

The team reviews how the network behaves when a satellite or communication link becomes inactive.

**Sprint Status:** To be updated by the team after the sprint review.

## 5. Sprint 3 – Integration and Release

**Dates:** 20–21 November 2026

### Objectives

- Integrate all project modules.
- Complete the user interface.
- Test normal and failure scenarios.
- Verify network analytics.
- Prepare the final project demonstration.

### Planned Tasks

- Integrate graph algorithms with the interface.
- Add message transmission simulation.
- Add route highlighting and animation.
- Verify network analytics.
- Run unit and integration tests.
- Fix identified issues.
- Prepare project documentation.
- Prepare the final demonstration.

### Expected Deliverables

- Integrated SatNexus application.
- Tested graph and simulation functionality.
- Final documentation.
- Demonstration-ready application.

### Sprint Review

The team reviews the complete application, tests the main scenarios, and checks whether the project objectives have been achieved.

**Sprint Status:** To be updated by the team after the sprint review.

## 6. Agile Workflow

The team follows a simple Agile workflow:

1. Add project tasks to the backlog.
2. Select tasks during sprint planning.
3. Assign tasks to team members.
4. Track progress using a Kanban board.
5. Develop and test the selected features.
6. Review completed work at the end of each sprint.
7. Discuss improvements for the next sprint.

## 7. Testing Approach

The project follows Test-Driven Development (TDD), using three main stages:

- **Red:** Write a test that initially fails.
- **Green:** Write the minimum code required to pass the test.
- **Refactor:** Improve the code while keeping the test successful.

Unit tests are used to check individual graph operations, while integration tests check how different parts of the simulation work together.

## 8. Definition of Done

A task is considered complete when:

- The required functionality is implemented.
- The code works as expected.
- Relevant tests pass.
- The feature is integrated with the application.
- The documentation is updated where required.
- The changes are committed to the project repository.

## 9. Sprint Review and Retrospective

At the end of each sprint, the team reviews completed work and checks it against the planned objectives.

The retrospective focuses on:

- What went well.
- What problems occurred.
- What can be improved.
- What changes should be made in the next sprint.

## 10. Risk Management

| Risk | Possible Solution |
|---|---|
| Incorrect shortest path | Test the algorithm with different network configurations. |
| Failure causes unexpected disconnection | Test node and link failures separately. |
| Integration issues | Integrate modules in smaller stages. |
| Testing delays | Prepare test cases during development. |
| Data storage issues | Use LocalStorage as a fallback when required. |

## 11. Conclusion

The Agile approach helps the team divide SatNexus into smaller development stages.

Sprint planning, task tracking, testing, and sprint reviews make the development process organised and help the team identify problems early.
