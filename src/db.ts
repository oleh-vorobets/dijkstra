import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI.replace('<password>', process.env.MONGO_PASSWORD);

mongoose.connect(mongoURI, {
    
});

export default mongoose.connection;