import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/notifications`);
      setNotifications(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách thông báo.");
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      setError("Xóa thông báo thất bại.");
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete(`${API_URL}/notifications`);
      setNotifications([]);
    } catch (err) {
      console.error(err);
      setError("Không thể xóa tất cả thông báo.");
    }
  };

  const formatTime = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  return (
    <div className="notifications">
      <h3>Thông báo</h3>
      {error && <div className="error">{error}</div>}

      {notifications.length === 0 ? (
        <p>Không có thông báo nào.</p>
      ) : (
        <>
          <ul className="notification-list">
            {notifications.map((n) => (
              <li key={n._id} className="notification-item">
                <div className="notification-content">
                  <span className="notification-title">{n.title}</span>
                  <span className="notification-time">{formatTime(n.createdAt)}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(n._id)}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <button className="clear-all-btn" onClick={handleClearAll}>
            Xóa tất cả
          </button>
        </>
      )}
    </div>
  );
};

export default Notifications;
