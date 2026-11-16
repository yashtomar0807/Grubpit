import './problem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FALLBACK_PROBLEMS = [
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

  // --- STACK (31-40) ---
  { id: "valid-parentheses", title: "20. Valid Parentheses", difficulty: "Easy", category: "Stack", url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: "min-stack", title: "155. Min Stack", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/min-stack/" },
  { id: "evaluate-reverse-polish-notation", title: "150. Evaluate Reverse Polish Notation", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: "generate-parentheses", title: "22. Generate Parentheses", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/generate-parentheses/" },
  { id: "daily-temperatures", title: "739. Daily Temperatures", difficulty: "Medium", category: "Stack", url: "https://leetcode.com/problems/daily-temperatures/" },

  // --- BINARY SEARCH (41-50) ---
  { id: "binary-search", title: "704. Binary Search", difficulty: "Easy", category: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
  { id: "search-a-2d-matrix", title: "74. Search a 2D Matrix", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
  { id: "koko-eating-bananas", title: "875. Koko Eating Bananas", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/koko-eating-bananas/" },
  { id: "find-minimum-in-rotated-sorted-array", title: "153. Find Minimum in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: "search-in-rotated-sorted-array", title: "33. Search in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },

  // --- LINKED LIST (51-60) ---
  { id: "reverse-linked-list", title: "206. Reverse Linked List", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: "merge-two-sorted-lists", title: "21. Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: "linked-list-cycle", title: "141. Linked List Cycle", difficulty: "Easy", category: "Linked List", url: "https://leetcode.com/problems/linked-list-cycle/" },

  // --- TREES & GRAPHS (61-70) ---
  { id: "invert-binary-tree", title: "226. Invert Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: "maximum-depth-of-binary-tree", title: "104. Maximum Depth of Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: "diameter-of-binary-tree", title: "543. Diameter of Binary Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
  { id: "same-tree", title: "100. Same Tree", difficulty: "Easy", category: "Trees & Graphs", url: "https://leetcode.com/problems/same-tree/" },

  // --- DYNAMIC PROGRAMMING & GREEDY (71-80) ---
  { id: "climbing-stairs", title: "70. Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming", url: "https://leetcode.com/problems/climbing-stairs/" },
  { id: "house-robber", title: "198. House Robber", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/house-robber/" },
  { id: "coin-change", title: "322. Coin Change", difficulty: "Medium", category: "Dynamic Programming", url: "https://leetcode.com/problems/coin-change/" }
];

function ProblemPane({ onSelectProblem }) {
  const [problems, setProblems] = useState(FALLBACK_PROBLEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeProblemId, setActiveProblemId] = useState('two-sum');

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/problems`);
        if (response.data.success && Array.isArray(response.data.problems) && response.data.problems.length > 0) {
          setProblems(response.data.problems);
          if (onSelectProblem) {
            onSelectProblem(response.data.problems[0]);
          }
        }
      } catch (err) {
        console.warn('Backend API unavailable, using instant fallback LeetCode list:', err);
      }
    }
    fetchProblems();
    if (onSelectProblem && FALLBACK_PROBLEMS.length > 0) {
      onSelectProblem(FALLBACK_PROBLEMS[0]);
    }
  }, []);

  const handleSelect = (prob) => {
    setActiveProblemId(prob.id);
    if (onSelectProblem) {
      onSelectProblem(prob);
    }
  };

  const categories = ['ALL', 'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List', 'Trees & Graphs', 'Backtracking', 'Graphs', 'Dynamic Programming'];

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = selectedDifficulty === 'ALL' || p.difficulty.toUpperCase() === selectedDifficulty;
    const matchesCat = activeCategory === 'ALL' || p.category === activeCategory;
    return matchesSearch && matchesDiff && matchesCat;
  });

  return (
    <div className="problem-pane-container">
      {/* Pane Header */}
      <div className="problem-pane-header">
        <div className="pane-title">
          <span className="pane-icon">🚀</span>
          <h3>100 LeetCode Problems</h3>
        </div>
        <span className="count-tag">{filteredProblems.length} / {problems.length}</span>
      </div>

      {/* Search & Filter Controls */}
      <div className="problem-filter-bar">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search question or topic (e.g. 3Sum, Tree, DP)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-row">
          <select 
            className="category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
            ))}
          </select>

          <div className="difficulty-tabs">
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
              <button 
                key={diff}
                className={`diff-tab-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instant Problem List */}
      <div className="problem-list">
        {filteredProblems.length === 0 ? (
          <div className="empty-list">
            <p>No LeetCode questions match your filter.</p>
          </div>
        ) : (
          filteredProblems.map((prob) => {
            const isSelected = prob.id === activeProblemId;
            return (
              <div 
                key={prob.id} 
                className={`problem-item-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(prob)}
              >
                <div className="item-top">
                  <span className={`diff-badge ${prob.difficulty.toLowerCase()}`}>
                    {prob.difficulty}
                  </span>
                  <span className="category-pill">{prob.category}</span>
                </div>

                <h4 className="item-title">{prob.title}</h4>

                <div className="item-actions">
                  <a 
                    href={prob.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="leetcode-link-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>↗ Open on LeetCode</span>
                  </a>

                  <button 
                    className="select-template-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(prob);
                    }}
                  >
                    <span>{isSelected ? '✓ Active' : '⚡ Select Question'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProblemPane;
