import type { Problem, Difficulty } from '../lib/types';
// Row: Title|slug|E/M/H|pattern. All verified:false (written from memory) -> run `npm run check-links`.
const D: Record<string, Difficulty> = { E: 'Easy', M: 'Medium', H: 'Hard' };
const c = (topicId: string, rows: string): Problem[] => rows.trim().split('\n').map(r => { const [title, slug, d, pattern] = r.split('|');
  return { id: `${topicId}:${slug}`, title, slug, difficulty: D[d], topicId, pattern, objective: `Practice the ${pattern} pattern.`, core: true, verified: false }; });
export const more2: Problem[] = [
...c('complexity', `Majority Element|majority-element|E|Brute vs optimal
Intersection of Two Arrays|intersection-of-two-arrays|E|Set vs sort
Valid Perfect Square|valid-perfect-square|E|Linear vs log
Find Peak Element|find-peak-element|M|Linear vs log
Search a 2D Matrix|search-a-2d-matrix|M|Flatten + binary search
Single Element in a Sorted Array|single-element-in-a-sorted-array|M|XOR vs log
Find K-th Smallest Pair Distance|find-k-th-smallest-pair-distance|H|Search on answer
Max Sum of Rectangle No Larger Than K|max-sum-of-rectangle-no-larger-than-k|H|Reduce dimensions`),
...c('queues-deques', `Implement Queue using Stacks|implement-queue-using-stacks|E|Two stacks
Implement Stack using Queues|implement-stack-using-queues|E|Queue rotation
Number of Recent Calls|number-of-recent-calls|E|Queue window
Design Circular Queue|design-circular-queue|M|Ring buffer
Design Circular Deque|design-circular-deque|M|Ring buffer
Dota2 Senate|dota2-senate|M|Two queues
Constrained Subsequence Sum|constrained-subsequence-sum|H|DP + deque
Maximum Number of Robots Within Budget|maximum-number-of-robots-within-budget|H|Window + deque`),
...c('intervals', `Summary Ranges|summary-ranges|E|Run grouping
Teemo Attacking|teemo-attacking|E|Overlap sum
Merge Intervals|merge-intervals|M|Sort + merge
Insert Interval|insert-interval|M|Linear merge
Non-overlapping Intervals|non-overlapping-intervals|M|Greedy by end
Interval List Intersections|interval-list-intersections|M|Two pointers
The Skyline Problem|the-skyline-problem|H|Sweep + heap
Meeting Rooms III|meeting-rooms-iii|H|Heap simulation
Data Stream as Disjoint Intervals|data-stream-as-disjoint-intervals|H|Ordered map`),
...c('greedy', `Assign Cookies|assign-cookies|E|Sort + match
Lemonade Change|lemonade-change|E|Greedy change
Best Time to Buy and Sell Stock II|best-time-to-buy-and-sell-stock-ii|E|Sum of gains
Jump Game|jump-game|M|Farthest reach
Jump Game II|jump-game-ii|M|BFS-like greedy
Gas Station|gas-station|M|Running surplus
Partition Labels|partition-labels|M|Last occurrence
Minimum Number of Refueling Stops|minimum-number-of-refueling-stops|H|Heap greedy
Course Schedule III|course-schedule-iii|H|Heap greedy
Create Maximum Number|create-maximum-number|H|Greedy + merge`),
...c('monotonic', `Next Greater Element I|next-greater-element-i|E|Monotonic stack
Final Prices With a Special Discount in a Shop|final-prices-with-a-special-discount-in-a-shop|E|Monotonic stack
Make The String Great|make-the-string-great|E|Stack
Daily Temperatures|daily-temperatures|M|Next greater
Next Greater Element II|next-greater-element-ii|M|Circular stack
Online Stock Span|online-stock-span|M|Stack with counts
Remove K Digits|remove-k-digits|M|Increasing stack
Sum of Subarray Minimums|sum-of-subarray-minimums|M|Contribution counting
Largest Rectangle in Histogram|largest-rectangle-in-histogram|H|Boundaries via stack
Number of Visible People in a Queue|number-of-visible-people-in-a-queue|H|Decreasing stack`),
...c('heaps', `Last Stone Weight|last-stone-weight|E|Max-heap
Kth Largest Element in a Stream|kth-largest-element-in-a-stream|E|Size-k min-heap
Take Gifts From the Richest Pile|take-gifts-from-the-richest-pile|E|Max-heap
K Closest Points to Origin|k-closest-points-to-origin|M|Top-k
Task Scheduler|task-scheduler|M|Heap / counting
Reorganize String|reorganize-string|M|Heap greedy
Kth Smallest Element in a Sorted Matrix|kth-smallest-element-in-a-sorted-matrix|M|k-way merge
Find Median from Data Stream|find-median-from-data-stream|H|Two heaps
IPO|ipo|H|Two heaps greedy
Smallest Range Covering Elements from K Lists|smallest-range-covering-elements-from-k-lists|H|k-way merge`),
...c('backtracking', `Binary Watch|binary-watch|E|Enumerate bits
Letter Combinations of a Phone Number|letter-combinations-of-a-phone-number|M|Build choices
Palindrome Partitioning|palindrome-partitioning|M|Partition + check
Word Search|word-search|M|Grid DFS + undo
Restore IP Addresses|restore-ip-addresses|M|Segmented choices
N-Queens|n-queens|H|Constraint sets
Sudoku Solver|sudoku-solver|H|Constraint backtracking
Word Search II|word-search-ii|H|Trie + DFS`),
...c('subsets-combinations', `Subsets|subsets|M|Include/exclude
Subsets II|subsets-ii|M|Skip duplicates
Combinations|combinations|M|Fixed-size choose
Combination Sum|combination-sum|M|Reuse items
Combination Sum II|combination-sum-ii|M|Sort + skip dupes
Combination Sum III|combination-sum-iii|M|Bounded choose
Stickers to Spell Word|stickers-to-spell-word|H|Memo + bitmask
Number of Squareful Arrays|number-of-squareful-arrays|H|Backtracking + dedupe`),
...c('permutations', `Permutations|permutations|M|Used array
Permutations II|permutations-ii|M|Sort + skip dupes
Next Permutation|next-permutation|M|In-place next order
Letter Case Permutation|letter-case-permutation|M|Branch on letters
Permutation Sequence|permutation-sequence|H|Factorial number system`),
...c('divide-conquer', `Search a 2D Matrix II|search-a-2d-matrix-ii|M|Staircase search
Convert Sorted List to Binary Search Tree|convert-sorted-list-to-binary-search-tree|M|Split at middle
Beautiful Array|beautiful-array|M|Recursive construction
Construct Quad Tree|construct-quad-tree|M|Recursive split
Longest Substring with At Least K Repeating Characters|longest-substring-with-at-least-k-repeating-characters|M|Split on rare chars
Kth Smallest Product of Two Sorted Arrays|kth-smallest-product-of-two-sorted-arrays|H|Binary search on value`),
...c('binary-trees', `Invert Binary Tree|invert-binary-tree|E|Recursive swap
Maximum Depth of Binary Tree|maximum-depth-of-binary-tree|E|DFS height
Diameter of Binary Tree|diameter-of-binary-tree|E|Height + best path
Binary Tree Level Order Traversal|binary-tree-level-order-traversal|M|BFS levels
Binary Tree Right Side View|binary-tree-right-side-view|M|BFS last per level
Lowest Common Ancestor of a Binary Tree|lowest-common-ancestor-of-a-binary-tree|M|Post-order
Binary Tree Maximum Path Sum|binary-tree-maximum-path-sum|H|Gain from children
Serialize and Deserialize Binary Tree|serialize-and-deserialize-binary-tree|H|Preorder encoding
Binary Tree Cameras|binary-tree-cameras|H|Tree states`),
...c('bst', `Convert Sorted Array to Binary Search Tree|convert-sorted-array-to-binary-search-tree|E|Middle as root
Search in a Binary Search Tree|search-in-a-binary-search-tree|E|BST descent
Minimum Absolute Difference in BST|minimum-absolute-difference-in-bst|E|Inorder
Validate Binary Search Tree|validate-binary-search-tree|M|Bounds
Kth Smallest Element in a BST|kth-smallest-element-in-a-bst|M|Inorder
Delete Node in a BST|delete-node-in-a-bst|M|Successor swap
Recover Binary Search Tree|recover-binary-search-tree|M|Inorder anomalies
Maximum Sum BST in Binary Tree|maximum-sum-bst-in-binary-tree|H|Post-order info`),
...c('tries', `Implement Trie (Prefix Tree)|implement-trie-prefix-tree|M|Trie nodes
Design Add and Search Words Data Structure|design-add-and-search-words-data-structure|M|Trie + wildcard DFS
Replace Words|replace-words|M|Shortest prefix
Map Sum Pairs|map-sum-pairs|M|Trie with sums
Palindrome Pairs|palindrome-pairs|H|Trie / hash
Concatenated Words|concatenated-words|H|Trie + DP`),
...c('tree-advanced', `Subtree of Another Tree|subtree-of-another-tree|E|Tree matching
Path Sum|path-sum|E|Root-to-leaf DFS
Merge Two Binary Trees|merge-two-binary-trees|E|Parallel DFS
Construct Binary Tree from Preorder and Inorder Traversal|construct-binary-tree-from-preorder-and-inorder-traversal|M|Index map
Flatten Binary Tree to Linked List|flatten-binary-tree-to-linked-list|M|Reverse preorder
Populating Next Right Pointers in Each Node|populating-next-right-pointers-in-each-node|M|Level links
Vertical Order Traversal of a Binary Tree|vertical-order-traversal-of-a-binary-tree|H|Coordinates + sort
Sum of Distances in Tree|sum-of-distances-in-tree|H|Rerooting`),
...c('graph-basics', `Find if Path Exists in Graph|find-if-path-exists-in-graph|E|DFS/BFS
Find the Town Judge|find-the-town-judge|E|Degree counting
Flood Fill|flood-fill|E|Grid DFS
Clone Graph|clone-graph|M|Map + DFS
Number of Islands|number-of-islands|M|Grid components
Is Graph Bipartite?|is-graph-bipartite|M|Two-coloring
Word Ladder II|word-ladder-ii|H|BFS + backtrack
Shortest Path Visiting All Nodes|shortest-path-visiting-all-nodes|H|BFS + bitmask
Cut Off Trees for Golf Event|cut-off-trees-for-golf-event|H|Repeated BFS`),
...c('graph-apps', `Island Perimeter|island-perimeter|E|Grid scan
Employee Importance|employee-importance|E|Graph DFS
Find Center of Star Graph|find-center-of-star-graph|E|Degree check
Max Area of Island|max-area-of-island|M|Grid DFS
Rotting Oranges|rotting-oranges|M|Multi-source BFS
Word Ladder|word-ladder|M|BFS on words
Making A Large Island|making-a-large-island|H|Component labeling
Swim in Rising Water|swim-in-rising-water|H|Heap / binary search
Bus Routes|bus-routes|H|BFS on routes`),
...c('topo-sort', `Course Schedule|course-schedule|M|Cycle detection
Course Schedule II|course-schedule-ii|M|Kahn's algorithm
Find Eventual Safe States|find-eventual-safe-states|M|Reverse graph
Minimum Height Trees|minimum-height-trees|M|Leaf peeling
Parallel Courses III|parallel-courses-iii|H|Topo + DP
Build a Matrix With Conditions|build-a-matrix-with-conditions|H|Two topo sorts
Largest Color Value in a Directed Graph|largest-color-value-in-a-directed-graph|H|Topo + DP`),
...c('union-find-mst', `Number of Provinces|number-of-provinces|M|Union-find
Redundant Connection|redundant-connection|M|Cycle via union
Accounts Merge|accounts-merge|M|Union by email
Min Cost to Connect All Points|min-cost-to-connect-all-points|M|MST (Prim/Kruskal)
Checking Existence of Edge Length Limited Paths|checking-existence-of-edge-length-limited-paths|H|Offline union-find
Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree|find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree|H|MST variations
Remove Max Number of Edges to Keep Graph Fully Traversable|remove-max-number-of-edges-to-keep-graph-fully-traversable|H|Two union-finds`),
...c('shortest-path', `Network Delay Time|network-delay-time|M|Dijkstra
Cheapest Flights Within K Stops|cheapest-flights-within-k-stops|M|Bellman-Ford / BFS
Path With Minimum Effort|path-with-minimum-effort|M|Dijkstra on grid
Path with Maximum Probability|path-with-maximum-probability|M|Dijkstra variant
Find the City With the Smallest Number of Neighbors at a Threshold Distance|find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance|M|Floyd-Warshall
Minimum Cost to Make at Least One Valid Path in a Grid|minimum-cost-to-make-at-least-one-valid-path-in-a-grid|H|0-1 BFS
Shortest Path in a Grid with Obstacles Elimination|shortest-path-in-a-grid-with-obstacles-elimination|H|BFS with state
Reachable Nodes In Subdivided Graph|reachable-nodes-in-subdivided-graph|H|Dijkstra`),
...c('dp-fundamentals', `Climbing Stairs|climbing-stairs|E|Fibonacci DP
Min Cost Climbing Stairs|min-cost-climbing-stairs|E|Min over two
N-th Tribonacci Number|n-th-tribonacci-number|E|Rolling variables
House Robber|house-robber|M|Take or skip
Decode Ways|decode-ways|M|Count by prefix
Integer Break|integer-break|M|Max product DP
Count Vowels Permutation|count-vowels-permutation|H|State transitions
Student Attendance Record II|student-attendance-record-ii|H|State machine DP`),
...c('dp-1d', `Is Subsequence|is-subsequence|E|Two pointers / DP
Divisor Game|divisor-game|E|Game DP
House Robber II|house-robber-ii|M|Circular split
Word Break|word-break|M|Prefix DP
Maximum Product Subarray|maximum-product-subarray|M|Track min and max
Coin Change|coin-change|M|Unbounded min
Longest Increasing Subsequence|longest-increasing-subsequence|M|DP / patience
Maximum Profit in Job Scheduling|maximum-profit-in-job-scheduling|H|Sort + binary search
Russian Doll Envelopes|russian-doll-envelopes|H|LIS variant
Frog Jump|frog-jump|H|State = position + jump`),
...c('dp-grid', `Pascal's Triangle|pascals-triangle|E|Row recurrence
Pascal's Triangle II|pascals-triangle-ii|E|Rolling row
Unique Paths|unique-paths|M|Grid paths
Unique Paths II|unique-paths-ii|M|Obstacles
Minimum Path Sum|minimum-path-sum|M|Grid min path
Triangle|triangle|M|Bottom-up
Maximal Square|maximal-square|M|Min of neighbors
Dungeon Game|dungeon-game|H|Backward DP
Cherry Pickup|cherry-pickup|H|Two walkers
Longest Increasing Path in a Matrix|longest-increasing-path-in-a-matrix|H|DFS + memo`),
...c('dp-knapsack', `Partition Equal Subset Sum|partition-equal-subset-sum|M|0/1 knapsack
Target Sum|target-sum|M|Subset sum count
Coin Change II|coin-change-ii|M|Unbounded count
Longest Common Subsequence|longest-common-subsequence|M|2D string DP
Edit Distance|edit-distance|M|2D string DP
Regular Expression Matching|regular-expression-matching|H|2D pattern DP
Wildcard Matching|wildcard-matching|H|2D pattern DP
Distinct Subsequences|distinct-subsequences|H|Subsequence counting`),
...c('dp-advanced', `Longest Palindromic Substring|longest-palindromic-substring|M|Expand / interval
Palindromic Substrings|palindromic-substrings|M|Expand around center
House Robber III|house-robber-iii|M|Tree DP
Best Time to Buy and Sell Stock with Cooldown|best-time-to-buy-and-sell-stock-with-cooldown|M|State machine
Burst Balloons|burst-balloons|H|Interval DP
Strange Printer|strange-printer|H|Interval DP
Number of Ways to Wear Different Hats to Each Other|number-of-ways-to-wear-different-hats-to-each-other|H|Bitmask DP`),
...c('range-queries', `Range Sum Query - Mutable|range-sum-query-mutable|M|Fenwick / segment tree
My Calendar I|my-calendar-i|M|Interval structure
My Calendar II|my-calendar-ii|M|Overlap counting
Count Integers in Intervals|count-integers-in-intervals|H|Dynamic segment tree
Falling Squares|falling-squares|H|Range max update
Range Module|range-module|H|Interval tracking`),
...c('graph-advanced', `Evaluate Division|evaluate-division|M|Weighted graph
Possible Bipartition|possible-bipartition|M|Two-coloring
Number of Operations to Make Network Connected|number-of-operations-to-make-network-connected|M|Components
Critical Connections in a Network|critical-connections-in-a-network|H|Tarjan bridges
Reconstruct Itinerary|reconstruct-itinerary|H|Eulerian path
Minimum Number of Days to Disconnect Island|minimum-number-of-days-to-disconnect-island|H|Articulation points`),
];
