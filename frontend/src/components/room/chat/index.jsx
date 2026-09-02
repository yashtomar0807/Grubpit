import './Chat.css';
import { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Rahul Sharma', text: 'Hey team! Ready to solve binary search tree problems today?', time: '10:42 AM', isMe: false },
    { id: 2, sender: 'You', text: 'Yes! Working on main.cpp now. Let us optimize the time complexity.', time: '10:43 AM', isMe: true }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-title">
          <span>💬</span>
          <h3>Group Chat</h3>
        </div>
        <span className="chat-online-badge">2 Online</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble-wrap ${msg.isMe ? 'me' : 'other'}`}>
            <div className="message-meta">
              <span className="sender-name">{msg.sender}</span>
              <span className="message-time">{msg.time}</span>
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <form className="chat-input-bar" onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
}

export default Chat;