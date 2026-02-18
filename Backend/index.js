import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js";
import messageRoute from "./Routes/message.route.js"
import cors from "cors";
import {app, server} from "./SocketIO/server.js"


dotenv.config();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4002", // your frontend URL
    credentials: true,
  })
);


const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URL;

// Root route
app.get("/", (req, res) => {
  res.send("Server is running fine");
});


try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
// // Connect to MongoDB and start server
// mongoose.connect(URI)
//   .then(() => {
//     console.log("MongoDB connected successfully ✅");

//     // Register routes AFTER DB is connected
//     app.use("/api/user", userRoute);
//     app.use("/api/message", messageRoute)

//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });try {
//       mongoose.connect(URI);
//       console.log("Connected to MongoDB");
//     } catch (error) {
//       console.log(error);
//     }
//   })
//   .catch((err) => {
//     console.log("MongoDB connection failed ❌", err.message);
//   });
