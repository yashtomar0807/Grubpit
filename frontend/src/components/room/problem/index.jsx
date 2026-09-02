import './problem.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProblemPane({ onSelectProblem }) {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeProblemId, setActiveProblemId] = useState('two-sum');

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get('http://localhost:5000/api/problems');
        if (response.data.success) {
          setProblems(response.data.problems);
          if (response.data.problems.length > 0 && onSelectProblem) {
            onSelectProblem(response.data.problems[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching problems:', err);
      }
    }
    fetchProblems();
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

      {/* Instant 100 Problem List */}
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
