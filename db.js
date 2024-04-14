const mongoose = require("mongoose");
require("dotenv").config();

// Define the mongoDB connection url
const mongoURL =
  "mongodb+srv://abhishewale100:4IMidbybrAxCibdK@cluster0.ipvsl13.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/hotels";

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
