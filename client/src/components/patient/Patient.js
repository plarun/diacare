import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { getProfileByHandle } from "../../actions/profileActions"
import ProfilePopper from "./ProfilePopper"
import ChartTable from "../chart/ChartTable"
import Spinner from "../common/Spinner"

class Patient extends Component {
	constructor() {
		super()
		this.state = {
			patientProfile: {},
		}
	}
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props
				.getProfileByHandle("patient", this.props.match.params.handle)
				.then((res) => {
					this.setState({ patientProfile: res.data })
				})
				.catch((err) => console.log(err))
		}
	}
	render() {
		const { patientProfile } = this.state
		let isValid = Object.keys(patientProfile).length === 0 ? false : true
		console.log(isValid, patientProfile)
		return (
			<div>
				<div className="create-edit-head  mb-3">
					<Link to="/patients" className="mb-2">
						<i className="fa fa-arrow-left" />
					</Link>
					<h4 className="text-center">
						{isValid ? patientProfile.handle : ""}
					</h4>
					<div></div>
				</div>
				<div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
					<a
						className="nav-item nav-link active"
						id="nav-profile-tab"
						data-toggle="tab"
						role="tab"
						href="#nav-profile"
					>
						Profile
					</a>
					<a
						className="nav-item nav-link"
						id="nav-chart-tab"
						data-toggle="tab"
						role="tab"
						href="#nav-chart"
					>
						Chart
					</a>
					<a
						className="nav-item nav-link"
						id="nav-activity-tab"
						data-toggle="tab"
						role="tab"
						href="#nav-activity"
					>
						Activities
					</a>
				</div>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active special-card"
						id="nav-profile"
						role="tabpanel"
					>
						{isValid ? (
							<ProfilePopper
								patientProfile={patientProfile}
								key={patientProfile._id}
							/>
						) : (
							<Spinner />
						)}
					</div>
					<div className="tab-pane fade" id="nav-chart" role="tabpanel">
						{isValid ? (
							<ChartTable patientProfile={patientProfile} />
						) : (
							<Spinner />
						)}
					</div>
					<div
						className="tab-pane fade special-card"
						id="nav-activity"
						role="tabpanel"
					>
						<p className="text-center text-muted special-card">No activities</p>
					</div>
				</div>
			</div>
		)
	}
}

Patient.propTypes = {
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { getProfileByHandle })(
	withRouter(Patient)
)
