import Room from '../models/Room.js';
import generateRoomCode from '../utils/generateRoomCode.js';
import bcrypt from "bcrypt";

export async function createRoom(req,res){
    try{
        const { roomName, password, category, maxParticipants } = req.body;
        let roomCode=generateRoomCode();
        let existingroom=await Room.findOne({ Roomcode: roomCode });
        while(existingroom){
            roomCode=generateRoomCode();
            existingroom=await Room.findOne({ Roomcode: roomCode });
        }
        let encryptedPassword=null;
        if(password){
            encryptedPassword=await bcrypt.hash(password, 10);
        }
        const newRoom=await Room.create({
            Roomname: roomName,
            password: encryptedPassword,
            Roomcode: roomCode,
            Roomtype: category,
            maxparticipants: maxParticipants,
        });
        res.status(201).json({
            message:"Room created successfully",
            newRoom: {
                ...newRoom.toObject(),
                roomCode: newRoom.Roomcode
            }
        });
    } catch (error) {
        res.status(500).json({message:"Error creating room",error});    
    }
}

export async function getRooms(req,res){
    try{
        const rooms=await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({message:"Error fetching rooms",error});    
    }
}

export async function joinRoom(req,res){
    try{
        const {roomCode,password}=req.body;
        const room=await Room.findOne({ Roomcode: roomCode });
        if(!room){
            return res.status(404).json({message:"Room not found"});
        }
        if(room.password){
            const isPasswordValid=await bcrypt.compare(password,room.password);
            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid password"});
            }
        }
        return res.status(200).json({
            message:"Room found",
            room: {
                roomCode: room.Roomcode,
                roomName: room.Roomname,
                roomType: room.Roomtype
            }
        });
    } catch (error) {
        res.status(500).json({message:"Error joining room",error});
    }
}

export async function getRoom(req,res){
    try{
        const {roomCode}=req.params;

        const roomAvailable= await Room.findOne({ Roomcode: roomCode });

        if(roomAvailable){
            return res.status(200).json({
                success:true,
                room: roomAvailable
            });
        }

        return res.status(404).json({
            success:false,
            message:"Room not found"
        });
    }
    catch(error){
        console.error("Error in getRoom controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function deleteRoom(req, res) {
    try {
        const { roomCode } = req.params;

        const deletedRoom = await Room.findOneAndDelete({ Roomcode: roomCode });

        if (!deletedRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found or already deleted"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room deleted successfully",
            roomCode
        });
    } catch (error) {
        console.error("Error in deleteRoom controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting room."
        });
    }
}
