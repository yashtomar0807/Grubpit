import React, { useState, useRef } from 'react';
import './explorer.css';

function ProjectFileExplorer({ files = [], activeFileId, onSelectFile, onCreateFile, onDeleteFile, onUploadSystemFiles }) {
  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef(null);

  const getBadgeClass = (name) => {
    if (name.endsWith('.cpp') || name.endsWith('.h')) return 'cpp';
    if (name.endsWith('.js') || name.endsWith('.jsx')) return 'js';
    if (name.endsWith('.py')) return 'py';
    if (name.endsWith('.html')) return 'html';
    if (name.endsWith('.css')) return 'css';
    if (name.endsWith('.json')) return 'json';
    return 'general';
  };

  const getBadgeLabel = (name) => {
    if (name.endsWith('.cpp') || name.endsWith('.h')) return 'C++';
    if (name.endsWith('.js') || name.endsWith('.jsx')) return 'JS';
    if (name.endsWith('.py')) return 'PY';
    if (name.endsWith('.html')) return 'HTML';
    if (name.endsWith('.css')) return 'CSS';
    if (name.endsWith('.json')) return 'JSON';
    return 'FILE';
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    if (onCreateFile) {
      onCreateFile(newFileName.trim());
    }
    setNewFileName('');
    setIsCreating(false);
  };

  const handleSystemFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const readPromises = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: file.name,
            type: 'file',
            language: file.name.endsWith('.cpp') ? 'cpp' : file.name.endsWith('.py') ? 'python' : file.name.endsWith('.html') ? 'html' : file.name.endsWith('.css') ? 'css' : file.name.endsWith('.json') ? 'json' : 'javascript',
            content: event.target.result || ''
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
      });
    });

    Promise.all(readPromises).then((uploadedFiles) => {
      const validFiles = uploadedFiles.filter(Boolean);
      if (validFiles.length > 0 && onUploadSystemFiles) {
        onUploadSystemFiles(validFiles);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    });
  };

  return (
    <div className="file-explorer-container">
      {/* Explorer Header */}
      <div className="explorer-header">
        <div className="explorer-title">
          <span>📁</span>
          <h3>Project Files</h3>
        </div>
        
        <div className="explorer-header-actions">
          <button className="upload-file-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()} title="Upload Files from System">
            📂 Upload
          </button>
          <button className="new-file-btn" onClick={() => setIsCreating(true)}>
            + New File
          </button>
        </div>

        {/* Hidden System File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleSystemFileUpload} 
          multiple 
          style={{ display: 'none' }} 
        />
      </div>

      {/* New File Inline Form */}
      {isCreating && (
        <form className="new-file-form" onSubmit={handleCreateSubmit}>
          <input 
            type="text" 
            placeholder="e.g. utils.js / style.css" 
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            autoFocus
          />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setIsCreating(false)}>✕</button>
        </form>
      )}

      {/* File Tree List */}
      <div className="file-tree-list">
        {files.map((file) => {
          const isActive = file.id === activeFileId;
          const badgeClass = getBadgeClass(file.name);
          const badgeLabel = getBadgeLabel(file.name);

          return (
            <div 
              key={file.id} 
              className={`file-tree-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectFile && onSelectFile(file.id)}
            >
              <div className="file-left">
                <span className={`file-icon-badge ${badgeClass}`}>{badgeLabel}</span>
                <span className="file-name-text">{file.name}</span>
              </div>

              {files.length > 1 && (
                <button 
                  className="delete-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDeleteFile) onDeleteFile(file.id);
                  }}
                  title="Delete File"
                >
                  🗑️
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="explorer-footer-info">
        <span>{files.length} Project Files</span>
        <span>💾 MongoDB Saved</span>
      </div>
    </div>
  );
}

export default ProjectFileExplorer;
