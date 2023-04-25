import React, { Component } from "react";
import Spinner from "../common/Spinner";
import MessagePanel from "../common/MessagePanel";

class PatientMessagePanel extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      doctorMessages: [],
    };
  }
  componentDidMount() {
    const { profile } = this.props.profile;
    if (profile) {
      this.setState({
        messages: profile.notifications.messages,
        doctorMessages: profile.notifications.doctorMessages,
      });
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  // 	// const prevNotification  = this.prevProps.profile.profile.notifications
  // 	// const { notifications } = this.props.profile.profile
  // 	// if (prevProps != this.props)
  // }
  render() {
    const { profile, loading } = this.props.profile;
    let messages;
    let doctorMessages;
    console.log(this.state);
    if (profile === null || loading) {
      messages = <Spinner />;
    } else {
      if (this.state.messages.length > 0) {
        let msg = 0;
        messages = this.state.messages.map((item) => (
          <MessagePanel key={++msg} item={item} />
        ));
      } else {
        messages = (
          <p className="text-center text-muted special-card p-2">No messages</p>
        );
      }
      if (this.state.doctorMessages.length > 0) {
        let msg = 0;
        doctorMessages = this.state.doctorMessages.map((item) => (
          <MessagePanel key={++msg} item={item} />
        ));
      } else {
        doctorMessages = (
          <p className="text-center text-muted special-card p-2">No messages</p>
        );
      }
    }
    return (
      <div>
        <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-personal-tab"
            data-toggle="tab"
            role="tab"
            href="#nav-personal"
          >
            Personal
          </a>
          <a
            className="nav-item nav-link"
            id="nav-doctor-tab"
            data-toggle="tab"
            role="tab"
            href="#nav-doctor"
          >
            Doctor
          </a>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-personal"
            role="tabpanel"
          >
            <ul className="list-group mb-2" style={{ listStyleType: "none" }}>
              {messages}
            </ul>
          </div>
          <div className="tab-pane fade" id="nav-doctor" role="tabpanel">
            <ul className="list-group mb-2" style={{ listStyleType: "none" }}>
              {doctorMessages}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientMessagePanel;
