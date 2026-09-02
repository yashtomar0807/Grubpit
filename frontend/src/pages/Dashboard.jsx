import CreateRoomModal from '../components/createroommodal/CreateRoomModal';
import JoinRoomModal from '../components/joinroommodal/JoinRoomModal';  
import Navbar from '../components/navbar/Navbar';
import Notifications from '../components/notifications/Notifications';
import QuickActions from '../components/actions/QuickActions';
import RoomHistory from '../components/history/RoomHistory';
import WelcomeCard from '../components/welcome/WelcomeCard';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [rooms, setRoom] = useState([]);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const navigate = useNavigate();

  async function fetchRooms() {
    try {
      const response = await axios.get('http://localhost:5000/api/room');
      const roomList = Array.isArray(response.data) ? response.data : (response.data.rooms || []);
      setRoom(roomList);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  async function handleCreateRoom(RoomData) {
    try {
      const payload = {
        ...RoomData,
        maxParticipants: Number(RoomData.maxParticipants)
      };
      const response = await axios.post('http://localhost:5000/api/room', payload);
      await fetchRooms();
      navigate(`/room/${response.data.newRoom.roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
    setIsCreateRoomModalOpen(false);
  }

  async function handleJoinRoom(RoomData) {
    try {
      const response = await axios.post('http://localhost:5000/api/room/join', RoomData);
      setIsJoinRoomModalOpen(false);
      navigate(`/room/${response.data.room.roomCode}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join room");
    }
  }

  async function handleDeleteRoom(roomCode) {
    try {
      await axios.delete(`http://localhost:5000/api/room/${roomCode}`);
      setRoom((prevRooms) => prevRooms.filter((r) => (r.Roomcode || r.roomCode) !== roomCode));
    } catch (error) {
      console.error('Error deleting room:', error);
      alert(error.response?.data?.message || 'Failed to delete room');
    }
  }

  return (
    <main className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        <WelcomeCard />
        
        <QuickActions
          onCreateRoomClick={() => setIsCreateRoomModalOpen(true)}
          onJoinRoomClick={() => setIsJoinRoomModalOpen(true)}
        />
        
        <div className="dashboard-content">
          <RoomHistory room={rooms} onDeleteRoom={handleDeleteRoom} />
          <Notifications />
        </div>
      </div>

      {isCreateRoomModalOpen && (
        <CreateRoomModal
          isOpen={isCreateRoomModalOpen}
          onCreate={handleCreateRoom}
          onClose={() => setIsCreateRoomModalOpen(false)}
        />
      )}

      {isJoinRoomModalOpen && (
        <JoinRoomModal
          isOpen={isJoinRoomModalOpen}
          onJoin={handleJoinRoom}
          onClose={() => setIsJoinRoomModalOpen(false)}
        />
      )}
    </main>
  );
}

export default Dashboard;