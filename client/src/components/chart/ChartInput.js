import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SmallInputField from "../common/SmallInputField";
import {
  addGlucoseData,
  getCurrentProfile,
} from "../../actions/profileActions";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

console.log("chart input");
class ChartInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date().toISOString().slice(0, 10),
      label: "Fasting", // fasting, morning, afternoon, night
      level: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    const { useras } = this.props.auth.user;
    this.props.getCurrentProfile(useras);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onClick(e) {
    e.preventDefault();

    const glucoseData = {
      fasting: "",
      morning: "",
      afternoon: "",
      night: "",
      date: this.state.date,
    };

    glucoseData[this.state.label.toLowerCase()] = this.state.level;

    console.log(glucoseData);

    if (this.props.profile.profile) {
      const { handle } = this.props.profile.profile;
      this.props.addGlucoseData(handle, glucoseData, this.props.history);
      const { useras } = this.props.auth.user;
      this.props.getCurrentProfile(useras);
    }

    this.setState({ level: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setDate(dt) {
    console.log(dt.toISOString().slice(0, 10));
    this.setState({ date: dt.toISOString().slice(0, 10) });
    console.log("datepicker:", this.state.date);
  }

  setLevelLabel(label) {
    this.setState({ label: label });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={this.state.date}
              onChange={this.setDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="col-sm-12 col-md-8 col-lg-8">
          <div className="input-group mb-3 mt-3">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                {this.state.label}
              </button>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={this.setLevelLabel.bind(this, "Fasting")}
                >
                  Fasting
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.setLevelLabel.bind(this, "Morning")}
                >
                  Morning
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.setLevelLabel.bind(this, "Afternoon")}
                >
                  Afternoon
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.setLevelLabel.bind(this, "Night")}
                >
                  Night
                </a>
              </div>
            </div>

            <SmallInputField
              placeholder="Level"
              name="level"
              value={this.state.level}
              onChange={this.onChange}
            />

            <div className="input-group-append" onClick={this.onClick}>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChartInput.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addGlucoseData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addGlucoseData, getCurrentProfile })(
  withRouter(ChartInput)
);
