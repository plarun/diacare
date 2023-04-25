import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import ProfilePatient from "./ProfilePatient";
import ProfileDoctor from "./ProfileDoctor";

class Profile extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { auth } = this.props;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          {auth.user.useras === "patient" ? (
            <ProfilePatient />
          ) : (
            <ProfileDoctor />
          )}
        </div>
      );
    }

    return <div className="profile">{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Profile));
