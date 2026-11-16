import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VeewoNavbar from '../components/dashboard/VeewoNavbar';
import VeewoHero from '../components/dashboard/VeewoHero';
import QuickActions from '../components/actions/QuickActions';
import RoomHistory from '../components/history/RoomHistory';
import Notifications from '../components/notifications/Notifications';
import CreateRoomModal from '../components/createroommodal/CreateRoomModal';
import JoinRoomModal from '../components/joinroommodal/JoinRoomModal';
import './Dashboard.css';

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const navigate = useNavigate();

  async function fetchRooms() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/room`);
      const roomList = Array.isArray(response.data) ? response.data : (response.data.rooms || []);
      setRooms(roomList);
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/room`, payload);
      await fetchRooms();
      navigate(`/room/${response.data.newRoom.roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
    setIsCreateRoomModalOpen(false);
  }

  async function handleJoinRoom(RoomData) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/room/join`, RoomData);
      setIsJoinRoomModalOpen(false);
      navigate(`/room/${response.data.room.roomCode}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join room");
    }
  }

  async function handleDeleteRoom(roomCode) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/room/${roomCode}`);
      setRooms((prevRooms) => prevRooms.filter((r) => (r.Roomcode || r.roomCode) !== roomCode));
    } catch (error) {
      console.error('Error deleting room:', error);
      alert(error.response?.data?.message || 'Failed to delete room');
    }
  }

  return (
    <main className="dashboard-page veewo-style-page">
      {/* Top Safari/Browser Floating Navigation Bar */}
      <VeewoNavbar
        onIntegrateClick={() => setIsCreateRoomModalOpen(true)}
        onCreateRoomClick={() => setIsCreateRoomModalOpen(true)}
        onJoinRoomClick={() => setIsJoinRoomModalOpen(true)}
      />

      {/* Main Hero Section directly matching the uploaded screenshot */}
      <VeewoHero
        onCreateRoomClick={() => setIsCreateRoomModalOpen(true)}
        onJoinRoomClick={() => setIsJoinRoomModalOpen(true)}
      />

      {/* Workspace Quick Actions & Active Room History */}
      <div className="dashboard-container">
        <QuickActions
          onCreateRoomClick={() => setIsCreateRoomModalOpen(true)}
          onJoinRoomClick={() => setIsJoinRoomModalOpen(true)}
        />

        <div className="dashboard-content">
          <RoomHistory room={rooms} onDeleteRoom={handleDeleteRoom} />
          <Notifications />
        </div>
      </div>

      {/* Modals */}
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