// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

// Import Components

import ContactList from "./components/ContactList";
import TicketList from "./components/TicketList";
import ChatWindow from "./components/ChatWindow";
import Monitoring from "./components/Monitoring";
import IVR from "./components/IVR";
import CustomerManagement from "./components/CustomerManagement";
import MusicOnHold from "./components/MusicOnHold";
import CustomerFunnel from "./components/CustomerFunnel";
import CallDistribution from "./components/CallDistribution";
import CallRecording from "./components/CallRecording";
import InternalCalls from "./components/InternalCalls";
import AudioFileGeneration from "./components/AudioFileGeneration";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>EXSI CRM - Quản lý khách hàng toàn diện</h1>
        </header>

        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <h2>Menu</h2>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/monitoring">Giám sát - Quản lý</Link>
              </li>
              <li>
                <Link to="/ivr">Trả lời tự động (IVR)</Link>
              </li>
              <li>
                <Link to="/customers">Quản lý khách hàng</Link>
              </li>
              <li>
                <Link to="/music-on-hold">Nhạc chờ doanh nghiệp</Link>
              </li>
              <li>
                <Link to="/funnel">Phễu chăm sóc khách hàng</Link>
              </li>
              <li>
                <Link to="/distribution">Phân phối cuộc gọi</Link>
              </li>
              <li>
                <Link to="/trunk">Kết nối đầu số</Link>
              </li>
              <li>
                <Link to="/internal-calls">Gọi nội bộ miễn phí</Link>
              </li>
              <li>
                <Link to="/recording">Tạo file ghi âm tự động</Link>
              </li>
              <li>
                <Link to="/notifications">Thông báo</Link>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/ivr" element={<IVR />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/music-on-hold" element={<MusicOnHold />} />
              <Route path="/funnel" element={<CustomerFunnel />} />
              <Route path="/distribution" element={<CallDistribution />} />
              <Route path="/trunk" element={<ContactList />} />
              <Route path="/internal-calls" element={<InternalCalls />} />
              <Route path="/recording" element={<AudioFileGeneration />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/tickets" element={<TicketList />} />
            </Routes>

            {/* Chat Window */}
            <ChatWindow />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
