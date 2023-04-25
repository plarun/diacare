import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const RequestPanel = ({ item, onAccept, onReject }) => {
  console.log(onAccept, onReject);
  return (
    <li className="list-item">
      <div className="special-card row p-3">
        <div className="col-2">
          <Link to={`/preProfile/${item.handle}`} className="col-2">
            <i className="fas fa-user" style={{ color: "#b0c9e6" }}></i>
          </Link>
        </div>
        <div className="col-8">{item.handle}</div>
        <div className="icon col-1" onClick={onAccept}>
          <i className="fa fa-check" style={{ color: "#35c335" }} />
        </div>
        <div className="icon col-1" onClick={onReject}>
          <i className="fa fa-times" style={{ color: "#dc3545" }} />
        </div>
      </div>
    </li>
  );
};

RequestPanel.propTypes = {
  item: PropTypes.object.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default withRouter(RequestPanel);
