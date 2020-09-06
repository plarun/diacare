import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"

class ProfilePopper extends Component {
	render() {
		const { patientProfile } = this.props

		const content = [
			["Handle", "handle"],
			["Age", "age"],
			["Blood Group", "bloodgroup"],
			["City", "city"],
			["Medicines", "medicines"]
		]

		console.log(patientProfile)

		let profileContent
		if (patientProfile) {
			profileContent = content.map(item => (
				<tr key={item[0]}>
					<td>{item[0]}</td>
					<td>
						{item[1] === "city"
							? patientProfile.address[item[1]]
							: item[1] === "medicines"
							? patientProfile[item[1]].join(",")
							: patientProfile[item[1]]}
					</td>
				</tr>
			))
		}

		return (
			<div>
				<table className="table">
					<tbody>{profileContent}</tbody>
				</table>
			</div>
		)
	}
}

ProfilePopper.propTypes = {
	patientProfile: PropTypes.object.isRequired
}

export default withRouter(ProfilePopper)
