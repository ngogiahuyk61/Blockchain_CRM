// app.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// Import Routes
const contactRoutes = require("./routes/customerRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const callRecordingRoutes = require("./routes/callRecordingRoutes");
const callRoutingRoutes = require("./routes/callRoutingRoutes");
const ivrRoutes = require("./routes/ivrRoutes");
const musicOnHoldRoutes = require("./routes/musicOnHoldRoutes");
const numberRoutes = require("./routes/numberRoutes");

// API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/callrecordings", callRecordingRoutes);
app.use("/api/callrouting", callRoutingRoutes);
app.use("/api/ivr", ivrRoutes);
app.use("/api/musiconhold", musicOnHoldRoutes);
app.use("/api/numbers", numberRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Kết nối MongoDB thất bại:", err));

// Thiết lập Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("📨 Message received:", data);
    io.emit("receive_message", data);
  });

  socket.on("chatEnd", async (data) => {
    try {
      const { contactId, initiator, transcript } = data;

      const ticket = await Ticket.create({
        contact: contactId,
        subject: `Chat kết thúc bởi ${initiator}`,
        description: `Transcript:\n${transcript}`,
      });

      socket.emit("ticketCreated", ticket);
    } catch (err) {
      console.error("❌ Lỗi khi tạo ticket từ chatEnd:", err.message);
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Server Listener
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server và Socket.io chạy trên cổng ${PORT}`);
});
