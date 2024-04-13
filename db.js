const mongoose = require("mongoose");
require("dotenv").config();

// Define the mongoDB connection url
const mongoURL = "mongodb://localhost:27017/hotels"; // Use the mongoURL variable directly

// Setup mongodb connection
mongoose.connect(
  mongoURL
  //    {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
);

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
