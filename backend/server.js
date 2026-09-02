import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db.js";
import roomRoutes from "./routes/roomRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import { initSocket } from "./sockets/roomSocket.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
 
const server = http.createServer(app);

initSocket(server);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Grubpit API Server is running');
});

app.use("/api/room", roomRoutes);
app.use("/api/problems", problemRoutes);

server.listen(port, () => {
    console.log('Server is running on port', port);
});