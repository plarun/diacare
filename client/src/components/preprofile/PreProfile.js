import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

import KeyValuePanel from "../common/KeyValuePanel";

class PreProfile extends Component {
  constructor() {
    super();
    this.state = {
      patientProfile: {},
    };
  }
  componentDidMount() {
    if (this.props.match.params) {
      this.props
        .getProfileByHandle("patient", this.props.match.params.handle)
        .then((res) => {
          console.log(res);
          this.setState({
            patientProfile: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { patientProfile } = this.state;
    console.log("patentprofile: ", patientProfile);
    let preProfile;

    if (Object.keys(patientProfile).length !== 0) {
      let personalItems = [
        { key: "Handle", value: patientProfile.handle },
        { key: "Name", value: patientProfile.name },
        { key: "Date Of Birth", value: patientProfile.dob },
        { key: "Phone", value: patientProfile.phone },
        { key: "Medicines", value: patientProfile.medicines },
      ];
      const PrimaryPanel = (
        <KeyValuePanel title="Personal Info" items={personalItems} />
      );

      let addressItems = [
        { key: "Door No", value: patientProfile.address.door },
        { key: "Street Name", value: patientProfile.address.street },
        { key: "Landmark", value: patientProfile.address.landmark },
        { key: "City", value: patientProfile.address.city },
        { key: "Pincode", value: patientProfile.address.pincode },
      ];
      const AddressPanel = (
        <KeyValuePanel title="Address" items={addressItems} />
      );

      preProfile = (
        <div>
          <div className="create-edit-head">
            <Link to="/notifications">
              <i className="fa fa-arrow-left"></i>
            </Link>
            <h4 className="text-center mb-3">{"Name"}</h4>
          </div>
          {PrimaryPanel}
          <br />
          {AddressPanel}
          <br />
        </div>
      );
    } else {
      preProfile = <Spinner />;
    }

    return <div className="mb-2">{preProfile}</div>;
  }
}

PreProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  patientProfile: PropTypes.object,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfileByHandle,
})(withRouter(PreProfile));
