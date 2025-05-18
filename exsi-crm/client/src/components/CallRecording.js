// client/src/components/CallRecording.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CallRecording.css";

const CallRecording = () => {
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState("");

  // Fetch list of recordings from server
  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/callrecordings");
      setRecordings(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách ghi âm.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/callrecordings/${id}`);
      fetchRecordings();
    } catch (err) {
      console.error(err);
      setError("Xóa ghi âm thất bại.");
    }
  };

  return (
    <div className="call-recording">
      <h3>Tạo file ghi âm tự động</h3>
      {error && <div className="error">{error}</div>}

      {recordings.length === 0 ? (
        <p>Chưa có bản ghi âm nào.</p>
      ) : (
        <table className="recordings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Audio</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((rec) => (
              <tr key={rec._id}>
                <td>{rec._id.slice(-6)}</td>
                <td>{rec.customerId}</td>
                <td>
                  <audio controls src={`http://localhost:5000/${rec.path}`} />
                </td>
                <td>{new Date(rec.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(rec._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CallRecording;
