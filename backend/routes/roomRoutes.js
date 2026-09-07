import express from "express";
const router = express.Router();

import {
    createRoom,
    getRooms,
    joinRoom,
    getRoom,
    deleteRoom,
    updateRoomFiles
} from "../controllers/roomController.js";

router.post("/", createRoom);

router.get("/", getRooms);

router.post("/join", joinRoom);

router.get("/:roomCode", getRoom);

router.put("/:roomCode/files", updateRoomFiles);

router.delete("/:roomCode", deleteRoom);

export default router;