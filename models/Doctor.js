const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DoctorSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	useras: {
		type: String,
		default: "doctor",
	},
	handle: {
		type: String,
		required: true,
		max: 40,
	},
	name: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
	},
	hospital: {
		type: String,
		required: true,
	},
	address: {
		door: {
			type: String,
			required: true,
		},
		street: {
			type: String,
			required: true,
		},
		landmark: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		pincode: {
			type: Number,
			required: true,
		},
	},
	patients: {
		type: [String],
	},
	notifications: {
		messages: {
			type: [Object],
		},
		requests: {
			type: [Object],
		},
	},
})

module.exports = Doctor = mongoose.model("doctor", DoctorSchema)
