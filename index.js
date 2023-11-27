const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const applicantRoutes = require("./Routes/routes"); // Import the new route
const app = express();

dotenv.config({ path: "./.env" });

const connect = async () => {
  try {
    console.log("MONGO_DB value:", process.env.MONGO_DB);
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

// Express Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", applicantRoutes); // Use the new route for applicants


// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Landing Page Route
app.get("/", (req, res) => {
  res.status(201).json({
    message: "Landing page!!",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running. Listening on port ${PORT}`);
});
