import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"

import TextFieldGroup from "../common/TextFieldGroup"
import { createProfile } from "../../actions/profileActions"

class CreateDoctorProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			handle: "",
			name: "",
			dob: "",
			phone: "",
			hospital: "",
			door: "",
			street: "",
			landmark: "",
			city: "",
			pincode: "",
			errors: {},
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	onSubmit(e) {
		e.preventDefault()

		const profileData = {
			handle: this.state.handle,
			name: this.state.name,
			dob: this.state.dob,
			phone: this.state.phone,
			hospital: this.state.hospital,
			door: this.state.door,
			street: this.state.street,
			landmark: this.state.landmark,
			city: this.state.city,
			pincode: this.state.pincode,
		}
		const { useras } = this.props.auth.user
		this.props.createProfile(profileData, useras, this.props.history)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		const { errors } = this.state

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<div className="create-edit-head">
								<Link to="/dashboard">
									<i className="fa fa-arrow-left"></i>
								</Link>
								<h4 className="text-center mb-3">Create Your Profile</h4>
							</div>
							<p className="lead text-muted text-center mb-3">
								Add your information to complete your profile
							</p>
							<div className="special-card container">
								<small className="d-block pb-3 mt-2" style={{ color: "red" }}>
									* required fields
								</small>
								<form onSubmit={this.onSubmit}>
									<TextFieldGroup
										placeholder="* Profile Handle"
										name="handle"
										value={this.state.handle}
										onChange={this.onChange}
										error={errors.handle}
										info="A unique handle for your profile URL. Your full name, company name, nickname"
									/>
									<TextFieldGroup
										placeholder="* Name"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextFieldGroup
										placeholder="* dd/mm/yyyy"
										name="dob"
										value={this.state.dob}
										onChange={this.onChange}
										error={errors.dob}
									/>
									<TextFieldGroup
										placeholder="* Contact Number"
										name="phone"
										value={this.state.phone}
										onChange={this.onChange}
										error={errors.phone}
									/>
									<TextFieldGroup
										placeholder="* Hospital name"
										name="hospital"
										value={this.state.hospital}
										onChange={this.onChange}
										error={errors.hospital}
									/>
									<TextFieldGroup
										placeholder="* Door No or Flat/Apartment name"
										name="door"
										value={this.state.door}
										onChange={this.onChange}
										error={errors.door}
									/>
									<TextFieldGroup
										placeholder="* Street name"
										name="street"
										value={this.state.street}
										onChange={this.onChange}
										error={errors.street}
									/>
									<TextFieldGroup
										placeholder="* Landmark Name"
										name="landmark"
										value={this.state.landmark}
										onChange={this.onChange}
										error={errors.landmark}
									/>
									<TextFieldGroup
										placeholder="* City or Town name"
										name="city"
										value={this.state.city}
										onChange={this.onChange}
										error={errors.city}
									/>
									<TextFieldGroup
										placeholder="* Pincode"
										name="pincode"
										value={this.state.pincode}
										onChange={this.onChange}
										error={errors.pincode}
									/>
									<input
										type="submit"
										value="Submit"
										className="btn btn-info btn-block mt-4 mb-4"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateDoctorProfile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(
	withRouter(CreateDoctorProfile)
)
