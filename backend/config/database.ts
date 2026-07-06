import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=> {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is missing");
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};