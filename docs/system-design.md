# System Design & Algorithmic Formulation — SatNexus

**Document Version:** 2.0  
**Project:** SatNexus (Graph-Based Satellite Communication Network Resilience)  

---

## 1. Mathematical Formulation & Graph Modeling

A satellite communication constellation is modeled as an undirected, weighted graph:
$$G = (V, E, w)$$

Where:
- $V = \{v_1, v_2, \dots, v_n\}$ is the set of satellite nodes. Each node $v_i$ possesses attributes $(id, \text{name}, x, y, \text{state})$, where $\text{state} \in \{\text{OPERATIONAL}, \text{FAILED}\}$.
- $E = \{(u, v) \mid u, v \in V, u \neq v\}$ is the set of inter-satellite communication links.
- $w: E \to \mathbb{R}^+$ is the positive weight function representing transmission and propagation delay (latency) in milliseconds:
  $$w(u, v) = \frac{d(u, v)}{c} + t_{\text{proc}}$$
  Where $d(u, v)$ is simulated Euclidean/orbital distance, $c \approx 3 \times 10^5 \text{ km/s}$ is the speed of light in vacuum, and $t_{\text{proc}}$ is on-board routing overhead.
- All edge weights are strictly positive: $\forall e \in E, w(e) > 0$.

### 1.1 Active Operational Subgraph
Let $V_F \subset V$ denote the set of currently failed satellite nodes, and $E_F \subset E$ denote the set of currently failed links.
The active routing subgraph $G_{\text{active}} = (V_A, E_A, w)$ is dynamically defined as:
$$V_A = V \setminus V_F$$
$$E_A = \{(u, v) \in E \setminus E_F \mid u \in V_A \land v \in V_A\}$$

---

## 2. Graph Algorithms & Complexity

### 2.1 Dijkstra's Shortest-Path Routing
Given a source $S \in V_A$ and destination $D \in V_A$, Dijkstra's algorithm computes the path $P^* = (v_0 = S, v_1, \dots, v_k = D)$ minimizing the cumulative latency:
$$L(P^*) = \min_{P \in \mathcal{P}_{S \to D}} \sum_{i=0}^{k-1} w(v_i, v_{i+1})$$

- **Data Structure:** Min-Heap priority queue storing pairs $(\text{distance}, v)$.
- **Time Complexity:** $O(|E_A| + |V_A| \log |V_A|)$ using binary heap.
- **Space Complexity:** $O(|V_A| + |E_A|)$ for distances and predecessor map.
- **Handling Disconnections:** If $D$ is unreachable from $S$ in $G_{\text{active}}$, the algorithm terminates with $\text{dist}[D] = \infty$, returning an explicit `UNREACHABLE` status.

### 2.2 Connected Components & Graph Partitioning
To detect whether node failures have split the constellation into disjoint sub-networks:
- Breadth-First Search (BFS) or Depth-First Search (DFS) identifies all connected components:
  $$\mathcal{C} = \{C_1, C_2, \dots, C_m\}, \quad \bigcup C_i = V_A, \quad C_i \cap C_j = \emptyset$$
- **Time Complexity:** $O(|V_A| + |E_A|)$.
- **Largest Connected Component (LCC):** $C_{\max} = \arg\max_{C \in \mathcal{C}} |C|$.

### 2.3 Articulation Points (Cut Vertices) & Bridges
Single points of failure in the satellite constellation are determined using Tarjan's bridge and articulation point algorithm:
- Uses discovery time $\text{disc}[u]$ and lowest reachable ancestor $\text{low}[u]$ via DFS traversal:
  - Node $u$ is an articulation point if in the DFS tree:
    1. $u$ is the root and has $\ge 2$ children, or
    2. $u$ is not the root and has a child $v$ such that $\text{low}[v] \ge \text{disc}[u]$.
  - Edge $(u, v)$ is a bridge if $\text{low}[v] > \text{disc}[u]$.
- **Time Complexity:** $O(|V_A| + |E_A|)$.
- **Significance:** Satellites identified as cut vertices represent critical relay hubs requiring redundant physical links.

---

## 3. Resilience Metrics Formulation

SatNexus quantitatively characterizes network health through six deterministic formulas:

### 3.1 Node Availability ($A_{\text{node}}$)
$$A_{\text{node}} = \frac{|V_A|}{|V|} \times 100\% = \frac{|V| - |V_F|}{|V|} \times 100\%$$
- Edge Case: If $|V| = 0$, $A_{\text{node}} = 0\%$.

### 3.2 Link Availability ($A_{\text{link}}$)
$$A_{\text{link}} = \frac{|E_A|}{|E|} \times 100\%$$
- Edge Case: If $|E| = 0$, $A_{\text{link}} = 0\%$.

### 3.3 Largest Connected Component Ratio ($\rho_{\text{LCC}}$)
Measures constellation cohesion despite partitions:
$$\rho_{\text{LCC}} = \frac{|C_{\max}|}{|V|} \times 100\%$$

### 3.4 Pairwise Reachability Ratio ($R_{\text{reach}}$)
Fraction of operational satellite pairs that can successfully communicate:
$$R_{\text{reach}} = \frac{\sum_{u, v \in V_A, u \neq v} \mathbb{I}(\text{path exists between } u \text{ and } v)}{|V_A|(|V_A| - 1)}$$
Where $\mathbb{I}(\cdot)$ is the indicator function. If $|V_A| \le 1$, $R_{\text{reach}} = 100\%$.

### 3.5 Latency Degradation ($\Delta L$)
Percentage latency penalty incurred by switching from original primary route $P_{\text{orig}}$ to recovered alternative route $P_{\text{rec}}$:
$$\Delta L = \left( \frac{L(P_{\text{rec}}) - L(P_{\text{orig}})}{L(P_{\text{orig}})} \right) \times 100\%$$

### 3.6 Algorithmic Recovery Computation Time ($t_{\text{rec}}$)
High-precision monotonic clock time ($\mu\text{s} / \text{ms}$) measured during the execution of Dijkstra rerouting:
$$t_{\text{rec}} = (t_{\text{end}} - t_{\text{start}})$$
*Note: This strictly measures algorithmic computational time on the server, distinguished from physical satellite signal propagation time.*
