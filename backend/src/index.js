import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-application-1-bjcd.onrender.com",
  "https://chat-application-5svg.onrender.com",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
import { io } from "socket.io-client";

const socket = io("https://chat-application-5svg.onrender.com", {
  withCredentials: true, // allow sending cookies
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
