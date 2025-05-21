import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { senderId: "User1", message });
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        {chat.map((msg, index) => (
          <p key={index}>{msg.senderId}: {msg.message}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPage;
