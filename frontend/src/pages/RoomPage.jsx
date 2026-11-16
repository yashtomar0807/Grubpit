import './RoomPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../services/socket';
import Input from '../components/room/input';
import OutputWin from '../components/room/output';
import Navbar from '../components/room/roomNavbar';
import Chat from '../components/room/chat';
import Users from '../components/room/users';
import ProblemPane from '../components/room/problem';
import ProjectFileExplorer from '../components/room/explorer';

function RoomPage() {
  const { roomCode } = useParams();
  const [room, setRoom] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemPane, setShowProblemPane] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [paneMode, setPaneMode] = useState('project'); // 'project' or 'leetcode'

  // Multi-File Project State
  const [projectFiles, setProjectFiles] = useState([
    { 
      id: 'file-1', 
      name: 'main.cpp', 
      type: 'file', 
      language: 'cpp', 
      content: `#include <iostream>\nusing namespace std;\n\n// Grubpit Collaborative Software Project\nint main() {\n    cout << "Hello Grubpit Software Project!" << endl;\n    return 0;\n}` 
    },
    { 
      id: 'file-2', 
      name: 'index.html', 
      type: 'file', 
      language: 'html', 
      content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Grubpit Project</title>\n</head>\n<body>\n  <h1>Welcome to Grubpit Project</h1>\n</body>\n</html>` 
    },
    { 
      id: 'file-3', 
      name: 'style.css', 
      type: 'file', 
      language: 'css', 
      content: `/* Project Global Styles */\nbody {\n  background-color: #090c15;\n  color: #f1f5f9;\n  font-family: sans-serif;\n}` 
    },
    { 
      id: 'file-4', 
      name: 'script.js', 
      type: 'file', 
      language: 'javascript', 
      content: `// Project Client Script\nconsole.log("Grubpit live project running...");` 
    }
  ]);

  const [activeFileId, setActiveFileId] = useState('file-1');

  async function fetchRoom() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/room/${roomCode}`);
      const r = response.data.room;
      setRoom(r);

      // Load initial files from MongoDB if stored
      if (r && Array.isArray(r.files) && r.files.length > 0) {
        setProjectFiles(r.files);
        if (r.files[0] && r.files[0].id) {
          setActiveFileId(r.files[0].id);
        }
      }

      // Auto set mode based on room category if provided
      if (r && (r.Roomtype?.toLowerCase().includes('category1') || r.category === 'category1')) {
        setPaneMode('project');
      } else if (r && (r.Roomtype?.toLowerCase().includes('leetcode') || r.category === 'category2')) {
        setPaneMode('leetcode');
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Helper to persist files to MongoDB
  const saveFilesToMongoDB = async (filesToSave) => {
    if (!roomCode) return;
    try {
      await axios.put(`http://localhost:5000/api/room/${roomCode}/files`, { files: filesToSave });
    } catch (err) {
      console.error("Error saving files to MongoDB:", err);
    }
  };

  useEffect(() => {
    fetchRoom();

    // Socket Connection Handling & Room Join
    if (socket) {
      if (!socket.connected) {
        socket.connect();
      }

      setIsSocketConnected(socket.connected);

      socket.emit('join_room', {
        roomCode,
        username: 'Developer'
      });

      const onConnect = () => {
        setIsSocketConnected(true);
        socket.emit('join_room', { roomCode, username: 'Developer' });
      };

      const onDisconnect = () => {
        setIsSocketConnected(false);
      };

      // Remote file tree update from peer
      const onReceiveFileTree = (data) => {
        if (data && data.senderId !== socket.id && Array.isArray(data.files)) {
          setProjectFiles(data.files);
        }
      };

      // Remote file code change from peer
      const onReceiveFileCodeChange = (data) => {
        if (data && data.senderId !== socket.id && data.fileId) {
          setProjectFiles((prevFiles) =>
            prevFiles.map((f) => (f.id === data.fileId ? { ...f, content: data.code } : f))
          );
        }
      };

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('receive_file_tree', onReceiveFileTree);
      socket.on('receive_file_code_change', onReceiveFileCodeChange);

      return () => {
        socket.emit('leave_room', { roomCode });
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('receive_file_tree', onReceiveFileTree);
        socket.off('receive_file_code_change', onReceiveFileCodeChange);
      };
    }
  }, [roomCode]);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
  };

  // Multi-File Project Explorer Actions
  const handleSelectFile = (fileId) => {
    setActiveFileId(fileId);
  };

  const handleCreateFile = (fileName) => {
    const newFile = {
      id: `file-${Date.now()}`,
      name: fileName,
      type: 'file',
      language: fileName.endsWith('.cpp') ? 'cpp' : fileName.endsWith('.py') ? 'python' : fileName.endsWith('.html') ? 'html' : fileName.endsWith('.css') ? 'css' : fileName.endsWith('.json') ? 'json' : 'javascript',
      content: `// File: ${fileName}\n`
    };

    const updatedFiles = [...projectFiles, newFile];
    setProjectFiles(updatedFiles);
    setActiveFileId(newFile.id);

    saveFilesToMongoDB(updatedFiles);

    if (socket && socket.connected && roomCode) {
      socket.emit('file_tree_update', { roomCode, files: updatedFiles });
    }
  };

  const handleUploadSystemFiles = (uploadedFiles) => {
    if (!uploadedFiles || !uploadedFiles.length) return;
    const updatedFiles = [...projectFiles, ...uploadedFiles];
    setProjectFiles(updatedFiles);
    setActiveFileId(uploadedFiles[0].id);

    saveFilesToMongoDB(updatedFiles);

    if (socket && socket.connected && roomCode) {
      socket.emit('file_tree_update', { roomCode, files: updatedFiles });
    }
  };

  const handleDeleteFile = (fileId) => {
    if (projectFiles.length <= 1) return;
    const updatedFiles = projectFiles.filter((f) => f.id !== fileId);
    setProjectFiles(updatedFiles);
    if (activeFileId === fileId && updatedFiles.length > 0) {
      setActiveFileId(updatedFiles[0].id);
    }

    saveFilesToMongoDB(updatedFiles);

    if (socket && socket.connected && roomCode) {
      socket.emit('file_tree_update', { roomCode, files: updatedFiles });
    }
  };

  const handleActiveFileCodeChange = (newCode) => {
    const updatedFiles = projectFiles.map((f) => 
      f.id === activeFileId ? { ...f, content: newCode } : f
    );
    setProjectFiles(updatedFiles);

    saveFilesToMongoDB(updatedFiles);

    if (socket && socket.connected && roomCode) {
      socket.emit('file_code_change', {
        roomCode,
        fileId: activeFileId,
        code: newCode
      });
    }
  };

  const activeFile = projectFiles.find((f) => f.id === activeFileId) || projectFiles[0];

  return (
    <main className="room-container">
      <Navbar room={room} isConnected={isSocketConnected} />

      {/* Mode Sub-bar */}
      <div className="workspace-subbar">
        <div className="subbar-left">
          <button 
            className={`toggle-pane-btn ${showProblemPane ? 'active' : ''}`}
            onClick={() => setShowProblemPane(!showProblemPane)}
          >
            {showProblemPane 
              ? (paneMode === 'project' ? '📁 Hide File Explorer' : '📖 Hide LeetCode') 
              : (paneMode === 'project' ? '📁 Show File Explorer' : '🎯 Show LeetCode')}
          </button>

          {/* Mode Switcher: Projects vs LeetCode */}
          <button 
            className="toggle-pane-btn"
            onClick={() => setPaneMode(paneMode === 'project' ? 'leetcode' : 'project')}
            title="Switch Sidebar View"
          >
            {paneMode === 'project' ? '🎯 Switch to LeetCode DSA' : '📁 Switch to Project Explorer'}
          </button>

          <span className={`socket-status-badge ${isSocketConnected ? 'connected' : 'connecting'}`}>
            {isSocketConnected ? '🟢 Sockets Connected' : '🟡 Connecting Sockets...'}
          </span>
        </div>

        {paneMode === 'leetcode' && selectedProblem && (
          <div className="current-problem-pill">
            <span>Solving: <strong>{selectedProblem.title}</strong></span>
            <span className={`diff-tag ${selectedProblem.difficulty?.toLowerCase()}`}>
              {selectedProblem.difficulty}
            </span>
          </div>
        )}

        {paneMode === 'project' && activeFile && (
          <div className="current-problem-pill">
            <span>Editing File: <strong>{activeFile.name}</strong></span>
          </div>
        )}
      </div>
      
      <div className={`workspace ${showProblemPane ? 'with-problem' : 'full-editor'}`}>
        <aside className="users-pane">
          <Users socket={socket} roomCode={roomCode} />
        </aside>

        {showProblemPane && (
          <aside className="problem-pane">
            {paneMode === 'project' ? (
              <ProjectFileExplorer
                files={projectFiles}
                activeFileId={activeFileId}
                onSelectFile={handleSelectFile}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onUploadSystemFiles={handleUploadSystemFiles}
              />
            ) : (
              <ProblemPane onSelectProblem={handleSelectProblem} />
            )}
          </aside>
        )}

        <section className="editor-pane">
          <div className="code-editor">
            <Input 
              selectedProblem={paneMode === 'leetcode' ? selectedProblem : null} 
              activeFile={paneMode === 'project' ? activeFile : null}
              onActiveFileCodeChange={handleActiveFileCodeChange}
              socket={socket} 
              roomCode={roomCode} 
            />
          </div>
          <div className="console-output">
            <OutputWin />
          </div>
        </section>

        <aside className="chat-pane">
          <Chat socket={socket} roomCode={roomCode} />
        </aside>
      </div>
    </main>
  );
}

export default RoomPage;