import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    // Join Room
    socket.on("join_room", ({ roomCode, username }) => {
      if (!roomCode) return;
      socket.join(roomCode);
      socket.currentRoom = roomCode;
      socket.username = username || "Anonymous Developer";
      console.log(`[Socket] User ${socket.username} (${socket.id}) joined room ${roomCode}`);

      // Broadcast user join to room members
      socket.to(roomCode).emit("user_joined", {
        userId: socket.id,
        username: socket.username,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    });

    // Leave Room
    socket.on("leave_room", ({ roomCode }) => {
      if (roomCode) {
        socket.leave(roomCode);
        socket.to(roomCode).emit("user_left", {
          userId: socket.id,
          username: socket.username
        });
      }
    });

    // Real-Time Code Sync
    socket.on("code_change", ({ roomCode, code, language }) => {
      if (!roomCode) return;
      // Broadcast updated code to all other participants in the room
      socket.to(roomCode).emit("code_update", {
        code,
        language,
        senderId: socket.id
      });
    });

    // Real-Time Project Multi-File Explorer Sync
    socket.on("file_tree_update", ({ roomCode, files }) => {
      if (!roomCode) return;
      socket.to(roomCode).emit("receive_file_tree", {
        files,
        senderId: socket.id
      });
    });

    socket.on("file_code_change", ({ roomCode, fileId, code, language }) => {
      if (!roomCode || !fileId) return;
      socket.to(roomCode).emit("receive_file_code_change", {
        fileId,
        code,
        language,
        senderId: socket.id
      });
    });

    // Real-Time Chat Synchronization
    socket.on("send_message", ({ roomCode, message }) => {
      if (!roomCode || !message) return;
      const payload = {
        ...message,
        id: message.id || Date.now(),
        senderId: socket.id
      };
      // Emit to everyone in the room including sender or to room
      io.to(roomCode).emit("receive_message", payload);
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
      if (socket.currentRoom) {
        socket.to(socket.currentRoom).emit("user_left", {
          userId: socket.id,
          username: socket.username
        });
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};