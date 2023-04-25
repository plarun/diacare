import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  isValidUser,
  requestDoctor,
  getCurrentProfile,
} from "../../actions/profileActions";

import KeyValuePanel from "../common/KeyValuePanel";
import SmallInputField from "../common/SmallInputField";

class ProfilePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      name: "",
      dob: "",
      phone: "",
      bloodgroup: "",
      door: "",
      street: "",
      landmark: "",
      city: "",
      pincode: "",
      doctor: "",
      subscription: "none",
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.btnStatus = this.btnStatus.bind(this);
  }

  componentDidMount() {
    console.log("didMount");
    const { profile } = this.props.profile;

    // Set component fields state
    this.setState({
      handle: profile.handle,
      name: profile.name,
      dob: profile.dob,
      phone: profile.phone,
      bloodgroup: profile.bloodgroup,
      door: profile.address.door,
      street: profile.address.street,
      landmark: profile.address.landmark,
      city: profile.address.city,
      pincode: profile.address.pincode,
      medicines: profile.medicines.join(","),
      doctor: profile.doctor,
      subscription: profile.subscription,
    });
  }

  // componentWillReceiveProps(nextProps) {
  // 	console.log(this.props, nextProps)
  // 	if (
  // 		nextProps.profile.profile &&
  // 		nextProps.profile.profile.subscription !== this.state.subscription
  // 	) {
  // 		this.setState({
  // 			subscription: nextProps.profile.profile.notifications.subscription,
  // 		})
  // 	}
  // 	if (
  // 		nextProps.profile.profile &&
  // 		nextProps.profile.profile.doctor !== this.state.doctor
  // 	) {
  // 		this.setState({
  // 			doctor: nextProps.profile.profile.doctor,
  // 		})
  // 	}
  // }

  onClick(e) {
    e.preventDefault();
    let { subscription } = this.state;
    if (subscription !== "wait") {
      const { doctor } = this.state;
      const { _id, handle } = this.props.profile.profile;
      const doctorProfile = this.props.isValidUser("doctor", doctor);

      doctorProfile.then((res) => {
        let isValidUser = res.data.isValid;
        if (isValidUser === false) {
          this.setState({ doctor: "" });
          alert("User not found!");
          return;
        }
        if (subscription === "none") {
          this.props.requestDoctor(doctor, _id, handle, "subscribe");
          this.props.getCurrentProfile("doctor");
        } else if (subscription === "done") {
          this.props.requestDoctor(doctor, _id, handle, "unsubscribe");
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  btnStatus() {
    let data = {
      color: "",
      label: "",
    };
    switch (this.state.subscription) {
      case "none":
        data.color = "success";
        data.label = "Subscribe";
        return data;
      case "wait":
        data.color = "warning";
        data.label = "Waiting";
        return data;
      case "done":
        data.color = "danger";
        data.label = "Unsubscribe";
        return data;
      default:
        return;
    }
  }

  render() {
    let personalItems = [
      { key: "Handle", value: this.state.handle },
      { key: "Name", value: this.state.name },
      { key: "Date Of Birth", value: this.state.dob },
      { key: "Phone", value: this.state.phone },
      { key: "Medicines", value: this.state.medicines },
    ];
    const PrimaryPanel = (
      <KeyValuePanel title="Personal Info" items={personalItems} />
    );

    let addressItems = [
      { key: "Door No", value: this.state.door },
      { key: "Street Name", value: this.state.street },
      { key: "Landmark", value: this.state.landmark },
      { key: "City", value: this.state.city },
      { key: "Pincode", value: this.state.pincode },
    ];
    const AddressPanel = <KeyValuePanel title="Address" items={addressItems} />;

    return (
      <div>
        {PrimaryPanel}
        <br />
        {AddressPanel}
        <br />
        <div className="card special-card">
          <div className="card-header">Doctor</div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                {this.state.subscription === "none" ? (
                  <SmallInputField
                    name="doctor"
                    placeholder="doctor handle"
                    value={this.state.doctor}
                    onChange={this.onChange}
                  />
                ) : (
                  <Fragment>{this.state.doctor}</Fragment>
                )}
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className={`btn btn-outline-${this.btnStatus().color}`}
                  onClick={this.onClick}
                >
                  {this.btnStatus().label}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePatient.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isValidUser: PropTypes.func.isRequired,
  requestDoctor: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  isValidUser,
  requestDoctor,
  getCurrentProfile,
})(withRouter(ProfilePatient));
