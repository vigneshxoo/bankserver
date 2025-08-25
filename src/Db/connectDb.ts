import mongoose from "mongoose";

const connectDB = async () => {
  let mongouri=process.env.MONGO_URI
  if(!mongouri)return console.log("mongouri missing")
    

  try {
    await mongoose.connect(mongouri as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
