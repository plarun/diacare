import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import KeyValuePanel from "../common/KeyValuePanel";

class ProfileDoctor extends Component {
  render() {
    const { profile } = this.props.profile;

    console.log(profile);

    let personalItems = [
      { key: "Handle", value: profile.handle },
      { key: "Name", value: profile.name },
      { key: "Date Of Birth", value: profile.dob },
      { key: "Phone", value: profile.phone },
    ];
    const PrimaryPanel = (
      <KeyValuePanel title="Personal Info" items={personalItems} />
    );

    let addressItems = [
      { key: "Hospital", value: profile.hospital },
      { key: "Door No", value: profile.address.door },
      { key: "Street Name", value: profile.address.street },
      { key: "Landmark", value: profile.address.landmark },
      { key: "City", value: profile.address.city },
      { key: "Pincode", value: profile.address.pincode },
    ];
    const AddressPanel = <KeyValuePanel title="Address" items={addressItems} />;

    return (
      <div>
        {PrimaryPanel}
        <br />
        {AddressPanel}
        <br />
      </div>
    );
  }
}

ProfileDoctor.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(withRouter(ProfileDoctor));
