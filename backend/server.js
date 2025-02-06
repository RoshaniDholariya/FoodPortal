const express = require('express');
const bodyParser = require('body-parser');
const donorRoutes = require('./routes/donor.route.js');
const ngoRoutes = require("./routes/ngo.route.js");
const adminRoutes = require("./routes/admin.route.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
// const cookieParser = require(cookieParser)
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // Specify frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies (JWT)
}));
app.use(cookieParser());

// Routes
app.use('/api/donors', donorRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/api/ngo", ngoRoutes);
app.use("/admin", adminRoutes);
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
