import mongoose from "mongoose";

console.log(process.env.MONGODB_URI);

let isConnected = false;

// Connect to database
export const connectToDB = async () => {
  // Make strict query available
  mongoose.set({
    strictQuery: true,
  });

  if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");

  // Check if already connected
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error; // Rethrow the error if needed
  }
};
