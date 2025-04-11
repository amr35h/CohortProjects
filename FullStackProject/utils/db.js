import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Error Connecting to Database", err);
    });
};

export default db;
