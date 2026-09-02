import express from "express";
const router = express.Router();

import {
    createRoom,
    getRooms,
    joinRoom,
    getRoom,
    deleteRoom
} from "../controllers/roomController.js";

router.post("/", createRoom);

router.get("/", getRooms);

router.post("/join", joinRoom);

router.get("/:roomCode", getRoom);

router.delete("/:roomCode", deleteRoom);

export default router;