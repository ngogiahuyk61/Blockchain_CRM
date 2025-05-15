
// app.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Mount API routes như trước
app.use(express.json());
const contactRoutes = require('./routes/contactRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
app.use('/api/contacts', contactRoutes);
app.use('/api/tickets',  ticketRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch((err) => console.error('Kết nối MongoDB thất bại:', err));

// Thiết lập Socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*' }
});

const Ticket = require('./models/ticketModel');

io.on('connection', socket => {
  console.log(`Client ${socket.id} kết nối`);

  // Lắng nghe sự kiện chatEnd
  socket.on('chatEnd', async data => {
    // data = { contactId, initiator, transcript }
    try {
      const { contactId, initiator, transcript } = data;

      // Tạo ticket tự động
      const ticket = await Ticket.create({
        contact: contactId,
        subject: `Chat kết thúc bởi ${initiator}`,
        description: `Transcript:\n${transcript}`
      });

      // Gửi lại ticket info cho client nếu cần
      socket.emit('ticketCreated', ticket);
      console.log(`Tạo ticket ${ticket._id} từ chatEnd`);
    } catch (err) {
      console.error('Lỗi khi tạo ticket từ chatEnd:', err);
      socket.emit('error', { message: err.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} ngắt kết nối`);
  });
});

// Khởi động server qua HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server và Socket.io chạy trên cổng ${PORT}`);
});
