import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import KeyValuePanel from "../common/KeyValuePanel";

class ProfilePopper extends Component {
  render() {
    const { patientProfile } = this.props;

    let personalInfo = null;
    let addressInfo = null;

    if (patientProfile) {
      let personalItems = [
        { key: "Handle", value: patientProfile.handle },
        { key: "Date Of Birth", value: patientProfile.dob },
        { key: "Phone", value: patientProfile.phone },
        { key: "Medicines", value: patientProfile.medicines },
      ];
      personalInfo = (
        <KeyValuePanel title="Personal Info" items={personalItems} />
      );

      let addressItems = [
        { key: "Door No", value: patientProfile.address.door },
        { key: "Street Name", value: patientProfile.address.street },
        { key: "Landmark", value: patientProfile.address.landmark },
        { key: "City", value: patientProfile.address.city },
        { key: "Pincode", value: patientProfile.address.pincode },
      ];
      addressInfo = <KeyValuePanel title="Address" items={addressItems} />;
    }

    return (
      <div>
        {personalInfo}
        <br />
        {addressInfo}
      </div>
    );
  }
}

ProfilePopper.propTypes = {
  patientProfile: PropTypes.object.isRequired,
};

export default withRouter(ProfilePopper);
