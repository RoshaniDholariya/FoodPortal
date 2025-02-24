const express = require("express");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const { Server } = require('socket.io');
const app = express();
const prisma = new PrismaClient();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
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


const donorRoutes = require("./routes/donor.route.js");
const ngoRoutes = require("./routes/ngo.route.js");
const adminRoutes = require("./routes/admin.route.js");
const contactusRoutes = require("./routes/contactus.route.js");


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use("/api/donors", donorRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/admin", adminRoutes);
app.use("/api/ct", contactusRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app };

