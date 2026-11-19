# Trello Kanban Board Setup Guide — SatNexus

**Board Name:** `SatNexus | Agile Software Development`  
**Purpose:** Agile flow visualization and sprint management for SatNexus academic project  

---

## 1. Board Structure & List Configuration

To create or configure this board manually in Trello:
1. Create a new Board titled **"SatNexus | Agile Software Development"**.
2. Select a deep navy or dark space background theme.
3. Configure the following 7 lists (columns) from left to right:

| List Name | WIP Limit | Description |
|---|:---:|---|
| **Product Backlog** | $\infty$ | Master repository of all uncommitted user stories and technical tasks. |
| **Sprint Ready** | 10 | Prioritized, estimated stories meeting the Definition of Ready (DoR). |
| **In Progress** | **3** | Active implementation by developers or pair programming teams. |
| **Code Review** | **2** | Pull requests awaiting peer review and approval. |
| **Testing** | **3** | Active automated or manual verification against acceptance criteria. |
| **Done** | $\infty$ | Completed stories satisfying the Definition of Done (DoD). |
| **Blocked** | **2** | Tasks impeded by external dependencies or technical roadblocks. |

*(Note: In Trello, install the free "List Limits" Power-Up to visually enforce the WIP limits).*

---

## 2. Standard Label Taxonomy

Configure the following 8 labels in Trello (Board Menu $\to$ Labels):

| Label Name | Color | Usage |
|---|---|---|
| `Priority: P0 - Critical` | Red | Critical path features (Dijkstra, failure simulation, recovery) |
| `Priority: P1 - Enhanced` | Orange | Enhancements (Scenarios, Tarjan cut-vertices) |
| `Priority: P2 - Low` | Yellow | Nice-to-have cosmetic or future tasks |
| `Component: Backend` | Blue | Python, FastAPI, NetworkX, REST API |
| `Component: Frontend` | Green | React, TypeScript, Cytoscape.js, Tailwind CSS |
| `Component: Graph Algorithms`| Purple | Graph data structure, Dijkstra, BFS/DFS, Tarjan |
| `Practice: TDD & Testing` | Sky Blue | Pytest, Vitest, test cases, test plan |
| `Practice: Agile & SDLC` | Pink | Sprint ceremonies, documentation, retrospectives |
| `Type: Bug / Defect` | Dark Red | Unintended bugs or runtime defects |

---

## 3. Importing the Backlog via CSV

A structured CSV backlog is provided at [`docs/trello/product-backlog.csv`](file:///e:/JIIT/ODD_Sem_2026/Agile_Software_Development/satnexus/docs/trello/product-backlog.csv).

### How to Import:
1. Open Trello in your web browser.
2. Ensure you have the **"CSV Import"** or **"Trello Import"** Power-Up enabled, or use a standard third-party extension (e.g., Trello CSV Importer).
3. Select `docs/trello/product-backlog.csv`.
4. Map the columns:
   - `Card Name` $\to$ Title
   - `Description` $\to$ Description
   - `List` $\to$ List Name (`Sprint Ready` or `Done`)
   - `Labels` $\to$ Labels
   - `Estimate` $\to$ Custom Field / Title prefix
5. Click **Import**. All 22 user stories will populate with full acceptance criteria, checklists, and estimates.
