import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};

export default connectDB;
