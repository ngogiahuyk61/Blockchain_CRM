// client/src/components/Notification.js
import React from "react";
import PropTypes from "prop-types";
import "./Notification.css";

const Notification = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span className="message">{message}</span>
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

Notification.defaultProps = {
  type: "info",
  onClose: null
};

export default Notification;
