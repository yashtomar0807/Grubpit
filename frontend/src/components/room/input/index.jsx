import './input.css';
import { useState, useEffect } from 'react';

function Input({ selectedProblem, activeFile, onActiveFileCodeChange, socket, roomCode }) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');

  // Helper to get language mode from filename
  const getLanguageFromFileName = (fileName) => {
    if (!fileName) return 'cpp';
    if (fileName.endsWith('.cpp') || fileName.endsWith('.h')) return 'cpp';
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return 'javascript';
    if (fileName.endsWith('.py')) return 'python';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  // Synchronize when activeFile or selectedProblem changes
  useEffect(() => {
    if (activeFile) {
      setCode(activeFile.content || '');
      setLanguage(getLanguageFromFileName(activeFile.name));
    } else if (selectedProblem && selectedProblem.starterCode) {
      const template = selectedProblem.starterCode[language] || selectedProblem.starterCode['cpp'] || '';
      setCode(template);
    } else {
      setCode(
`#include <iostream>
using namespace std;

// Grubpit Collaborative Workspace
// Solution for DSA Problem / Software Project

int main() {
    cout << "Hello Grubpit! Ready to code and solve DSA problems." << endl;
    return 0;
}`
      );
    }
  }, [activeFile, selectedProblem]);

  // Listen to remote code updates from peers via Socket.IO
  useEffect(() => {
    if (socket) {
      const handleCodeUpdate = (data) => {
        if (data && data.senderId !== socket.id && data.code !== undefined) {
          setCode(data.code);
          if (data.language && data.language !== language) {
            setLanguage(data.language);
          }
        }
      };

      socket.on('code_update', handleCodeUpdate);
      return () => {
        socket.off('code_update', handleCodeUpdate);
      };
    }
  }, [socket, language]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (activeFile && onActiveFileCodeChange) {
      onActiveFileCodeChange(newCode);
    } else if (socket && socket.connected && roomCode) {
      socket.emit('code_change', {
        roomCode,
        code: newCode,
        language
      });
    }
  };

  const currentFileName = activeFile 
    ? activeFile.name 
    : `solution.${language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'js'}`;

  return (
    <div className="editor-container">
      <div className="editor-topbar">
        <div className="topbar-left">
          <span className="file-icon">📄</span>
          <span className="file-name">{currentFileName}</span>
          
          <select 
            className="lang-select"
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++ (GCC 11)</option>
            <option value="python">Python 3.10</option>
            <option value="java">Java 17</option>
            <option value="javascript">JavaScript (Node 18)</option>
            <option value="html">HTML5</option>
            <option value="css">CSS3</option>
            <option value="json">JSON Config</option>
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
          onChange={(e) => handleCodeChange(e.target.value)}
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default Input;