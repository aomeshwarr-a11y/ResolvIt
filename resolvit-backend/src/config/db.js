import mongoose from "mongoose";

export async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("Missing MongoDB connection string (MONGODB_URI)");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
}

