const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      "mongodb://127.0.0.1:27017/tvet_skill_matcher";

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("⚠️ MongoDB not available - running in demo mode");
    console.log("🔧 To use full features, install MongoDB and update .env");
    // Don't throw error, allow server to start in demo mode
  }
};

module.exports = connectDB;