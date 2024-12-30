import mongoose from "mongoose";

const dataBaseName = 'ChatApp';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}/${dataBaseName}`, {
      writeConcern: { w: 'majority' }  // Standard write concern
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error.message);
    process.exit(1);
  }
};

export default connectDB;
