import React, { Component } from "react"
import { Link } from "react-router-dom"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard")
		}
	}

	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h4 className="mb-4" style={{ color: "rgb(225, 225, 225)" }}>
									Diacare
								</h4>
								<p
									className="lead text-center"
									style={{ color: "rgba(204, 208, 209, 0.69)" }}
								>
									{" "}
									Doctor Patient Community
								</p>
								<hr />
								<Link to="/register" className="btn btn-lg btn-info mr-2">
									Sign Up
								</Link>
								<Link to="/login" className="btn btn-lg btn-light">
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Landing)
