# Definition of Done (DoD) — SatNexus

A User Story, Bugfix, or Technical Spike is considered **"Done"** and eligible to be moved to the `Done` column and demonstrated during Sprint Review only when it satisfies 100% of the following requirements:

---

## 1. Code Quality & Implementation Standards
- [ ] **Acceptance Criteria Met:** All Given-When-Then criteria specified on the user story pass verification.
- [ ] **Coding Standards Followed:**
  - Python: Complies with PEP 8 and passes Flake8 syntax checks with no warnings.
  - TypeScript: Compiles with `"strict": true` and zero compiler warnings or `any` type escapes.
- [ ] **No Dead Code / Hardcoded Stubs:** All mock variables, commented-out dead code, and hardcoded simulation placeholders are removed.
- [ ] **State Separation Maintained:** Network topology remains immutable; dynamic failures are tracked exclusively via state overlays.

---

## 2. Testing & Verification Gates
- [ ] **Unit Tests Written & Passing:** Pytest unit test cases implemented for all new business logic following TDD cycles.
- [ ] **Regression Suite 100% Green:** The full test suite runs locally without a single failure or skipped test.
- [ ] **Code Coverage Threshold:** Test coverage achieves $\ge 85\%$ for all graph and routing services.
- [ ] **Edge Cases Covered:** Empty graphs, disconnected nodes, self-loops, negative edge weights, and duplicate insertions are validated with explicit assertions.

---

## 3. Version Control, Review & CI
- [ ] **Peer Review Completed:** Pull Request reviewed and approved by at least one team member.
- [ ] **Clean Branching & Commits:** Follows conventional commit format (`feat:`, `test:`, `fix:`, `docs:`, `refactor:`).
- [ ] **Continuous Integration Green:** GitHub Actions pipeline passes backend tests, frontend tests, and production build checks.
- [ ] **No Environment Spills:** `.gitignore` excludes `.venv`, `node_modules`, `coverage`, and `.pytest_cache`.

---

## 4. Documentation & Traceability
- [ ] **API Docs Synchronized:** OpenAPI schemas and `docs/api-specification.md` updated if endpoints changed.
- [ ] **Traceability Matrix Updated:** Requirements Traceability Matrix (`docs/testing/requirements-traceability-matrix.md`) reflects new test case IDs and user story status.
- [ ] **Trello Card Synchronized:** Story points, checklists, and PR links documented on the card.
