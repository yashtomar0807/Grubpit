import mongoose from "mongoose";

async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grubpit';
         if (!mongoURI) {
            throw new Error("MONGODB_URI is not configured");
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw error;
    }
}

export default connectDB;