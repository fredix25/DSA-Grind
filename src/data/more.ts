import type { Problem, Difficulty } from '../lib/types';
// Row format: Title|slug|E/M/H|pattern. verified:false -- written from memory; run `npm run check-links`.
const D: Record<string, Difficulty> = { E: 'Easy', M: 'Medium', H: 'Hard' };
const mk = (topicId: string, core: boolean, rows: string): Problem[] => rows.trim().split('\n').map(r => {
  const [title, slug, d, pattern] = r.split('|');
  return { id: `${topicId}:${slug}`, title, slug, difficulty: D[d], topicId, pattern, objective: `Practice the ${pattern} pattern.`, core, verified: false };
});
const c = (t: string, rows: string) => mk(t, true, rows), s = (t: string, rows: string) => mk(t, false, rows);
export const more: Problem[] = [
  ...c('basic-math', `Palindrome Number|palindrome-number|E|Digit reversal
Fizz Buzz|fizz-buzz|E|Simulation
Plus One|plus-one|E|Carry handling
Count Primes|count-primes|M|Sieve
Reverse Integer|reverse-integer|M|Overflow-safe digits
Multiply Strings|multiply-strings|M|Digit arithmetic
Number of Digit One|number-of-digit-one|H|Digit counting
Integer to English Words|integer-to-english-words|H|Chunked conversion
Basic Calculator|basic-calculator|H|Sign tracking`),
  ...s('basic-math', `Add Digits|add-digits|E|Digit root
Excel Sheet Column Number|excel-sheet-column-number|E|Base conversion
Ugly Number|ugly-number|E|Divisibility
Integer to Roman|integer-to-roman|M|Greedy mapping`),
  ...c('bit-manipulation', `Single Number|single-number|E|XOR
Number of 1 Bits|number-of-1-bits|E|Bit counting
Missing Number|missing-number|E|XOR / sum
Single Number II|single-number-ii|M|Bit counting per position
Sum of Two Integers|sum-of-two-integers|M|Carry via XOR/AND
Maximum XOR of Two Numbers in an Array|maximum-xor-of-two-numbers-in-an-array|M|Bit trie
Minimum One Bit Operations to Make Integers Zero|minimum-one-bit-operations-to-make-integers-zero|H|Gray code
Maximum XOR With an Element From Array|maximum-xor-with-an-element-from-array|H|Offline bit trie
Smallest Sufficient Team|smallest-sufficient-team|H|Bitmask DP`),
  ...s('bit-manipulation', `Power of Two|power-of-two|E|n & (n-1)
Reverse Bits|reverse-bits|E|Bit shifting
Counting Bits|counting-bits|E|DP on bits
Bitwise AND of Numbers Range|bitwise-and-of-numbers-range|M|Common prefix`),
  ...c('sliding-window', `Maximum Average Subarray I|maximum-average-subarray-i|E|Fixed window
Contains Duplicate II|contains-duplicate-ii|E|Window + set
Minimum Difference Between Highest and Lowest of K Scores|minimum-difference-between-highest-and-lowest-of-k-scores|E|Sort + fixed window
Longest Substring Without Repeating Characters|longest-substring-without-repeating-characters|M|Variable window
Longest Repeating Character Replacement|longest-repeating-character-replacement|M|Window + max frequency
Permutation in String|permutation-in-string|M|Fixed window counts
Minimum Window Substring|minimum-window-substring|H|Variable window + need counts
Sliding Window Maximum|sliding-window-maximum|H|Monotonic deque
Subarrays with K Different Integers|subarrays-with-k-different-integers|H|At most K minus at most K-1`),
  ...s('sliding-window', `Minimum Size Subarray Sum|minimum-size-subarray-sum|M|Shrinkable window
Fruit Into Baskets|fruit-into-baskets|M|At most 2 distinct
Max Consecutive Ones III|max-consecutive-ones-iii|M|Window with k flips
Find All Anagrams in a String|find-all-anagrams-in-a-string|M|Fixed window counts
Maximum Points You Can Obtain from Cards|maximum-points-you-can-obtain-from-cards|M|Complement window`),
  ...c('prefix-sums', `Running Sum of 1d Array|running-sum-of-1d-array|E|Prefix array
Find Pivot Index|find-pivot-index|E|Total minus prefix
Range Sum Query - Immutable|range-sum-query-immutable|E|Prefix lookup
Subarray Sum Equals K|subarray-sum-equals-k|M|Prefix + hash map
Contiguous Array|contiguous-array|M|Balance prefix
Continuous Subarray Sum|continuous-subarray-sum|M|Prefix modulo
Maximum Sum of 3 Non-Overlapping Subarrays|maximum-sum-of-3-non-overlapping-subarrays|H|Prefix + DP
Count of Range Sum|count-of-range-sum|H|Prefix + merge sort
Shortest Subarray with Sum at Least K|shortest-subarray-with-sum-at-least-k|H|Prefix + monotonic deque`),
  ...s('prefix-sums', `Range Sum Query 2D - Immutable|range-sum-query-2d-immutable|M|2D prefix
Subarray Sums Divisible by K|subarray-sums-divisible-by-k|M|Prefix modulo
Binary Subarrays With Sum|binary-subarrays-with-sum|M|Prefix + hash map
Make Sum Divisible by P|make-sum-divisible-by-p|M|Prefix modulo + map`),
  ...c('basic-recursion', `Fibonacci Number|fibonacci-number|E|Base cases
Reverse String|reverse-string|E|Recursive swap
Power of Four|power-of-four|E|Recursive reduction
Pow(x, n)|powx-n|M|Fast exponentiation
Generate Parentheses|generate-parentheses|M|Recursive build
K-th Symbol in Grammar|k-th-symbol-in-grammar|M|Recursive structure
Expression Add Operators|expression-add-operators|H|Recursion with running value
Scramble String|scramble-string|H|Recursion + memo
Remove Invalid Parentheses|remove-invalid-parentheses|H|Pruned recursion`),
  ...s('basic-recursion', `Power of Three|power-of-three|E|Recursive reduction
Different Ways to Add Parentheses|different-ways-to-add-parentheses|M|Divide on operators`),
  ...c('sorting', `Relative Sort Array|relative-sort-array|E|Custom order
Sort Array By Parity|sort-array-by-parity|E|Partition
Height Checker|height-checker|E|Compare to sorted
Kth Largest Element in an Array|kth-largest-element-in-an-array|M|Quickselect / heap
Largest Number|largest-number|M|Custom comparator
Sort Characters By Frequency|sort-characters-by-frequency|M|Count + sort
Count of Smaller Numbers After Self|count-of-smaller-numbers-after-self|H|Merge sort counting
Reverse Pairs|reverse-pairs|H|Merge sort counting
Create Sorted Array through Instructions|create-sorted-array-through-instructions|H|BIT / merge sort`),
  ...s('sorting', `Sort an Array|sort-an-array|M|Implement merge sort
Sort List|sort-list|M|Merge sort on list
Wiggle Sort II|wiggle-sort-ii|M|Sort + interleave
H-Index|h-index|M|Sort / counting`),
  ...c('linked-lists', `Reverse Linked List|reverse-linked-list|E|Pointer reversal
Merge Two Sorted Lists|merge-two-sorted-lists|E|Dummy node
Remove Linked List Elements|remove-linked-list-elements|E|Dummy node
Add Two Numbers|add-two-numbers|M|Carry traversal
Remove Nth Node From End of List|remove-nth-node-from-end-of-list|M|Gap pointers
Rotate List|rotate-list|M|Length + relink
Merge k Sorted Lists|merge-k-sorted-lists|H|Heap / divide and conquer
Reverse Nodes in k-Group|reverse-nodes-in-k-group|H|Segment reversal`),
  ...s('linked-lists', `Copy List with Random Pointer|copy-list-with-random-pointer|M|Interleaving / map
Palindrome Linked List|palindrome-linked-list|E|Reverse second half
Swap Nodes in Pairs|swap-nodes-in-pairs|M|Pointer rewiring
Odd Even Linked List|odd-even-linked-list|M|Two chains
Intersection of Two Linked Lists|intersection-of-two-linked-lists|E|Pointer switching`),
  ...c('stacks', `Valid Parentheses|valid-parentheses|E|Matching stack
Backspace String Compare|backspace-string-compare|E|Stack simulation
Baseball Game|baseball-game|E|Stack simulation
Min Stack|min-stack|M|Auxiliary stack
Evaluate Reverse Polish Notation|evaluate-reverse-polish-notation|M|Operand stack
Decode String|decode-string|M|Nested stack
Longest Valid Parentheses|longest-valid-parentheses|H|Index stack
Number of Atoms|number-of-atoms|H|Nested stack + map
Maximal Rectangle|maximal-rectangle|H|Histogram stack per row`),
  ...s('stacks', `Simplify Path|simplify-path|M|Stack of segments
Asteroid Collision|asteroid-collision|M|Collision stack
Remove All Adjacent Duplicates In String|remove-all-adjacent-duplicates-in-string|E|Stack
Basic Calculator II|basic-calculator-ii|M|Operator stack
Valid Parenthesis String|valid-parenthesis-string|M|Range counting`),
  ...c('fast-slow-pointers', `Linked List Cycle|linked-list-cycle|E|Floyd detection
Middle of the Linked List|middle-of-the-linked-list|E|Fast and slow
Happy Number|happy-number|E|Cycle in a sequence
Linked List Cycle II|linked-list-cycle-ii|M|Cycle entry
Find the Duplicate Number|find-the-duplicate-number|M|Array as linked list
Reorder List|reorder-list|M|Middle + reverse + merge`),
  ...s('fast-slow-pointers', `Circular Array Loop|circular-array-loop|M|Cycle detection in array`),
];
