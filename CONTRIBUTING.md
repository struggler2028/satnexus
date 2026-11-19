# Contributing to SatNexus

Thank you for your interest in contributing to **SatNexus: Graph-Based Satellite Communication Network Resilience and Failure Recovery**! This project is maintained under the Agile Software Development curriculum.

---

## 1. Agile Code of Conduct & Core Principles

We adhere strictly to Extreme Programming (XP) practices:
1. **Test-Driven Development (TDD):** Every new feature or bugfix begins with a failing automated test (Red), minimal implementation to pass (Green), and disciplined refactoring (Refactor). Never submit code without test coverage.
2. **Simple Design:** Implement the simplest solution that satisfies the current user story acceptance criteria. Avoid speculative over-engineering.
3. **Collective Ownership:** Any team member may refactor, optimize, or fix defects across any component in the repository.
4. **Continuous Integration:** Keep commits atomic, frequent, and verified via GitHub Actions before merging into `main`.

---

## 2. Git Workflow & Branching Strategy

We follow a modified GitHub Flow with trunk-based development:
- **`main`**: Production-ready branch. Always deployable and green.
- **Feature Branches**: Named systematically after their Trello/Backlog User Story ID:
  - `feat/US-04-dijkstra-routing`
  - `feat/US-07-automatic-recovery`
  - `fix/US-09-resilience-rounding-bug`
  - `docs/US-11-sprint-retrospective`

### Commit Message Guidelines
Follow the Conventional Commits specification:
```text
feat(routing): implement Dijkstra path calculation with latency weights
test(recovery): add unit tests for node failure rerouting
fix(metrics): resolve zero division error in reachability ratio for empty graphs
docs(agile): document Sprint 2 review and velocity metrics
refactor(graph): isolate failure state overlays from immutable topology
ci(workflow): add automated frontend vitest execution stage
```

---

## 3. Local Development Setup

### Backend (Python 3.10+ / 3.14)
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
pytest -v --cov=app
uvicorn app.main:app --reload --port 8000
```

### Frontend (Node.js 18+ / React / Vite)
```bash
cd frontend
npm install
npm test
npm run dev
```

---

## 4. Definition of Done (DoD) Checklist

Before submitting a Pull Request for review:
- [ ] Code implements acceptance criteria specified in the target User Story.
- [ ] Automated unit and integration tests written and passing locally.
- [ ] No regression in existing test suite.
- [ ] TypeScript compilation (`npm run build`) passes with zero type errors.
- [ ] Backend adheres to PEP 8 standards; no unhandled exceptions.
- [ ] Trello card moved to `Code Review` column with PR link attached.
- [ ] All CI checks pass successfully on GitHub Actions.
