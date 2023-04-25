import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ChartInput from "./ChartInput";
import ChartTable from "./ChartTable";
import { getCurrentProfile } from "../../actions/profileActions";

class Chart extends Component {
  componentDidMount() {
    const { useras } = this.props.auth.user;
    this.props.getCurrentProfile(useras);
  }
  render() {
    console.log(this.props);

    return (
      <div className="chart">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xl-8 m-auto">
            <h4 className="text-center mb-3">Blood Glucose Tracker</h4>
            <div>
              <ChartInput />
              <ChartTable patientProfile={this.props.profile} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  withRouter(Chart)
);
