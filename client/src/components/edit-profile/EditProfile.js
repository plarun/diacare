import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import EditPatientProfile from "./EditPatientProfile"
import EditDoctorProfile from "./EditDoctorProfile"
import { getCurrentProfile } from "../../actions/profileActions"

class EditProfile extends Component {
	componentWillMount() {
		this.props.getCurrentProfile(this.props.auth.user.useras)
	}
	render() {
		const { auth } = this.props
		return (
			<div>
				{auth.user.useras === "patient" ? (
					<EditPatientProfile />
				) : (
					<EditDoctorProfile />
				)}
			</div>
		)
	}
}

EditProfile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(
	withRouter(EditProfile)
)
