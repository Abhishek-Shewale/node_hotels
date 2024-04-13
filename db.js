const mongoose = require("mongoose");

// Define the mongoDB connection url
const mongoURL = "mongodb://localhost:27017/hotels";

// Setup mongodb connection.
mongoose.connect(
  mongoURL
  //      {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //      }
);

// Get the default connection.
//  Mongoose maintains a default connection object representing the MongoDB connection.
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
