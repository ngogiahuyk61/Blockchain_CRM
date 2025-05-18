import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeCalls: 0,
    onlineAgents: 0,
    openTickets: 0,
    totalCustomers: 0
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/stats`);
      setStats(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được số liệu tổng quan.");
    }
  };

  return (
    <div className="dashboard">
      <h3>Dashboard Tổng Quan</h3>
      {error && <div className="error">{error}</div>}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.activeCalls}</div>
          <div className="stat-label">Cuộc gọi đang diễn ra</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.onlineAgents}</div>
          <div className="stat-label">Agent online</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.openTickets}</div>
          <div className="stat-label">Tickets mở</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalCustomers}</div>
          <div className="stat-label">Tổng khách hàng</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
