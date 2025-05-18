import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Monitoring.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Monitoring = () => {
  const [stats, setStats] = useState({
    activeCalls: 0,
    onlineAgents: 0
  });
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState("");

  // Fetch stats & active calls
  const fetchData = async () => {
    try {
      const [statsRes, callsRes] = await Promise.all([
        axios.get(`${API_URL}/stats`),
        axios.get(`${API_URL}/active-calls`)
      ]);
      setStats(statsRes.data);
      setCalls(callsRes.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không lấy được dữ liệu giám sát.");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh mỗi 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="monitoring">
      <h3>Giám sát - Quản lý</h3>
      {error && <div className="error">{error}</div>}

      <div className="stats">
        <div className="stat-card">
          <div className="value">{stats.activeCalls}</div>
          <div className="label">Cuộc gọi đang diễn ra</div>
        </div>
        <div className="stat-card">
          <div className="value">{stats.onlineAgents}</div>
          <div className="label">Agent online</div>
        </div>
      </div>

      <div className="calls-list">
        <h4>Danh sách cuộc gọi</h4>
        {calls.length === 0 ? (
          <p>Không có cuộc gọi nào.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID cuộc gọi</th>
                <th>Agent</th>
                <th>Khách hàng</th>
                <th>Thời gian bắt đầu</th>
              </tr>
            </thead>
            <tbody>
              {calls.map(c => (
                <tr key={c.callId}>
                  <td>{c.callId}</td>
                  <td>{c.agentName}</td>
                  <td>{c.customerName}</td>
                  <td>{new Date(c.startedAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
