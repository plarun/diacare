import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import Spinner from "../common/Spinner"
import { getProfileByHandle } from "../../actions/profileActions"

class PreProfile extends Component {
	constructor() {
		super()
		this.state = {
			patientProfile: {},
		}
	}
	componentDidMount() {
		if (this.props.match.params) {
			this.props
				.getProfileByHandle("patient", this.props.match.params.handle)
				.then((res) => {
					console.log(res)
					this.setState({
						patientProfile: res.data,
					})
				})
				.catch((err) => console.log(err))
		}
	}
	render() {
		const { patientProfile } = this.state
		console.log(this.props, this.state, patientProfile)
		let preProfile
		if (Object.keys(patientProfile).length !== 0) {
			preProfile = (
				<div>
					<div className="create-edit-head">
						<Link to="/notifications">
							<i className="fa fa-arrow-left"></i>
						</Link>
						<h4 className="text-center mb-3">{"Name"}</h4>
					</div>
					<table className="table  special-card">
						<tbody>
							<tr>
								<td>Name</td>
								<td>{patientProfile.name}</td>
							</tr>
							<tr>
								<td>Dob</td>
								<td>{patientProfile.dob}</td>
							</tr>
							<tr>
								<td>Phone</td>
								<td>{patientProfile.phone}</td>
							</tr>
							<tr>
								<td>Blood Group</td>
								<td>{patientProfile.bloodgroup}</td>
							</tr>
							<tr>
								<td>Door</td>
								<td>{patientProfile.address.door}</td>
							</tr>
							<tr>
								<td>Street</td>
								<td>{patientProfile.address.street}</td>
							</tr>
							<tr>
								<td>Landmark</td>
								<td>{patientProfile.address.landmark}</td>
							</tr>
							<tr>
								<td>City</td>
								<td>{patientProfile.address.city}</td>
							</tr>
							<tr>
								<td>Pincode</td>
								<td>{patientProfile.address.pincode}</td>
							</tr>
							<tr>
								<td>Medicines</td>
								<td>{patientProfile.medicines}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)
		} else {
			preProfile = <Spinner />
		}

		return <div className="mb-2">{preProfile}</div>
	}
}

PreProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	patientProfile: PropTypes.object,
	getProfileByHandle: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, {
	getProfileByHandle,
})(withRouter(PreProfile))
