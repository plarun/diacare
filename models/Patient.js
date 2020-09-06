const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PatientSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	useras: {
		type: String,
		default: "patient",
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
	bloodgroup: {
		type: String,
	},
	medicines: {
		type: [String],
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
	doctor: {
		type: String,
		default: "",
	},
	subscription: {
		type: String,
		default: "none",
	},
	chart: {
		type: [Object],
	},
	notifications: {
		messages: {
			type: [Object],
		},
		doctorMessages: {
			type: [Object],
		},
	},
	type: {
		type: Number,
		default: 1,
	},
	next_check: {
		type: Date,
		default: new Date(),
	},
	last_check: {
		type: Date,
	},
})

module.exports = Patient = mongoose.model("patient", PatientSchema)
