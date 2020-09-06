import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import SmallInputField from "../common/SmallInputField"
import { addGlucoseData, getCurrentProfile } from "../../actions/profileActions"

console.log("chart input")
class ChartInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// date: new Date().toISOString().slice(0, 10),
			fasting: "",
			morning: "",
			afternoon: "",
			night: "",
			errors: {},
		}

		this.onChange = this.onChange.bind(this)
		this.onClick = this.onClick.bind(this)
	}
	componentDidMount() {
		const { useras } = this.props.auth.user
		this.props.getCurrentProfile(useras)
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	onClick(e) {
		e.preventDefault()

		const glucoseData = {
			fasting: this.state.fasting,
			morning: this.state.morning,
			afternoon: this.state.afternoon,
			night: this.state.night,
		}

		console.log(glucoseData)
		if (this.props.profile.profile) {
			const { handle } = this.props.profile.profile
			this.props.addGlucoseData(handle, glucoseData, this.props.history)
			const { useras } = this.props.auth.user
			this.props.getCurrentProfile(useras)
		}

		this.setState({ fasting: "", morning: "", afternoon: "", night: "" })
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		console.log(this.props)
		return (
			<div className="input-group special-card mb-3">
				<SmallInputField
					placeholder="Fasting"
					name="fasting"
					value={this.state.fasting}
					onChange={this.onChange}
				/>
				<SmallInputField
					placeholder="Morn"
					name="morning"
					value={this.state.morning}
					onChange={this.onChange}
				/>
				<SmallInputField
					placeholder="Noon"
					name="afternoon"
					value={this.state.afternoon}
					onChange={this.onChange}
				/>
				<SmallInputField
					placeholder="Night"
					name="night"
					value={this.state.night}
					onChange={this.onChange}
				/>
				<div className="input-group-append" onClick={this.onClick}>
					<button className="btn btn-info">
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
		)
	}
}

ChartInput.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	addGlucoseData: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { addGlucoseData, getCurrentProfile })(
	withRouter(ChartInput)
)
