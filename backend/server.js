// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const donorRoutes = require('./routes/donor.route.js');
// // const ngoRoutes = require("./routes/ngo.route.js");
// // const adminRoutes = require("./routes/admin.route.js");
// // const contactusRoutes = require("./routes/contactus.route.js");
// // const cors = require("cors");
// // const cookieParser = require('cookie-parser');
// // // const cookieParser = require(cookieParser)
// // require('dotenv').config();

// // const app = express();
// // app.use(express.json({ limit: '50mb' }));
// // app.use(express.urlencoded({ limit: '50mb', extended: true }));
// // app.use(bodyParser.json());
// // app.use(cors({
// //   origin: "http://localhost:5173", // Specify frontend URL
// //   methods: "GET,POST,PUT,DELETE",
// //   credentials: true, // Allow cookies (JWT)
// // }));
// // app.use(cookieParser());

// // // Routes
// // app.use('/api/donors', donorRoutes);
// // app.use("/uploads", express.static("uploads")); // Serve uploaded files
// // app.use("/api/ngo", ngoRoutes);
// // app.use("/admin", adminRoutes);
// // app.use("/api/ct", contactusRoutes);
// // // Server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// const express = require("express");
// const { createServer } = require("http");
// const socketIo = require("socket.io");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
//  // Import Prisma client
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// // Import Routes
// const donorRoutes = require("./routes/donor.route.js");
// const ngoRoutes = require("./routes/ngo.route.js");
// const adminRoutes = require("./routes/admin.route.js");
// const contactusRoutes = require("./routes/contactus.route.js");
// // const initializeSocket = require("./config/Socket.js");

// require("dotenv").config();

// const app = express();
// const httpServer = createServer(app);
// const io = socketIo(httpServer, {
//   cors: {
//     origin: "https://classplus.vercel.app",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
//   pingTimeout: 60000,
//   pingInterval: 25000,
//   transports: ["websocket", "polling"],
// });

// // Middleware
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173", // Use env variable for frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, // Allow cookies (JWT)
//   })
// );



// // Serve uploaded files
// app.use("/uploads", express.static("uploads"));

// // API Routes
// app.use("/api/donors", donorRoutes);
// app.use("/api/ngo", ngoRoutes);
// app.use("/admin", adminRoutes);
// app.use("/api/ct", contactusRoutes);

// // Initialize Socket.io for real-time notifications

// // Store connected users

// // Example: Send notification when a donor adds food


// // Default Route
// app.get("/", (req, res) => {
//   res.send("Server is running successfully ");
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);
//   res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// module.exports = { app, io };


const express = require("express");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const { Server } = require('socket.io');
// const socketConfig = require("./config/Socket.js");

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();
const httpServer = createServer(app);

// Initialize Socket.io

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});
global.io = io;

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Import Routes
const donorRoutes = require("./routes/donor.route.js");
const ngoRoutes = require("./routes/ngo.route.js");
const adminRoutes = require("./routes/admin.route.js");
const contactusRoutes = require("./routes/contactus.route.js");

// Import Notification Utils
// const { sendNotification, connectedUsers } = require("./config/Socket.js");


// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Attach io instance to requests/

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/donors", donorRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/admin", adminRoutes);
app.use("/api/ct", contactusRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export app and io
module.exports = { app };

