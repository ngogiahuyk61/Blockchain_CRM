import React from 'react';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const contactId = '68260af1dd4b77b9c118d672'; // Thay thế bằng ID thực tế

  return (
    <div>
      <h1>Trang Trò Chuyện</h1>
      <ChatWindow contactId={contactId} />
    </div>
  );
};

export default ChatPage;
