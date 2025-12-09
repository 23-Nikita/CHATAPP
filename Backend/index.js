import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./Routes/userRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URL;

//middleware
app.use(express.json());

app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running fine");
});

// Connect to MongoDB and start server
mongoose.connect(URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    // Register routes AFTER DB is connected
    app.use("/api/user", userRoute);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed ❌", err.message);
  });
