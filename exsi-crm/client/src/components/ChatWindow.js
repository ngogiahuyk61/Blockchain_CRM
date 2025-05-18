import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatWindow.css";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true
});

const ChatWindow = ({ contactId }) => {
  const [messages, setMessages] = useState([]);       // { sender, text, timestamp }
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Khi kết nối thành công
    socket.on("connect", () => {
      console.log("🔌 Connected as", socket.id);
    });

    // Nhận tin nhắn từ server
    socket.on("receive_message", data => {
      setMessages(prev => [...prev, { ...data, timestamp: new Date() }]);
    });

    // Nhận ticketCreated (khi chat kết thúc)
    socket.on("ticketCreated", ticket => {
      setMessages(prev => [
        ...prev,
        { sender: "system", text: `🎫 Ticket created: ${ticket._id}`, timestamp: new Date() }
      ]);
    });

    // Xử lý lỗi
    socket.on("error", err => {
      setMessages(prev => [
        ...prev,
        { sender: "system", text: `⚠️ Error: ${err.message}`, timestamp: new Date() }
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("ticketCreated");
      socket.off("error");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = { sender: "you", text: input };
    setMessages(prev => [...prev, { ...msg, timestamp: new Date() }]);
    socket.emit("send_message", msg);
    setInput("");
  };

  const handleEndChat = () => {
    if (!contactId) {
      setMessages(prev => [...prev, { sender: "system", text: "No contact selected.", timestamp: new Date() }]);
      return;
    }
    const transcript = messages.map(m => `${m.sender}: ${m.text}`).join("\n");
    socket.emit("chatEnd", { contactId, initiator: "customer", transcript });
    setMessages(prev => [...prev, { sender: "system", text: "Chat ended, creating ticket...", timestamp: new Date() }]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <button className="end-btn" onClick={handleEndChat}>End Chat</button>
      </div>
      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div key={idx} className={`message ${m.sender}`}>
            <span className="sender">{m.sender}:</span>
            <span className="text">{m.text}</span>
            <span className="time">{m.timestamp.toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
