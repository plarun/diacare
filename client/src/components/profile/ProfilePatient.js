import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
	isValidUser,
	requestDoctor,
	getCurrentProfile,
} from "../../actions/profileActions"
import SmallInputField from "../common/SmallInputField"

class ProfilePatient extends Component {
	constructor(props) {
		super(props)
		this.state = {
			handle: "",
			name: "",
			dob: "",
			phone: "",
			bloodgroup: "",
			door: "",
			street: "",
			landmark: "",
			city: "",
			pincode: "",
			doctor: "",
			subscription: "none",
		}
		this.onClick = this.onClick.bind(this)
		this.onChange = this.onChange.bind(this)
		this.btnStatus = this.btnStatus.bind(this)
	}

	componentDidMount() {
		console.log("didMount")
		const { profile } = this.props.profile

		// Set component fields state
		this.setState({
			handle: profile.handle,
			name: profile.name,
			dob: profile.dob,
			phone: profile.phone,
			bloodgroup: profile.bloodgroup,
			door: profile.address.door,
			street: profile.address.street,
			landmark: profile.address.landmark,
			city: profile.address.city,
			pincode: profile.address.pincode,
			medicines: profile.medicines.join(","),
			doctor: profile.doctor,
			subscription: profile.subscription,
		})
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log(this.props, nextProps)
	// 	if (
	// 		nextProps.profile.profile &&
	// 		nextProps.profile.profile.subscription !== this.state.subscription
	// 	) {
	// 		this.setState({
	// 			subscription: nextProps.profile.profile.notifications.subscription,
	// 		})
	// 	}
	// 	if (
	// 		nextProps.profile.profile &&
	// 		nextProps.profile.profile.doctor !== this.state.doctor
	// 	) {
	// 		this.setState({
	// 			doctor: nextProps.profile.profile.doctor,
	// 		})
	// 	}
	// }

	onClick(e) {
		e.preventDefault()
		let { subscription } = this.state
		if (subscription !== "wait") {
			const { doctor } = this.state
			const { _id, handle } = this.props.profile.profile
			const doctorProfile = this.props.isValidUser("doctor", doctor)
			doctorProfile.then((res) => {
				let isValidUser = res.data.isValid
				console.log(res)
				console.log(this.props)
				if (isValidUser === false) {
					this.setState({ doctor: "" })
					alert("User not found!")
					return
				}
				if (subscription === "none") {
					this.props.requestDoctor(doctor, _id, handle, "subscribe")
					this.props.getCurrentProfile("doctor")
				} else if (subscription === "done") {
					this.props.requestDoctor(doctor, _id, handle, "unsubscribe")
				}
			})
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}
	btnStatus() {
		let data = {
			color: "",
			label: "",
		}
		switch (this.state.subscription) {
			case "none":
				data.color = "success"
				data.label = "Subscribe"
				return data
			case "wait":
				data.color = "warning"
				data.label = "Waiting"
				return data
			case "done":
				data.color = "danger"
				data.label = "Unsubscribe"
				return data
			default:
				return
		}
	}
	render() {
		console.log(this.state, this.props)
		return (
			<div className="special-card">
				<table className="table">
					<tbody>
						<tr>
							<td>Handle</td>
							<td>{this.state.handle}</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>{this.state.name}</td>
						</tr>
						<tr>
							<td>Dob</td>
							<td>{this.state.dob}</td>
						</tr>
						<tr>
							<td>Phone</td>
							<td>{this.state.phone}</td>
						</tr>
						<tr>
							<td>Blood Group</td>
							<td>{this.state.bloodgroup}</td>
						</tr>
						<tr>
							<td>Door</td>
							<td>{this.state.door}</td>
						</tr>
						<tr>
							<td>Street</td>
							<td>{this.state.street}</td>
						</tr>
						<tr>
							<td>Landmark</td>
							<td>{this.state.landmark}</td>
						</tr>
						<tr>
							<td>City</td>
							<td>{this.state.city}</td>
						</tr>
						<tr>
							<td>Pincode</td>
							<td>{this.state.pincode}</td>
						</tr>
						<tr>
							<td>Medicines</td>
							<td>{this.state.medicines}</td>
						</tr>
						<tr>
							<td>
								{this.state.subscription === "none" ? (
									<SmallInputField
										name="doctor"
										placeholder="doctor handle"
										value={this.state.doctor}
										onChange={this.onChange}
									/>
								) : (
									<>{this.state.doctor}</>
								)}
							</td>
							<td>
								<button
									type="button"
									className={`btn btn-outline-${this.btnStatus().color}`}
									onClick={this.onClick}
								>
									{this.btnStatus().label}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

ProfilePatient.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	isValidUser: PropTypes.func.isRequired,
	requestDoctor: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, {
	isValidUser,
	requestDoctor,
	getCurrentProfile,
})(withRouter(ProfilePatient))
