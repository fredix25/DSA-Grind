import type { Problem, Difficulty } from '../lib/types';
// verified:false => slug/difficulty written from memory; leetcode.com is unreachable from the build sandbox.
// Run `npm run check-links` locally to verify. Known gaps: arrays & two-pointers have only 2 natural Hards.
type Row = [string, string, Difficulty, string, string];
const mk = (topicId: string, rows: Row[]): Problem[] => rows.map(([title, slug, difficulty, pattern, objective]) =>
  ({ id: `${topicId}:${slug}`, title, slug, difficulty, topicId, pattern, objective, core: true, verified: false }));
import { more } from './more';
import { more2 } from './more2';
import { more3 } from './more3';
const base: Problem[] = [
  ...mk('arrays', [
    ['Remove Duplicates from Sorted Array','remove-duplicates-from-sorted-array','Easy','Write pointer','Overwrite in place while tracking a write index.'],
    ['Best Time to Buy and Sell Stock','best-time-to-buy-and-sell-stock','Easy','Running min','Track a running minimum for a one-pass answer.'],
    ['Move Zeroes','move-zeroes','Easy','In-place partition','Stably partition without extra space.'],
    ['Maximum Subarray','maximum-subarray','Medium','Kadane','Choose at each index to extend or restart.'],
    ['Product of Array Except Self','product-of-array-except-self','Medium','Prefix/suffix','Combine left and right passes without division.'],
    ['Set Matrix Zeroes','set-matrix-zeroes','Medium','In-place marking','Reuse the matrix as O(1) marker space.'],
    ['First Missing Positive','first-missing-positive','Hard','Index as hash','Use indices as a hash set for O(1) space.'],
    ['Candy','candy','Hard','Two-pass greedy','Satisfy both neighbor constraints with two sweeps.'],
  ]),
  ...mk('strings', [
    ['Valid Palindrome','valid-palindrome','Easy','Clean + compare','Normalize input and compare from both ends.'],
    ['Longest Common Prefix','longest-common-prefix','Easy','Vertical scan','Compare column by column and stop early.'],
    ['Length of Last Word','length-of-last-word','Easy','Reverse scan','Handle trailing spaces by scanning backward.'],
    ['Reverse Words in a String','reverse-words-in-a-string','Medium','Tokenizing','Split on irregular whitespace and rebuild.'],
    ['String to Integer (atoi)','string-to-integer-atoi','Medium','State parsing','Handle sign, whitespace, and overflow step by step.'],
    ['Zigzag Conversion','zigzag-conversion','Medium','Simulation','Map characters to rows with a direction flag.'],
    ['Text Justification','text-justification','Hard','Greedy packing','Pack words per line then distribute spaces.'],
    ['Shortest Palindrome','shortest-palindrome','Hard','KMP / prefix function','Find the longest palindromic prefix efficiently.'],
    ['Longest Happy Prefix','longest-happy-prefix','Hard','KMP / prefix function','Compute the longest prefix that is also a suffix.'],
  ]),
  ...mk('hashing', [
    ['Two Sum','two-sum','Easy','Hash map','A hash map replaces repeated searching.'],
    ['Valid Anagram','valid-anagram','Easy','Frequency count','Compare character counts.'],
    ['Contains Duplicate','contains-duplicate','Easy','Hash set','Detect repeats in O(n) with a set.'],
    ['Group Anagrams','group-anagrams','Medium','Canonical key','Design a key that groups equivalent items.'],
    ['Top K Frequent Elements','top-k-frequent-elements','Medium','Frequency + bucket','Count then select by frequency.'],
    ['Longest Consecutive Sequence','longest-consecutive-sequence','Medium','Set + sequence starts','Only expand from sequence starts for O(n).'],
    ['Substring with Concatenation of All Words','substring-with-concatenation-of-all-words','Hard','Frequency windows','Match word-level frequency maps over windows.'],
    ['Max Points on a Line','max-points-on-a-line','Hard','Slope hashing','Hash normalized slopes per anchor point.'],
    ['LFU Cache','lfu-cache','Hard','Hash + frequency lists','Combine maps to get O(1) eviction.'],
  ]),
  ...mk('two-pointers', [
    ['Merge Sorted Array','merge-sorted-array','Easy','Fill from back','Merge in place by writing from the end.'],
    ['Two Sum II - Input Array Is Sorted','two-sum-ii-input-array-is-sorted','Easy','Opposite ends','Use sortedness to move one pointer per step.'],
    ['Squares of a Sorted Array','squares-of-a-sorted-array','Easy','Opposite ends','Largest squares sit at the extremes.'],
    ['3Sum','3sum','Medium','Sort + two pointers','Reduce k-sum to two-sum and skip duplicates.'],
    ['Container With Most Water','container-with-most-water','Medium','Opposite ends greedy','Move the shorter wall to improve the area.'],
    ['Sort Colors','sort-colors','Medium','Dutch national flag','Partition three values in one pass.'],
    ['Trapping Rain Water','trapping-rain-water','Hard','Opposite ends + max','Track left and right maxima while converging.'],
    ['Count Subarrays With Fixed Bounds','count-subarrays-with-fixed-bounds','Hard','Last-seen pointers','Track last positions of min, max, and invalid values.'],
  ]),
  ...mk('binary-search', [
    ['Binary Search','binary-search','Easy','Classic','Halve a sorted search space.'],
    ['Search Insert Position','search-insert-position','Easy','Lower bound','Find the first index not less than target.'],
    ['Sqrt(x)','sqrtx','Easy','Search on answer','Binary search the answer, not an array.'],
    ['Search in Rotated Sorted Array','search-in-rotated-sorted-array','Medium','Sorted half','Decide which half is sorted each step.'],
    ['Find First and Last Position of Element in Sorted Array','find-first-and-last-position-of-element-in-sorted-array','Medium','Lower/upper bound','Run two boundary searches.'],
    ['Koko Eating Bananas','koko-eating-bananas','Medium','Search on answer','Binary search the minimal feasible speed.'],
    ['Median of Two Sorted Arrays','median-of-two-sorted-arrays','Hard','Partition search','Binary search the partition of the shorter array.'],
    ['Split Array Largest Sum','split-array-largest-sum','Hard','Search on answer','Feasibility check plus binary search on the sum.'],
    ['Find Minimum in Rotated Sorted Array II','find-minimum-in-rotated-sorted-array-ii','Hard','Rotated + duplicates','Handle ties by shrinking the range by one.'],
  ]),
];
export const problems: Problem[] = [...base, ...more, ...more2, ...more3];
