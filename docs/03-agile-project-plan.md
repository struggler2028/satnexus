
# Agile Development Plan

## 1. Methodology
SatNexus follows an iterative Agile development approach combining Scrum-style planning, Kanban workflow management, and Extreme Programming engineering practices.

## 2. Product Backlog
| ID | User Story | Priority | Story Points |
|----|------------|----------|--------------|
| US-01 | Project setup | High | 2 |
| US-02 | Graph data model | High | 5 |
| US-03 | Network visualization | High | 5 |
| US-04 | Shortest-path routing | High | 5 |
| US-05 | Satellite failure simulation | High | 3 |
| US-06 | Link failure simulation | High | 3 |
| US-07 | Automatic route recovery | High | 5 |
| US-08 | Resilience metrics | High | 5 |
| US-09 | Event history | Medium | 3 |
| US-10 | Testing and CI | High | 5 |
| US-11 | Documentation and release | High | 3 |

Story points are initial estimates and may be refined during sprint planning.

## 3. Sprint Plan

### Sprint 1: Foundation
November 17–18, 2026

Planned Deliverables:
- Requirements specification
- Architecture planning
- Repository setup
- Initial graph model
- Basic visualization

### Sprint 2: Failure Recovery
November 19, 2026

Planned Deliverables:
- Satellite failure simulation
- Link failure simulation
- Shortest-path routing
- Alternative route calculation
- Unit tests

### Sprint 3: Integration and Release
November 20–21, 2026

Planned Deliverables:
- Dashboard integration
- Resilience metrics
- Integration testing
- Documentation
- Final demonstration

## 4. Kanban Workflow
Product Backlog → Sprint Ready → In Progress → Code Review → Testing → Done

Blocked tasks will be tracked separately.

## 5. TDD Strategy
The project will follow the Red-Green-Refactor cycle:

RED: Write a test that initially fails.

GREEN: Implement the minimum code required to pass.

REFACTOR: Improve code quality while keeping tests passing.

## 6. XP Practices
Planned engineering practices include:
- Test-Driven Development
- Continuous Integration
- Refactoring
- Simple Design
- Small Releases
- Code Reviews
- Collective Code Ownership

Pair programming will be used when team availability permits.

## 7. Definition of Done
A user story is complete when:
- Acceptance criteria are satisfied.
- Relevant tests pass.
- Code is reviewed.
- Changes are integrated.
- Documentation is updated.
- Evidence is linked to the task.

## 8. Risks
| Risk | Mitigation |
|------|------------|
| Limited development time | Prioritize MVP features |
| Integration issues | Integrate incrementally |
| Algorithm defects | Automated tests |
| Uneven workload | Assign owners and review progress |
| Scope expansion | Defer optional features |

## 9. Current Status
Planning and requirements documentation are being prepared.

Implementation, testing, and sprint review outcomes will be recorded as work progresses.
