import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/login");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const NavbarChart = (
      <li className="nav-item">
        <Link className="nav-link" to="/chart">
          Chart
        </Link>
      </li>
    );

    const NavbarPatients = (
      <li className="nav-item">
        <Link className="nav-link" to="/patients">
          Patients
        </Link>
      </li>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {user.useras === "doctor" ? NavbarPatients : NavbarChart}
        <li className="nav-item">
          <Link className="nav-link" to="/notifications">
            Notifications
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/login"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar sticky-top navbar-expand-sm navbar-light mb-4"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="brand-logo"></div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  withRouter(Navbar)
);
