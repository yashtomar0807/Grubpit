import './outputwin.css';
import { useState } from 'react';

function OutputWin() {
  const [output, setOutput] = useState([
    { type: 'info', text: 'System: Execution environment ready.' },
    { type: 'success', text: 'Output: Hello Grubpit! Ready to code and solve DSA problems.' }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput((prev) => [...prev, { type: 'info', text: 'Running code on Grubpit Engine...' }]);
    
    setTimeout(() => {
      setIsRunning(false);
      setOutput((prev) => [
        ...prev,
        { type: 'success', text: 'Process finished with exit code 0.' },
        { type: 'out', text: 'Memory used: 4.2 MB | Execution time: 14ms' }
      ]);
    }, 1000);
  };

  const handleClear = () => {
    setOutput([]);
  };

  return (
    <div className="output-container">
      <div className="output-topbar">
        <div className="topbar-left">
          <span className="terminal-icon">🖥️</span>
          <span className="output-title">Console & Test Output</span>
        </div>

        <div className="topbar-right">
          <button className="clear-btn" onClick={handleClear}>Clear</button>
          <button className="run-code-btn" onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? '⏳ Executing...' : '▶ Run Code'}
          </button>
        </div>
      </div>

      <div className="console-logs">
        {output.length === 0 ? (
          <p className="no-logs">Console output will appear here after running code...</p>
        ) : (
          output.map((log, index) => (
            <div key={index} className={`log-line ${log.type}`}>
              <span className="log-prefix">&gt;</span> {log.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OutputWin;