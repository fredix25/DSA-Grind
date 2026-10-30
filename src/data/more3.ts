import type { Problem, Difficulty } from '../lib/types';
// Row: Title|slug|E/M/H|pattern. All verified:false (from memory) -> `npm run check-links`.
const D: Record<string, Difficulty> = { E: 'Easy', M: 'Medium', H: 'Hard' };
const mk = (topicId: string, core: boolean, rows: string): Problem[] => rows.trim().split('\n').map(r => { const [title, slug, d, pattern] = r.split('|');
  return { id: `${topicId}:${slug}`, title, slug, difficulty: D[d], topicId, pattern, objective: `Practice the ${pattern} pattern.`, core, verified: false }; });
const c = (t: string, r: string) => mk(t, true, r), s = (t: string, r: string) => mk(t, false, r);
export const more3: Problem[] = [
...c('kmp-z', `Find the Index of the First Occurrence in a String|find-the-index-of-the-first-occurrence-in-a-string|E|KMP
Repeated Substring Pattern|repeated-substring-pattern|E|Prefix function
Rotate String|rotate-string|E|Doubling trick
Repeated String Match|repeated-string-match|M|Repeat + search
Sum of Scores of Built Strings|sum-of-scores-of-built-strings|H|Z-function`),
...c('kadane', `Longest Continuous Increasing Subsequence|longest-continuous-increasing-subsequence|E|Running run length
Max Consecutive Ones|max-consecutive-ones|E|Running count
Maximum Ascending Subarray Sum|maximum-ascending-subarray-sum|E|Running sum
Maximum Sum Circular Subarray|maximum-sum-circular-subarray|M|Kadane + total minus min
Best Sightseeing Pair|best-sightseeing-pair|M|Running best
Maximum Subarray Sum with One Deletion|maximum-subarray-sum-with-one-deletion|M|Kadane with state
Longest Turbulent Subarray|longest-turbulent-subarray|M|Alternating run
Maximum Absolute Sum of Any Subarray|maximum-absolute-sum-of-any-subarray|M|Kadane max and min`),
...c('bs-answer', `Arranging Coins|arranging-coins|E|Search on count
Guess Number Higher or Lower|guess-number-higher-or-lower|E|Classic search
Capacity To Ship Packages Within D Days|capacity-to-ship-packages-within-d-days|M|Feasibility check
Minimum Number of Days to Make m Bouquets|minimum-number-of-days-to-make-m-bouquets|M|Feasibility check
Find the Smallest Divisor Given a Threshold|find-the-smallest-divisor-given-a-threshold|M|Feasibility check
Magnetic Force Between Two Balls|magnetic-force-between-two-balls|M|Maximize the minimum
Maximum Running Time of N Computers|maximum-running-time-of-n-computers|H|Feasibility check
Kth Smallest Number in Multiplication Table|kth-smallest-number-in-multiplication-table|H|Count <= mid
Nth Magical Number|nth-magical-number|H|Inclusion-exclusion count`),
...c('design-cache', `Design HashMap|design-hashmap|E|Buckets
Design HashSet|design-hashset|E|Buckets
LRU Cache|lru-cache|M|Hash + doubly linked list
Insert Delete GetRandom O(1)|insert-delete-getrandom-o1|M|Array + map
Time Based Key-Value Store|time-based-key-value-store|M|Map + binary search
Design Browser History|design-browser-history|M|Stack / array
All O'one Data Structure|all-oone-data-structure|H|Bucket list
Design Skiplist|design-skiplist|H|Skip list`),
...c('bitmask-dp', `Partition to K Equal Sum Subsets|partition-to-k-equal-sum-subsets|M|Bitmask memo
Beautiful Arrangement|beautiful-arrangement|M|Bitmask memo
Can I Win|can-i-win|M|Bitmask game
Fair Distribution of Cookies|fair-distribution-of-cookies|M|Backtrack / bitmask
Find the Shortest Superstring|find-the-shortest-superstring|H|TSP-style DP
Maximum Students Taking Exam|maximum-students-taking-exam|H|Row masks
Minimum XOR Sum of Two Arrays|minimum-xor-sum-of-two-arrays|H|Assignment DP`),
...c('digit-dp', `Count Numbers with Unique Digits|count-numbers-with-unique-digits|M|Counting by length
Numbers At Most N Given Digit Set|numbers-at-most-n-given-digit-set|H|Digit counting
Non-negative Integers without Consecutive Ones|non-negative-integers-without-consecutive-ones|H|Digit DP
Numbers With Repeated Digits|numbers-with-repeated-digits|H|Complement counting
Count Special Integers|count-special-integers|H|Digit DP + mask`),
...c('lca', `Lowest Common Ancestor of a Binary Search Tree|lowest-common-ancestor-of-a-binary-search-tree|M|BST descent
Lowest Common Ancestor of Deepest Leaves|lowest-common-ancestor-of-deepest-leaves|M|Depth + LCA
Smallest Subtree with all the Deepest Nodes|smallest-subtree-with-all-the-deepest-nodes|M|Depth + LCA
Maximum Difference Between Node and Ancestor|maximum-difference-between-node-and-ancestor|M|Carry min/max
Step-By-Step Directions From a Binary Tree Node to Another|step-by-step-directions-from-a-binary-tree-node-to-another|M|LCA path
Kth Ancestor of a Tree Node|kth-ancestor-of-a-tree-node|H|Binary lifting`),
...c('scc-bridges', `Minimum Number of Vertices to Reach All Nodes|minimum-number-of-vertices-to-reach-all-nodes|M|In-degree zero
Maximum Employees to Be Invited to a Meeting|maximum-employees-to-be-invited-to-a-meeting|H|Functional graph cycles
Minimum Edge Reversals So Every Node Is Reachable|minimum-edge-reversals-so-every-node-is-reachable|H|Rerooting`),
// Side quests for existing topics
...s('arrays', `Rotate Array|rotate-array|M|Reverse thrice
Find All Numbers Disappeared in an Array|find-all-numbers-disappeared-in-an-array|E|Index marking
Rotate Image|rotate-image|M|Transpose + reverse
Spiral Matrix|spiral-matrix|M|Boundary walk
Find All Duplicates in an Array|find-all-duplicates-in-an-array|M|Index marking
Game of Life|game-of-life|M|In-place state encoding`),
...s('strings', `Isomorphic Strings|isomorphic-strings|E|Two maps
Add Binary|add-binary|E|Carry
Roman to Integer|roman-to-integer|E|Right-to-left scan
Count and Say|count-and-say|M|Run-length
Compare Version Numbers|compare-version-numbers|M|Split + compare`),
...s('hashing', `Ransom Note|ransom-note|E|Frequency count
Word Pattern|word-pattern|E|Bijection maps
4Sum II|4sum-ii|M|Pair sums
Encode and Decode TinyURL|encode-and-decode-tinyurl|M|Map design
Brick Wall|brick-wall|M|Edge counts`),
...s('two-pointers', `Valid Palindrome II|valid-palindrome-ii|E|One skip
Remove Element|remove-element|E|Write pointer
3Sum Closest|3sum-closest|M|Sort + two pointers
4Sum|4sum|M|Nested two pointers
Boats to Save People|boats-to-save-people|M|Sort + pair ends
Remove Duplicates from Sorted Array II|remove-duplicates-from-sorted-array-ii|M|Write pointer`),
...s('binary-search', `First Bad Version|first-bad-version|E|Boundary search
Find Minimum in Rotated Sorted Array|find-minimum-in-rotated-sorted-array|M|Rotated search
Search in Rotated Sorted Array II|search-in-rotated-sorted-array-ii|M|Rotated + duplicates
Find K Closest Elements|find-k-closest-elements|M|Window start search`),
...s('queues-deques', `Time Needed to Buy Tickets|time-needed-to-buy-tickets|E|Queue simulation
Number of Students Unable to Eat Lunch|number-of-students-unable-to-eat-lunch|E|Queue + stack
Reveal Cards In Increasing Order|reveal-cards-in-increasing-order|M|Deque simulation
Design Front Middle Back Queue|design-front-middle-back-queue|M|Two deques`),
...s('intervals', `Minimum Number of Arrows to Burst Balloons|minimum-number-of-arrows-to-burst-balloons|M|Greedy by end
Car Pooling|car-pooling|M|Difference array
Remove Covered Intervals|remove-covered-intervals|M|Sort + sweep
My Calendar III|my-calendar-iii|H|Sweep / segment tree`),
...s('greedy', `Queue Reconstruction by Height|queue-reconstruction-by-height|M|Sort + insert
Two City Scheduling|two-city-scheduling|M|Sort by difference
Minimum Add to Make Parentheses Valid|minimum-add-to-make-parentheses-valid|M|Balance counter
Maximum Units on a Truck|maximum-units-on-a-truck|E|Sort by value
Hand of Straights|hand-of-straights|M|Greedy groups`),
...s('monotonic', `Car Fleet|car-fleet|M|Sort + stack
132 Pattern|132-pattern|M|Stack from right
Maximum Width Ramp|maximum-width-ramp|M|Decreasing stack
Remove Duplicate Letters|remove-duplicate-letters|M|Stack + last index`),
...s('heaps', `Find K Pairs with Smallest Sums|find-k-pairs-with-smallest-sums|M|k-way merge
Furthest Building You Can Reach|furthest-building-you-can-reach|M|Min-heap of climbs
Seat Reservation Manager|seat-reservation-manager|M|Min-heap
K-th Smallest Prime Fraction|k-th-smallest-prime-fraction|M|Heap / binary search`),
...s('backtracking', `Matchsticks to Square|matchsticks-to-square|M|Bucket backtracking
Splitting a String Into Descending Consecutive Values|splitting-a-string-into-descending-consecutive-values|M|Prefix backtracking
Unique Paths III|unique-paths-iii|H|Grid backtracking
The k-th Lexicographical String of All Happy Strings of Length n|the-k-th-lexicographical-string-of-all-happy-strings-of-length-n|M|Ordered generation`),
...s('subsets-combinations', `Maximum Length of a Concatenated String with Unique Characters|maximum-length-of-a-concatenated-string-with-unique-characters|M|Bitmask subsets
Increasing Subsequences|increasing-subsequences|M|Dedup per level`),
...s('permutations', `Next Greater Element III|next-greater-element-iii|M|Next permutation
Previous Permutation With One Swap|previous-permutation-with-one-swap|M|Swap from right`),
...s('divide-conquer', `Unique Binary Search Trees II|unique-binary-search-trees-ii|M|Recursive root choice`),
...s('binary-trees', `Same Tree|same-tree|E|Parallel DFS
Symmetric Tree|symmetric-tree|E|Mirror recursion
Binary Tree Inorder Traversal|binary-tree-inorder-traversal|E|Iterative inorder
Balanced Binary Tree|balanced-binary-tree|E|Height with early exit
Binary Tree Zigzag Level Order Traversal|binary-tree-zigzag-level-order-traversal|M|BFS + direction
Count Good Nodes in Binary Tree|count-good-nodes-in-binary-tree|M|Carry max`),
...s('bst', `Range Sum of BST|range-sum-of-bst|E|Pruned DFS
Two Sum IV - Input is a BST|two-sum-iv-input-is-a-bst|E|Inorder + two pointers
Insert into a Binary Search Tree|insert-into-a-binary-search-tree|M|Descent
Trim a Binary Search Tree|trim-a-binary-search-tree|M|Recursive prune
Binary Search Tree Iterator|binary-search-tree-iterator|M|Stack inorder`),
...s('tries', `Longest Word in Dictionary|longest-word-in-dictionary|M|Trie / sort
Search Suggestions System|search-suggestions-system|M|Trie / binary search`),
...s('tree-advanced', `Path Sum II|path-sum-ii|M|Backtracking DFS
Path Sum III|path-sum-iii|M|Prefix sums on tree
Sum Root to Leaf Numbers|sum-root-to-leaf-numbers|M|Carry value`),
...s('graph-basics', `Keys and Rooms|keys-and-rooms|M|DFS reachability
All Paths From Source to Target|all-paths-from-source-to-target|M|DFS paths
Open the Lock|open-the-lock|M|BFS states
01 Matrix|01-matrix|M|Multi-source BFS`),
...s('graph-apps', `Pacific Atlantic Water Flow|pacific-atlantic-water-flow|M|Reverse flood
Surrounded Regions|surrounded-regions|M|Border flood
Number of Closed Islands|number-of-closed-islands|M|Border flood
Shortest Path in Binary Matrix|shortest-path-in-binary-matrix|M|8-direction BFS`),
...s('topo-sort', `Course Schedule IV|course-schedule-iv|M|Transitive closure
All Ancestors of a Node in a Directed Acyclic Graph|all-ancestors-of-a-node-in-a-directed-acyclic-graph|M|Topo + sets
Find All Possible Recipes from Given Supplies|find-all-possible-recipes-from-given-supplies|M|Kahn's algorithm
Sort Items by Groups Respecting Dependencies|sort-items-by-groups-respecting-dependencies|H|Two-level topo sort`),
...s('union-find-mst', `Most Stones Removed with Same Row or Column|most-stones-removed-with-same-row-or-column|M|Union rows/cols
Satisfiability of Equality Equations|satisfiability-of-equality-equations|M|Union then check
Smallest String With Swaps|smallest-string-with-swaps|M|Components + sort
Regions Cut By Slashes|regions-cut-by-slashes|M|Union on grid points`),
...s('shortest-path', `Number of Ways to Arrive at Destination|number-of-ways-to-arrive-at-destination|M|Dijkstra + counting
Minimum Cost to Reach Destination in Time|minimum-cost-to-reach-destination-in-time|H|DP over time`),
...s('dp-fundamentals', `Perfect Squares|perfect-squares|M|Unbounded min
Domino and Tromino Tiling|domino-and-tromino-tiling|M|Linear recurrence
Knight Dialer|knight-dialer|M|State transitions`),
...s('dp-1d', `Delete and Earn|delete-and-earn|M|House robber variant
Arithmetic Slices|arithmetic-slices|M|Run extension
Longest String Chain|longest-string-chain|M|Sorted LIS-like
Number of Longest Increasing Subsequence|number-of-longest-increasing-subsequence|M|LIS + counts
Maximum Length of Repeated Subarray|maximum-length-of-repeated-subarray|M|2D suffix DP`),
...s('dp-grid', `Minimum Falling Path Sum|minimum-falling-path-sum|M|Row DP
Count Square Submatrices with All Ones|count-square-submatrices-with-all-ones|M|Min of neighbors
Out of Boundary Paths|out-of-boundary-paths|M|Moves DP
Cherry Pickup II|cherry-pickup-ii|H|Two-robot DP`),
...s('dp-knapsack', `Last Stone Weight II|last-stone-weight-ii|M|Subset sum
Ones and Zeroes|ones-and-zeroes|M|2D knapsack
Shortest Common Supersequence|shortest-common-supersequence|H|LCS reconstruction
Longest Palindromic Subsequence|longest-palindromic-subsequence|M|LCS with reverse
Interleaving String|interleaving-string|M|2D DP
Combination Sum IV|combination-sum-iv|M|Ordered counts`),
...s('dp-advanced', `Minimum Cost to Merge Stones|minimum-cost-to-merge-stones|H|Interval DP
Palindrome Partitioning II|palindrome-partitioning-ii|H|Cut DP
Best Time to Buy and Sell Stock III|best-time-to-buy-and-sell-stock-iii|H|State machine
Best Time to Buy and Sell Stock IV|best-time-to-buy-and-sell-stock-iv|H|State machine
Unique Binary Search Trees|unique-binary-search-trees|M|Catalan DP`),
...s('range-queries', `Online Majority Element In Subarray|online-majority-element-in-subarray|H|Segment tree / random`),
...s('graph-advanced', `Shortest Bridge|shortest-bridge|M|DFS + BFS
Redundant Connection II|redundant-connection-ii|H|Union-find on digraph`),
];
