import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { getCurrentProfile } from "../../actions/profileActions"

import PatientMessagePanel from "./PatientMessagePanel"
import DoctorMessagePanel from "./DoctorMessagePanel"

class Notification extends Component {
	componentDidMount() {
		const { useras } = this.props.auth.user
		this.props.getCurrentProfile(useras)
	}
	render() {
		const { profile, auth } = this.props
		console.log(this.props)

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h4 className="text-center mb-4">Notifications</h4>
							{auth.user.useras === "patient" ? (
								<PatientMessagePanel profile={profile} />
							) : (
								<DoctorMessagePanel profile={profile} />
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Notification.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(
	withRouter(Notification)
)
