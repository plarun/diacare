import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import RequestPanel from "../common/RequestPanel";
import MessagePanel from "../common/MessagePanel";
import { responsePatient, removeMessage } from "../../actions/profileActions";

class DoctorMessagePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      requests: [],
    };
    // this.onAccept = this.onAccept.bind(this)
    // this.onReject = this.onReject.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    if (
      nextProps.profile.profile &&
      nextProps.profile.profile.notifications.messages !== this.state.messages
    ) {
      this.setState({
        messages: nextProps.profile.profile.notifications.messages,
      });
    }
    if (
      nextProps.profile.profile &&
      nextProps.profile.profile.notifications.requests !== this.state.requests
    ) {
      this.setState({
        requests: nextProps.profile.profile.notifications.requests,
      });
    }
  }

  onAccept(data, e) {
    e.preventDefault();
    const doctorHandle = this.props.profile.profile.handle;
    const patientHandle = data.handle;
    const msg_id = data._id;
    this.props.responsePatient(doctorHandle, patientHandle, msg_id, true);
  }

  onReject(data, e) {
    e.preventDefault();
    const doctorHandle = this.props.profile.profile.handle;
    const patientHandle = data.handle;
    const msg_id = data._id;
    this.props.responsePatient(doctorHandle, patientHandle, msg_id, false);
  }

  onRemove(data, e) {
    e.preventDefault();
    console.log("remove", data);
    const doctorHandle = this.props.profile.profile.handle;
    const msg_id = data._id;
    this.props.removeMessage(doctorHandle, msg_id);
  }

  render() {
    console.log("render");
    const { profile, loading } = this.props.profile;
    let messages;
    let requests;
    console.log(this.props);
    if (profile === null || loading) {
      messages = <Spinner />;
      requests = <Spinner />;
    } else {
      //	Listing all messages
      if (this.state.messages.length > 0) {
        let msg = 0;
        messages = this.state.messages.map((item) => (
          <MessagePanel
            key={++msg}
            item={item}
            onRemove={this.onRemove.bind(this, item)}
          />
        ));
      } else {
        messages = (
          <p className="text-center text-muted special-card p-2">No messages</p>
        );
      }

      //	Listing all requests
      console.log(this.state.requests);
      if (this.state.requests.length > 0) {
        let req = 0;
        requests = this.state.requests.map((item) => (
          <RequestPanel
            key={++req}
            item={item}
            onAccept={this.onAccept.bind(this, item)}
            onReject={this.onReject.bind(this, item)}
          />
        ));
      } else {
        requests = (
          <p className="text-center text-muted special-card p-2">No requests</p>
        );
      }
    }
    return (
      <div>
        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-profile-tab"
            data-toggle="tab"
            role="tab"
            href="#nav-notifications"
          >
            Messages
          </a>
          <a
            className="nav-item nav-link"
            id="nav-chart-tab"
            data-toggle="tab"
            role="tab"
            href="#nav-requests"
          >
            Requests
          </a>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-notifications"
            role="tabpanel"
          >
            <ul className="list-group mb-2" style={{ listStyleType: "none" }}>
              {messages}
            </ul>
          </div>
          <div className="tab-pane fade" id="nav-requests" role="tabpanel">
            <ul className="list-group mb-2" style={{ listStyleType: "none" }}>
              {requests}
            </ul>
          </div>
          <div
            className="tab-pane fade special-card"
            id="nav-activity"
            role="tabpanel"
          >
            {"activities"}
          </div>
        </div>
      </div>
    );
  }
}

DoctorMessagePanel.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  responsePatient: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { responsePatient, removeMessage })(
  withRouter(DoctorMessagePanel)
);
