const Patient = require("../models/Patient")

const remaindPatient = patient => {
	const msg = {}
	msg.time = new Date().getTime()
	msg.msg = `${patient}, today you have to check!`
	return msg
}

const notifyDoctor = patient => {
	const msg = {}
	msg.time = new Date().getTime()
	msg.msg = `${patient} has not checking properly`
	return msg
}

const notifyPatient = (doctor, patient) => {
	const msg = {}
	msg.time = new Date().getTime()
	msg.msg = `${patient}, your doctor ${doctor} has been informed about your inproper checking`
	return msg
}

module.exports = { remaindPatient, notifyDoctor, notifyPatient }
