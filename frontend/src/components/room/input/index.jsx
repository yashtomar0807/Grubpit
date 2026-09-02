import './input.css';
import { useState, useEffect } from 'react';

function Input({ selectedProblem }) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');

  // Update starter code when selectedProblem or language changes
  useEffect(() => {
    if (selectedProblem && selectedProblem.starterCode) {
      const template = selectedProblem.starterCode[language] || selectedProblem.starterCode['cpp'] || '';
      setCode(template);
    } else {
      setCode(
`#include <iostream>
using namespace std;

// Grubpit Collaborative Workspace
// Solution for DSA Problem

int main() {
    cout << "Hello Grubpit! Ready to code and solve DSA problems." << endl;
    return 0;
}`
      );
    }
  }, [selectedProblem, language]);

  return (
    <div className="editor-container">
      <div className="editor-topbar">
        <div className="topbar-left">
          <span className="file-icon">📄</span>
          <span className="file-name">
            solution.{language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'js'}
          </span>
          
          <select 
            className="lang-select"
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++ (GCC 11)</option>
            <option value="python">Python 3.10</option>
            <option value="java">Java 17</option>
            <option value="javascript">JavaScript (Node 18)</option>
          </select>
        </div>

        <div className="topbar-right">
          <span className="sync-badge">⚡ Live Synced</span>
          <span className="lines-badge">{code.split('\n').length} Lines</span>
        </div>
      </div>

      <div className="editor-textarea-wrapper">
        <div className="line-numbers">
          {code.split('\n').map((_, index) => (
            <span key={index + 1}>{index + 1}</span>
          ))}
        </div>
        <textarea
          className="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default Input;