import './RoomPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Input from '../components/room/input';
import OutputWin from '../components/room/output';
import Navbar from '../components/room/roomNavbar';
import Chat from '../components/room/chat';
import Users from '../components/room/users';
import ProblemPane from '../components/room/problem';

function RoomPage() {
  const { roomCode } = useParams();
  const [room, setRoom] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemPane, setShowProblemPane] = useState(true);

  async function fetchRoom() {
    try {
      const response = await axios.get(`http://localhost:5000/api/room/${roomCode}`);
      setRoom(response.data.room);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, [roomCode]);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <main className="room-container">
      <Navbar room={room} />

      {/* Mode Sub-bar */}
      <div className="workspace-subbar">
        <button 
          className={`toggle-pane-btn ${showProblemPane ? 'active' : ''}`}
          onClick={() => setShowProblemPane(!showProblemPane)}
        >
          {showProblemPane ? '📖 Hide Problem Description' : '🎯 Show LeetCode Problem'}
        </button>

        {selectedProblem && (
          <div className="current-problem-pill">
            <span>Solving: <strong>{selectedProblem.title}</strong></span>
            <span className={`diff-tag ${selectedProblem.difficulty?.toLowerCase()}`}>
              {selectedProblem.difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className={`workspace ${showProblemPane ? 'with-problem' : 'full-editor'}`}>
        <aside className="users-pane">
          <Users />
        </aside>

        {showProblemPane && (
          <aside className="problem-pane">
            <ProblemPane onSelectProblem={handleSelectProblem} />
          </aside>
        )}

        <section className="editor-pane">
          <div className="code-editor">
            <Input selectedProblem={selectedProblem} />
          </div>
          <div className="console-output">
            <OutputWin />
          </div>
        </section>

        <aside className="chat-pane">
          <Chat />
        </aside>
      </div>
    </main>
  );
}

export default RoomPage;