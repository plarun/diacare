import React from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"

const RequestPanel = ({ item, onAccept, onReject }) => {
	console.log(onAccept, onReject)
	return (
		<li className="list-item">
			<div className="RequestPanel special-card">
				<div>{item.handle}</div>
				<Link to={`/preProfile/${item.handle}`}>
					<i className="fas fa-user" style={{ color: "#b0c9e6" }}></i>
				</Link>
				<div className="accept" onClick={onAccept}>
					<i className="fa fa-check" style={{ color: "#35c335" }} />
				</div>
				<div className="decline" onClick={onReject}>
					<i className="fa fa-times" style={{ color: "#dc3545" }} />
				</div>
			</div>
		</li>
	)
}

RequestPanel.propTypes = {
	item: PropTypes.object.isRequired,
	onAccept: PropTypes.func.isRequired,
	onReject: PropTypes.func.isRequired,
}

export default withRouter(RequestPanel)
