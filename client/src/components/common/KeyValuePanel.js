import React from "react";
import PropTypes from "prop-types";

const KeyValuePanel = ({ title, items }) => {
  const List = ({ items }) => (
    <ul className="list-group list-group-flush">
      {items.map((item, i) => (
        <li key={i} className="list-group-item">
          <div className="row">
            <div className="col-6">
              <span>{item.key}</span>
            </div>
            <div className="col-6">
              <span>{item.value}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card special-card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <List items={items} />
      </div>
    </div>
  );
};

KeyValuePanel.propTypes = {
  items: PropTypes.object.isRequired,
};

export default KeyValuePanel;
