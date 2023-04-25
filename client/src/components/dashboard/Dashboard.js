import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "../profile/Profile";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(this.props.auth.user.useras);
  }

  onDeleteClick(e) {
    console.log(this.props.auth.user.useras);
    const { useras } = this.props.auth.user;
    const { _id } = this.props.profile.profile;
    this.props.deleteAccount(useras, _id);
    this.props.logoutUser();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      console.log("spinning");
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="col-md-8 m-auto">
            <div className="profile-head">
              <Link to="/edit-profile">
                <i className="fa fa-edit" />
              </Link>
              <h4 className="text-center mb-3">Profile</h4>
            </div>

            <Profile profileInfo={profile} />

            <div className="btn-bottom">
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-outline-danger"
              >
                Delete account
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="col-md-8 m-auto">
            <h2 className="text-center">Welcome</h2>
            <p className="text-muted text-center">You don't have a profile!</p>
            <div className="btn-bottom">
              <Link to="/create-profile" className="btn btn-primary">
                Create Profile
              </Link>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  logoutUser,
})(Dashboard);
