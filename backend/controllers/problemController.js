const problems = [
  // --- ARRAYS & HASHING (1-10) ---
  { id: "two-sum", title: "1. Two Sum", difficulty: "Easy", category: "Arrays & Hashing", url: "https://leetcode.com/problems/two-sum/" },
  { id: "contains-duplicate", title: "217. Contains Duplicate", difficulty: "Easy", category: "Arrays & Hashing", url: "https://leetcode.com/problems/contains-duplicate/" },
  { id: "valid-anagram", title: "242. Valid Anagram", difficulty: "Easy", category: "Arrays & Hashing", url: "https://leetcode.com/problems/valid-anagram/" },
  { id: "group-anagrams", title: "49. Group Anagrams", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/group-anagrams/" },
  { id: "top-k-frequent-elements", title: "347. Top K Frequent Elements", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { id: "product-of-array-except-self", title: "238. Product of Array Except Self", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: "valid-sudoku", title: "36. Valid Sudoku", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/valid-sudoku/" },
  { id: "longest-consecutive-sequence", title: "128. Longest Consecutive Sequence", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { id: "encode-and-decode-strings", title: "271. Encode and Decode Strings", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/encode-and-decode-strings/" },
  { id: "sort-colors", title: "75. Sort Colors", difficulty: "Medium", category: "Arrays & Hashing", url: "https://leetcode.com/problems/sort-colors/" },

  // --- TWO POINTERS (11-20) ---
  { id: "valid-palindrome", title: "125. Valid Palindrome", difficulty: "Easy", category: "Two Pointers", url: "https://leetcode.com/problems/valid-palindrome/" },
  { id: "two-sum-ii", title: "167. Two Sum II - Input Array Is Sorted", difficulty: "Medium", category: "Two Pointers", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  { id: "3sum", title: "15. 3Sum", difficulty: "Medium", category: "Two Pointers", url: "https://leetcode.com/problems/3sum/" },
  { id: "container-with-most-water", title: "11. Container With Most Water", difficulty: "Medium", category: "Two Pointers", url: "https://leetcode.com/problems/container-with-most-water/" },
  { id: "trapping-rain-water", title: "42. Trapping Rain Water", difficulty: "Hard", category: "Two Pointers", url: "https://leetcode.com/problems/trapping-rain-water/" },
  { id: "4sum", title: "18. 4Sum", difficulty: "Medium", category: "Two Pointers", url: "https://leetcode.com/problems/4sum/" },
  { id: "merge-sorted-array", title: "88. Merge Sorted Array", difficulty: "Easy", category: "Two Pointers", url: "https://leetcode.com/problems/merge-sorted-array/" },
  { id: "move-zeroes", title: "283. Move Zeroes", difficulty: "Easy", category: "Two Pointers", url: "https://leetcode.com/problems/move-zeroes/" },
  { id: "squares-of-a-sorted-array", title: "977. Squares of a Sorted Array", difficulty: "Easy", category: "Two Pointers", url: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
  { id: "longest-mountain-in-array", title: "845. Longest Mountain in Array", difficulty: "Medium", category: "Two Pointers", url: "https://leetcode.com/problems/longest-mountain-in-array/" },

  // --- SLIDING WINDOW (21-30) ---
  { id: "best-time-to-buy-and-sell-stock", title: "121. Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Sliding Window", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: "longest-substring-without-repeating-characters", title: "3. Longest Substring Without Repeating", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: "longest-repeating-character-replacement", title: "424. Longest Repeating Character Replacement", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { id: "permutation-in-string", title: "567. Permutation in String", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/permutation-in-string/" },
  { id: "minimum-window-substring", title: "76. Minimum Window Substring", difficulty: "Hard", category: "Sliding Window", url: "https://leetcode.com/problems/minimum-window-substring/" },
  { id: "sliding-window-maximum", title: "239. Sliding Window Maximum", difficulty: "Hard", category: "Sliding Window", url: "https://leetcode.com/problems/sliding-window-maximum/" },
  { id: "minimum-size-subarray-sum", title: "209. Minimum Size Subarray Sum", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
  { id: "find-all-anagrams-in-a-string", title: "438. Find All Anagrams in a String", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
  { id: "max-consecutive-ones-iii", title: "1004. Max Consecutive Ones III", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
  { id: "fruit-into-baskets", title: "904. Fruit Into Baskets", difficulty: "Medium", category: "Sliding Window", url: "https://leetcode.com/problems/fruit-into-baskets/" },

  // --- STACK (31-40) ---
  { id: "valid-parentheses", title: "20. Valid Parentheses", difficulty: "Easy", category: "Stack", url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: "min-stack", title: "155. Min Stack", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/min-stack/" },
  { id: "evaluate-reverse-polish-notation", title: "150. Evaluate Reverse Polish Notation", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: "generate-parentheses", title: "22. Generate Parentheses", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/generate-parentheses/" },
  { id: "daily-temperatures", title: "739. Daily Temperatures", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/daily-temperatures/" },
  { id: "car-fleet", title: "853. Car Fleet", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/car-fleet/" },
  { id: "largest-rectangle-in-histogram", title: "84. Largest Rectangle in Histogram", difficulty: "Hard", category: "Stack", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { id: "simplify-path", title: "71. Simplify Path", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/simplify-path/" },
  { id: "decode-string", title: "394. Decode String", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/decode-string/" },
  { id: "online-stock-span", title: "901. Online Stock Span", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/online-stock-span/" },

  // --- BINARY SEARCH (41-50) ---
  { id: "binary-search", title: "704. Binary Search", difficulty: "Easy", category: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
  { id: "search-a-2d-matrix", title: "74. Search a 2D Matrix", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
  { id: "koko-eating-bananas", title: "875. Koko Eating Bananas", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/koko-eating-bananas/" },
  { id: "find-minimum-in-rotated-sorted-array", title: "153. Find Minimum in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: "search-in-rotated-sorted-array", title: "33. Search in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: "time-based-key-value-store", title: "981. Time Based Key-Value Store", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/time-based-key-value-store/" },
  { id: "median-of-two-sorted-arrays", title: "4. Median of Two Sorted Arrays", difficulty: "Hard", category: "Binary Search", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { id: "find-first-and-last-position-of-element", title: "34. Find First and Last Position of Element", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
  { id: "find-peak-element", title: "162. Find Peak Element", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/find-peak-element/" },
  { id: "sqrtx", title: "69. Sqrt(x)", difficulty: "Easy", category: "Binary Search", url: "https://leetcode.com/problems/sqrtx/" },

  // --- LINKED LIST (51-60) ---
  { id: "reverse-linked-list", title: "206. Reverse Linked List", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: "merge-two-sorted-lists", title: "21. Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: "linked-list-cycle", title: "141. Linked List Cycle", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { id: "reorder-list", title: "143. Reorder List", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/reorder-list/" },
  { id: "remove-nth-node-from-end-of-list", title: "19. Remove Nth Node From End of List", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { id: "copy-list-with-random-pointer", title: "138. Copy List with Random Pointer", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { id: "add-two-numbers", title: "2. Add Two Numbers", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/add-two-numbers/" },
  { id: "find-the-duplicate-number", title: "287. Find the Duplicate Number", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
  { id: "lru-cache", title: "146. LRU Cache", difficulty: "Medium", category: "Linked List", url: "https://leetcode.com/problems/lru-cache/" },
  { id: "merge-k-sorted-lists", title: "23. Merge k Sorted Lists", difficulty: "Hard", category: "Linked List", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },

  // --- TREES & GRAPHS (61-70) ---
  { id: "invert-binary-tree", title: "226. Invert Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: "maximum-depth-of-binary-tree", title: "104. Maximum Depth of Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: "diameter-of-binary-tree", title: "543. Diameter of Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
  { id: "balanced-binary-tree", title: "110. Balanced Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/balanced-binary-tree/" },
  { id: "same-tree", title: "100. Same Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/same-tree/" },
  { id: "subtree-of-another-tree", title: "572. Subtree of Another Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { id: "lowest-common-ancestor-of-a-bst", title: "235. Lowest Common Ancestor of a BST", difficulty: "Medium", category: "Trees & Graphs", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: "binary-tree-level-order-traversal", title: "102. Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees & Graphs", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: "binary-tree-right-side-view", title: "199. Binary Tree Right Side View", difficulty: "Medium", category: "Trees & Graphs", url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
  { id: "validate-binary-search-tree", title: "98. Validate Binary Search Tree", difficulty: "Medium", category: "Trees & Graphs", url: "https://leetcode.com/problems/validate-binary-search-tree/" },

  // --- BACKTRACKING (71-80) ---
  { id: "subsets", title: "78. Subsets", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/subsets/" },
  { id: "combination-sum", title: "39. Combination Sum", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/combination-sum/" },
  { id: "permutations", title: "46. Permutations", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/permutations/" },
  { id: "subsets-ii", title: "90. Subsets II", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/subsets-ii/" },
  { id: "combination-sum-ii", title: "40. Combination Sum II", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/combination-sum-ii/" },
  { id: "word-search", title: "79. Word Search", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/word-search/" },
  { id: "palindrome-partitioning", title: "131. Palindrome Partitioning", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/palindrome-partitioning/" },
  { id: "letter-combinations-of-a-phone-number", title: "17. Letter Combinations of a Phone Number", difficulty: "Medium", category: "Backtracking", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
  { id: "n-queens", title: "51. N-Queens", difficulty: "Hard", category: "Backtracking", url: "https://leetcode.com/problems/n-queens/" },
  { id: "sudoku-solver", title: "37. Sudoku Solver", difficulty: "Hard", category: "Backtracking", url: "https://leetcode.com/problems/sudoku-solver/" },

  // --- GRAPHS (81-90) ---
  { id: "number-of-islands", title: "200. Number of Islands", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/number-of-islands/" },
  { id: "max-area-of-island", title: "695. Max Area of Island", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/max-area-of-island/" },
  { id: "clone-graph", title: "133. Clone Graph", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/clone-graph/" },
  { id: "rotting-oranges", title: "994. Rotting Oranges", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/rotting-oranges/" },
  { id: "pacific-atlantic-water-flow", title: "417. Pacific Atlantic Water Flow", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { id: "surrounded-regions", title: "130. Surrounded Regions", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/surrounded-regions/" },
  { id: "course-schedule", title: "207. Course Schedule", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/course-schedule/" },
  { id: "course-schedule-ii", title: "210. Course Schedule II", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/course-schedule-ii/" },
  { id: "redundant-connection", title: "684. Redundant Connection", difficulty: "Medium", category: "Graphs", url: "https://leetcode.com/problems/redundant-connection/" },
  { id: "word-ladder", title: "127. Word Ladder", difficulty: "Hard", category: "Graphs", url: "https://leetcode.com/problems/word-ladder/" },

  // --- DYNAMIC PROGRAMMING & GREEDY (91-100) ---
  { id: "climbing-stairs", title: "70. Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming", url: "https://leetcode.com/problems/climbing-stairs/" },
  { id: "min-cost-climbing-stairs", title: "746. Min Cost Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming", url: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
  { id: "house-robber", title: "198. House Robber", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/house-robber/" },
  { id: "house-robber-ii", title: "213. House Robber II", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/house-robber-ii/" },
  { id: "longest-palindromic-substring", title: "5. Longest Palindromic Substring", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: "palindromic-substrings", title: "647. Palindromic Substrings", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/palindromic-substrings/" },
  { id: "decode-ways", title: "91. Decode Ways", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/decode-ways/" },
  { id: "coin-change", title: "322. Coin Change", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/coin-change/" },
  { id: "maximum-product-subarray", title: "152. Maximum Product Subarray", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/maximum-product-subarray/" },
  { id: "word-break", title: "139. Word Break", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/word-break/" }
];

export function getProblems(req, res) {
  try {
    res.status(200).json({
      success: true,
      count: problems.length,
      problems
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching problems", error });
  }
}

export function getProblemById(req, res) {
  try {
    const { id } = req.params;
    const problem = problems.find(p => p.id === id || p.title.toLowerCase().includes(id.toLowerCase()));

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    res.status(200).json({
      success: true,
      problem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching problem", error });
  }
}
