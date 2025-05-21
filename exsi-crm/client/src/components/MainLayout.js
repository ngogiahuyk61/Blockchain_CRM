// client/src/components/MainLayout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Header */}
      <header className="header">
        <h1>EXSI CRM</h1>
      </header>

      {/* Container gồm Sidebar và Content */}
      <div className="layout-body">
        {/* Sidebar */}
        <nav className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/monitoring">Giám sát</Link></li>
            <li><Link to="/ivr">IVR</Link></li>
            <li><Link to="/customers">Khách hàng</Link></li>
            <li><Link to="/music-on-hold">Nhạc chờ</Link></li>
            <li><Link to="/funnel">Phễu</Link></li>
            <li><Link to="/distribution">Phân phối</Link></li>
            <li><Link to="/trunk">Đầu số</Link></li>
            <li><Link to="/internal-calls">Gọi nội bộ</Link></li>
            <li><Link to="/recording">Ghi âm</Link></li>
            <li><Link to="/audio">File âm thanh</Link></li>
            <li><Link to="/notifications">Thông báo</Link></li>
            <li><Link to="/tickets">Phiếu hỗ trợ</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="content">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 EXSI CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
