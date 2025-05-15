import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

const ChatWindow = ({ contactId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Đã kết nối socket:', socket.id);
    });

    socket.on('ticketCreated', (data) => {
      setTicket(data);
    });

    return () => {
      socket.off('ticketCreated');
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'Bạn', text: input }]);
    setInput('');
  };

  const handleEndChat = () => {
    const transcript = messages.map((msg) => `${msg.sender}: ${msg.text}`).join('\n');
    socket.emit('chatEnd', {
      contactId,
      initiator: 'customer',
      transcript,
    });
  };

  return (
    <div>
      <h2>Trò chuyện</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Nhập tin nhắn..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Gửi</button>
      <button onClick={handleEndChat}>Kết thúc trò chuyện</button>
      {ticket && (
        <div>
          <h3>Phiếu hỗ trợ đã tạo:</h3>
          <p>Chủ đề: {ticket.subject}</p>
          <p>Mô tả: {ticket.description}</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
