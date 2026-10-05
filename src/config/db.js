import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI,
            { serverSelectionTimeoutMS: 5000 },
        );
        console.log("MongoDB connected");
    } catch {
        console.warn("MongoDB unavailable; API is running without database access.");
        return false;
    }
}

export async function disconnectDB() {
    await mongoose.disconnect();
}