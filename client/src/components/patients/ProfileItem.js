import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    console.log(this.props);
    const { patient } = this.props;

    return (
      <div className="row special-card p-3">
        <Link
          to={{
            pathname: `/patient/${patient.handle}`,
            from: { name: "patients" },
          }}
          className="col-2"
        >
          <i className="fas fa-user"></i>
        </Link>
        <div className="col-5">{patient.handle}</div>
        <div className="col-5">{patient.address.city}</div>
      </div>
    );
  }
}

export default withRouter(ProfileItem);
