import mongoose from "mongoose";
const URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    if (URI) {
      await mongoose.connect(URI);
      console.log("Connected to DataBase");
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
};
export default connectDB;
