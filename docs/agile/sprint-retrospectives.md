# Sprint Retrospectives & Continuous Improvement — SatNexus

**Framework:** Start, Stop, Continue & 5 Whys Root Cause Analysis  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  

---

## 1. Sprint 1 Retrospective (November 18, 2026)

### 1.1 Team Assessment Matrix
- **Continue:**
  - High team enthusiasm and clear conceptual vision of satellite constellation resilience.
  - Using feature branches and Git pull requests for clean version tracking.
- **Stop:**
  - Writing code without automated tests (relying solely on manual console prints).
  - Attempting to build complex native C++ desktop graphics without checking whether compilers and libraries are installed across all team machines.
- **Start:**
  - Establishing an explicit `.gitignore` to prevent environmental spills.
  - Designing an automated test suite before writing algorithms (TDD).

### 1.2 Actionable Commitments
1. Research and evaluate moving to a Python + React web architecture to guarantee cross-platform portability.
2. Establish a standard Definition of Done (DoD) before beginning Sprint 2.

---

## 2. Sprint 2 Retrospective (November 19, 2026)

### 2.1 5 Whys Root Cause Analysis: Sprint 2 Velocity Slip
- *Problem:* Only 8 of 24 planned story points were delivered; 16 story points rolled over.
  1. **Why?** Core routing and failure injection code was not merged into the working codebase by end of day.
  2. **Why?** The team spent extensive time debating and refactoring C++ desktop code before pivoting to Python.
  3. **Why?** The technical spike in Sprint 1 did not have a clear timebox or pass/fail criterion.
  4. **Why?** Lack of formal Definition of Ready (DoR) led to starting tasks with unresolved technical dependencies.
  5. **Why?** The team prioritized individual exploration over collective XP pair programming.
- *Root Cause:* Absence of strict timeboxing on technical spikes and lack of pair programming on core architectural decisions.

### 2.2 Team Assessment Matrix
- **Continue:**
  - Pragmatic willingness to pivot when a technology path proves unviable.
  - Mathematical precision in defining resilience formulas.
- **Stop:**
  - Working in silos without synchronized daily check-ins.
  - Postponing automated test authoring to the end of the sprint.
- **Start:**
  - Strict pair programming on all remaining algorithmic implementations.
  - Daily WIP limits in Kanban (maximum 3 in progress).
  - Intensive Sprint 3 catch-up schedule.

---

## 3. Sprint 3 Retrospective (November 21, 2026)

### 3.1 Velocity & Delivery Assessment
- **Story Points Burned:** 40 SP delivered in 48 hours.
- **Test Suite Pass Rate:** 100% (All backend and frontend automated tests passing).
- **CI Build Status:** Green.

### 3.2 Team Assessment Matrix
- **Continue:**
  - Extreme Programming pair programming sessions—proved 3x faster and virtually eliminated runtime bugs.
  - Test-Driven Development (TDD)—writing failing Pytest assertions first ensured edge cases (disconnected nodes, negative weights) were handled cleanly before UI wiring.
  - Strict Kanban WIP limits—prevented task congestion and ensured every card made it across the line to `Done`.
- **Stop:**
  - Leaving continuous integration setup to the final iteration. Future projects will establish GitHub Actions on Day 1.
- **Start:**
  - Maintain the comprehensive documentation and traceability standards in future software engineering courses.
