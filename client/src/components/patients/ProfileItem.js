import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class ProfileItem extends Component {
	render() {
		console.log(this.props)
		const { patient } = this.props

		return (
			<div className="profilePanel special-card">
				<div>{patient.handle}</div>
				<div>{patient.address.city}</div>
				<Link
					to={{
						pathname: `/patient/${patient.handle}`,
						from: { name: "patients" }
					}}
				>
					<i className="fas fa-user"></i>
				</Link>
			</div>
		)
	}
}

export default withRouter(ProfileItem)
