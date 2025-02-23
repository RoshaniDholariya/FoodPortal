// const connectedUsers = {}; // Store connected users

// const handleChatSocket = (io, prisma) => {
//   io.on("connection", (socket) => {
//     console.log(`🔌 New client connected: ${socket.id}`);

//     socket.on("userConnected", (userId) => {
//       if (userId) {
//         connectedUsers[userId] = socket.id;
//         console.log(`✅ User ${userId} connected with socket ID: ${socket.id}`);
//       }
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       for (let userId in connectedUsers) {
//         if (connectedUsers[userId] === socket.id) {
//           delete connectedUsers[userId];
//           console.log(`❌ User ${userId} disconnected.`);
//         }
//       }
//     });
//   });
// };

// const sendNotification = async (io, prisma, userId, message) => {
//   try {
//     console.log(`📩 Sending notification to ${userId}: ${message}`);

    
//     const notification = await prisma.notification.create({
//       data: {
//         donorId: userId,
//         message,
//       },
//     });
//     console.log(`�� Notification sent to ${userId}: ${message}`);

//     // Send notification in real-time if the user is online
//     if (connectedUsers[userId]) {
//       console.log(connectedUsers[userId]);
//       io.to(connectedUsers[userId]).emit("receiveNotification", notification);
//     }
//   } catch (error) {
//     console.error("❌ Error sending notification:", error.message);
//   }
// };

// module.exports = { handleChatSocket, sendNotification };
// config/socket.js
// config/socket.js
let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: "http://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true
      }
    });
    
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
    
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};