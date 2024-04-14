const mongoose = require("mongoose");
require("dotenv").config();

// Define the mongoDB connection url
const mongoURL =
  "mongodb+srv://abhishewale100:dq0RU1PKshJCmXyd@cluster0.roxrsu6.mongodb.net/hotels?retryWrites=true&w=majority&appName=Cluster0";

// Setup mongodb connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection err:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;

// dq0RU1PKshJCmXyd
