// 

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4002",
    methods: ["GET", "POST"],
  },
});

// userId -> array of socketIds (support multiple tabs)
const users = {};

// helper
export const getReceiverSocketId = (receiverId) => users[receiverId] || [];

// connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  // save socket in array
  if (!users[userId]) users[userId] = [];
  users[userId].push(socket.id);

  console.log("User connected:", userId, socket.id);
  io.emit("getOnlineUsers", Object.keys(users));

  // handle sending messages
  socket.on("sendMessage", ({ receiverId, text, conversationId }) => {
    const receiverSockets = users[receiverId] || [];
    receiverSockets.forEach((socketId) => {
      io.to(socketId).emit("receiveMessage", {
        text,
        senderId: userId,
        conversationId,
      });
    });
    console.log(`Message from ${userId} to ${receiverId}: ${text}`);
  });

  // handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (users[userId]) {
      users[userId] = users[userId].filter((id) => id !== socket.id);
      if (users[userId].length === 0) delete users[userId];
    }
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
