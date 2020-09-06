import React, { Component } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Spinner from "../common/Spinner"

class ChartTable extends Component {
	render() {
		console.log(this.props)
		const { patientProfile } = this.props
		const { useras } = this.props.auth.user
		const { profile } = this.props.profile

		const patient = useras === "patient" ? profile : patientProfile

		const ChartHeader = (
			<div className="chartHead">
				<div className="chartItem">Date</div>
				<div className="chartItem">Fasting</div>
				<div className="chartItem">Morn</div>
				<div className="chartItem">Noon</div>
				<div className="chartItem">Night</div>
			</div>
		)
		let chartItems
		if (patient === null) {
			chartItems = <Spinner />
		} else {
			if (patient.chart && patient.chart.length > 0) {
				chartItems = patient.chart.map(item => (
					<li
						className="list"
						style={{ listStyleType: "none" }}
						key={item.date}
					>
						<div
							className="chartPanel mb-3"
							style={{ borderTop: "1px solid #e9edee" }}
						>
							<div className="chartItem">{item.date}</div>
							<div className="chartItem">{item.fasting}</div>
							<div className="chartItem">{item.morning}</div>
							<div className="chartItem">{item.afternoon}</div>
							<div className="chartItem">{item.night}</div>
						</div>
					</li>
				))
			} else {
				chartItems = (
					<p className="text-center text-muted mt-2">No data found</p>
				)
			}
		}

		return (
			<div className="special-card">
				{patient === null ? (
					<></>
				) : patient.chart && patient.chart.length > 0 ? (
					ChartHeader
				) : (
					<></>
				)}
				<ul className="list-group">{chartItems}</ul>
			</div>
		)
	}
}

ChartTable.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	patientProfile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, {})(withRouter(ChartTable))
