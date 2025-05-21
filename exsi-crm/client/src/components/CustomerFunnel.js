import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerFunnel.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const CustomerFunnel = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFunnel();
  }, []);

  const fetchFunnel = async () => {
    try {
      const res = await axios.get(`${API_URL}/funnel`);
      setStages(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được dữ liệu phễu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-funnel">
      <h3>Phễu chăm sóc khách hàng</h3>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Đang tải...</p>
      ) : stages.length === 0 ? (
        <p>Không có giai đoạn nào.</p>
      ) : (
        <ul className="funnel-list">
          {stages.map(stage => (
            <li key={stage.id} className="funnel-item">
              <div className="stage-name">{stage.name}</div>
              <div className="stage-count">{stage.count} khách</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerFunnel;
