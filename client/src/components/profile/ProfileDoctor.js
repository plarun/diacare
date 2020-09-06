import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class ProfileDoctor extends Component {
	render() {
		const { profile } = this.props.profile

		return (
			<div className="special-card">
				<table className="table">
					<tbody>
						<tr>
							<td>Handle</td>
							<td>{profile.handle}</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>{profile.name}</td>
						</tr>
						<tr>
							<td>Dob</td>
							<td>{profile.dob}</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>{profile.phone}</td>
						</tr>
						<tr>
							<td>Hospital</td>
							<td>{profile.hospital}</td>
						</tr>
						<tr>
							<td>Door</td>
							<td>{profile.address.door}</td>
						</tr>
						<tr>
							<td>Street</td>
							<td>{profile.address.street}</td>
						</tr>
						<tr>
							<td>Landmark</td>
							<td>{profile.address.landmark}</td>
						</tr>
						<tr>
							<td>City</td>
							<td>{profile.address.city}</td>
						</tr>
						<tr>
							<td>Pincode</td>
							<td>{profile.address.pincode}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

ProfileDoctor.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, {})(withRouter(ProfileDoctor))
