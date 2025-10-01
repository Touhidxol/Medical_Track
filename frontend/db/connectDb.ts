// db/connectDb.ts
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("⚡ Already connected to MongoDB");
      return;
    }

    const conn = await mongoose.connect("mongodb://localhost:27017/MediChat");
    console.log(`✅ MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
