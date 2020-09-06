import React from "react"
import PropTypes from "prop-types"

const SmallInputField = ({ name, placeholder, value, type, onChange }) => {
	return (
		<div
			className="form-control"
			style={{
				padding: "2px 4px",
				border: "none",
				borderRight: "0.5px solid #e9edee",
				borderLeft: "0.5px solid #e9edee"
			}}
		>
			<input
				type={type}
				className={"chartInputItem form-control"}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

SmallInputField.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

SmallInputField.defaultProps = {
	type: "text"
}

export default SmallInputField
