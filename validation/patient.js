const validator = require("validator")
const isEmpty = require("./isEmpty")

module.exports = validatePatientInput = (data) => {
	let errors = {}
	data.handle = !isEmpty(data.handle) ? data.handle : ""
	data.name = !isEmpty(data.name) ? data.name : ""
	data.dob = !isEmpty(data.dob) ? data.dob : ""
	data.door = !isEmpty(data.door) ? data.door : ""
	data.street = !isEmpty(data.street) ? data.street : ""
	data.landmark = !isEmpty(data.landmark) ? data.landmark : ""
	data.city = !isEmpty(data.city) ? data.city : ""
	data.pincode = !isEmpty(data.pincode) ? data.pincode : ""

	if (!validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Characters must be between 2 and 30"
	}
	if (validator.isEmpty(data.name)) {
		errors.name = "Name field is required!"
	}
	if (!validator.isLength(data.handle, { min: 2 }, { max: 40 })) {
		errors.handle = "Handle should be between 2 and 40 characters"
	}
	if (validator.isEmpty(data.dob)) {
		errors.dob = "Age field is required"
	}
	if (validator.isEmpty(data.door.toString())) {
		errors.address = "Door no field is required"
	}
	if (validator.isEmpty(data.street)) {
		errors.address = "Street field is required"
	}
	if (validator.isEmpty(data.landmark)) {
		errors.address = "Landmark field is required"
	}
	if (validator.isEmpty(data.city)) {
		errors.address = "City field is required"
	}
	if (validator.isEmpty(data.pincode.toString())) {
		errors.address = "Pincode field is required"
	}
	console.log("B")
	return {
		errors,
		isValid: isEmpty(errors),
	}
}
