import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/platform",
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