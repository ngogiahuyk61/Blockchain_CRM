import React from "react";
import ContactList from "./components/ContactList";
import TicketList from "./components/TicketList";
import ChatWindow from "./components/ChatWindow";
import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>EXSI CRM</h1>
      <div className="container">
        <div className="sidebar">
          <ContactList />
        </div>
        <div className="main-content">
          <TicketList />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
