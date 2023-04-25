import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class ChartTable extends Component {
  render() {
    console.log(this.props);
    const { patientProfile } = this.props;
    const { useras } = this.props.auth.user;
    const { profile } = this.props.profile;

    const patient = useras === "patient" ? profile : patientProfile;

    const ChartHeader = (
      <li className="list-group-item" key={"header"}>
        <div className="row">
          <div className="col-4">Date</div>
          <div className="col-2">Fasting</div>
          <div className="col-2">Morn</div>
          <div className="col-2">Noon</div>
          <div className="col-2">Night</div>
        </div>
      </li>
    );
    let chartItems;
    if (patient === null) {
      chartItems = <Spinner />;
    } else {
      if (patient.chart && patient.chart.length > 0) {
        chartItems = patient.chart.map((item) => (
          <li className="list-group-item" key={item.date}>
            <div className="row">
              <div className="col-4">{item.date}</div>
              <div className="col-2">{item.fasting}</div>
              <div className="col-2">{item.morning}</div>
              <div className="col-2">{item.afternoon}</div>
              <div className="col-2">{item.night}</div>
            </div>
          </li>
        ));
      } else {
        chartItems = (
          <li className="list-group-item">
            <p className="text-center text-muted mt-2">No data found</p>
          </li>
        );
      }
    }

    return (
      <div className="special-card">
        {patient === null
          ? null
          : patient.chart && patient.chart.length > 0
          ? ChartHeader
          : null}
        <ul className="list-group">{chartItems}</ul>
      </div>
    );
  }
}

ChartTable.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  patientProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(withRouter(ChartTable));
