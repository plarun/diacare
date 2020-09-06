import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import CreatePatientProfile from "./CreatePatientProfile"
import CreateDoctorProfile from "./CreateDoctorProfile"
import { getCurrentProfile } from "../../actions/profileActions"

class CreateProfile extends Component {
	componentDidMount() {
		this.props.getCurrentProfile(this.props.auth.user.useras)
	}
	render() {
		const { auth } = this.props
		return (
			<div>
				{auth.user.useras === "patient" ? (
					<CreatePatientProfile />
				) : (
					<CreateDoctorProfile />
				)}
			</div>
		)
	}
}

CreateProfile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(CreateProfile)
