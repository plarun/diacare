import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1
                  className="mb-4"
                  // style={{ color: "rgb(225, 225, 225)" }}
                >
                  Control Diabetes
                </h1>
                <p
                  className="lead text-center"
                  style={{ color: "rgba(204, 208, 209, 0.9)" }}
                >
                  {" "}
                  Connecting Doctors and Diabetes Patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
