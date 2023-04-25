import React from "react";
import PropTypes from "prop-types";

const MessagePanel = ({ item, onRemove }) => {
  return (
    <li className="list-item special-card">
      <div className="notification mb-1">
        <div className="n-header">
          <div className="n-date">{item.date}</div>
          <div className="n-patient">{item.patient}</div>
          <div className="n-close" onClick={onRemove}>
            <i className="fas fa-times" style={{ color: "#e75967" }}></i>
          </div>
        </div>
        <div className="n-body">
          <div className="n-message">{item.message}</div>
        </div>
      </div>
    </li>
  );
};

MessagePanel.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessagePanel;
