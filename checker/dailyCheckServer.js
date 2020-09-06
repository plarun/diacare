const mongoose = require("mongoose")

const Patient = require("../models/Patient")
const Doctor = require("../models/Doctor")

//  Check all patients
const dailyCheckServer = () => {
	console.log("DailyCheckServer")
	let today = new Date()
	//	find and check all patients
	Patient.find().then(patients => {
		if (patients) {
			patients.forEach(patient => {
				let lastCheck = new Date()
				//	Check for today
				if (patient.next_check == today) {
					//	remaind Patient
					let msg = notify.remaindPatient(patient.handle)
					patient.notifications.push(msg)
					//	updating next check
					patient.next_check.setDate(patient.next_check + patient.type)
				}
				//	Check for last check
				if (patient.next_check == lastCheck.setDate(lastCheck - patient.type)) {
					if (patient.warning == 0) {
						//	notifyDoctor
						let msg = notify.notifyDotor(patient.handle)
						Doctor.findOne({ handle: patient.doctor })
							.then(doctor => {
								doctor.notifications.push(msg)
								doctor.save(err => console.log(err))
							})
							.catch(err => console.log(err))
						//	notifyPatient
						msg = notify.notifyPatient(patient.handle)
						patient.notifications.push(msg)
					} else {
						patient.warning -= 1
					}
				}
				patient
					.save()
					.then(patient => console.log(patient))
					.catch(err => console.log(err))
			})
		}
	})
}

module.exports = dailyCheckServer
