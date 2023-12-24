// db.js
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.connectionString, {});
    console.log("Connected to the MongoDB database successfully");
  } catch (err) {
    console.error("Error connecting to the MongoDB database", err);
  }
};

export default connectToDatabase;
