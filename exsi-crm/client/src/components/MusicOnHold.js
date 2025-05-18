// client/src/components/MusicOnHold.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MusicOnHold.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const MusicOnHold = () => {
  const [tracks, setTracks] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Lấy danh sách track
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const res = await axios.get(`${API_URL}/musiconhold`);
      setTracks(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Không tải được nhạc chờ.");
    }
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Vui lòng chọn file trước khi upload.");
      return;
    }
    const formData = new FormData();
    formData.append("music", file);
    try {
      await axios.post(`${API_URL}/musiconhold`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFile(null);
      setMessage("Upload thành công.");
      fetchTracks();
    } catch (err) {
      console.error(err);
      setMessage("Upload thất bại.");
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/musiconhold/${id}`);
      setMessage("Xóa thành công.");
      fetchTracks();
    } catch (err) {
      console.error(err);
      setMessage("Xóa thất bại.");
    }
  };

  return (
    <div className="music-on-hold">
      <h3>Nhạc chờ doanh nghiệp</h3>
      {message && <div className="msg">{message}</div>}

      <div className="upload-section">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="tracks-list">
        {tracks.length === 0 ? (
          <p>Chưa có track nào.</p>
        ) : (
          <ul>
            {tracks.map(t => (
              <li key={t._id} className="track-item">
                <span className="track-name">{t.originalName}</span>
                <audio controls src={`http://localhost:5000/${t.path}`} />
                <button onClick={() => handleDelete(t._id)}>Xóa</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MusicOnHold;
