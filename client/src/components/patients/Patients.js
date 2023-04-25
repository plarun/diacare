import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getMyPatients, getCurrentProfile } from "../../actions/profileActions";

console.log("patients");

class Patients extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(this.props.auth.user.useras);
    console.log(this.props);
  }
  componentDidUpdate(prevProps) {
    const { profile } = this.props.profile;
    if (prevProps.profile.profile !== profile) {
      if (profile) {
        console.log(profile);
        console.log(profile.handle);
        this.props.getMyPatients(profile.handle);
      }
    }
  }

  render() {
    console.log(this.props);
    const { patients, profile, loading } = this.props.profile;

    let profileItems;
    if (profile === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (patients !== null && patients.length !== 0) {
        profileItems = patients.map((profile) => (
          <ProfileItem key={profile._id} patient={profile} />
        ));
      } else {
        profileItems = (
          <p className="text-muted text-center special-card p-3">No patients</p>
        );
      }
    }

    return (
      <div className="patients">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-xl-8 m-auto">
              <h4 className="text-center mb-4">My Patients</h4>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Patients.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getMyPatients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  patients: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  patients: state.profiles,
});

export default connect(mapStateToProps, {
  getMyPatients,
  getCurrentProfile,
})(Patients);
