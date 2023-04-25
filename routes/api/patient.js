const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const User = require("../../models/User");

const validatePatientInput = require("../../validation/patient");

// @route   GET api/patient/test
// @desc    Test patient profile
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Patient profile works" }));

// @route   GET api/patient
// @desc    Get current patients profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Patient.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "No profile, Create new one!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/patient/all
// @desc    Get all patients profile
// @access  Public
router.get("/all", (req, res) => {
  Patient.find().then((patients) => {
    if (!patients) {
      errors.noprofile = "No profiles!";
      return res.status(404).json(errors);
    }
    res.json(patients);
  });
});

// @route   GET api/patient/isValidUser/:handle
// @desc    get profile by handle
// @access  Public

router.get("/isValidUser/:handle", (req, res) => {
  const errors = {};
  console.log(req.params.handle);
  let status = { isValid: true };
  Patient.findOne({ handle: req.params.handle })
    .then((patient) => {
      if (!patient) {
        status.isValid = false;
        res.json(status);
      }
      res.json(status);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/patient/handle/:handle
// @desc    get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  console.log(req.params.handle);
  Patient.findOne({ handle: req.params.handle })
    .then((patient) => {
      if (!patient) {
        errors.noprofile = "No profile!";
        res.status(404).json(errors);
      }
      res.json(patient);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/patient/user/:user_id
// @desc    get profile by user id
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Patient.findOne({ user: req.params.user_id })
    .then((patient) => {
      if (!patient) {
        errors.noprofile = "No profile!";
        res.status(404).json(errors);
      }
      res.json(patient);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/patient
// @desc    Create or edit patient profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req: ", req.body);
    const { errors, isValid } = validatePatientInput(req.body);
    console.log(errors, isValid);

    // Check validation
    if (!isValid) return res.status(400).json(errors);

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.useras = req.user.useras;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.dob) profileFields.dob = req.body.dob;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.bloodgroup) profileFields.bloodgroup = req.body.bloodgroup;
    if (req.body.type) profileFields.type = req.body.type;
    // Medicines - split into array
    if (
      req.body.medicines != undefined &&
      typeof req.body.medicines !== undefined
    ) {
      profileFields.medicines = req.body.medicines.split(",");
    }
    // Address
    profileFields.address = {};
    if (req.body.door) profileFields.address.door = req.body.door;
    if (req.body.street) profileFields.address.street = req.body.street;
    if (req.body.landmark) profileFields.address.landmark = req.body.landmark;
    if (req.body.city) profileFields.address.city = req.body.city;
    if (req.body.pincode) profileFields.address.pincode = req.body.pincode;
    //	doctor
    if (req.body.doctor) profileFields.doctor = req.body.doctor;

    console.log("p fields", profileFields);

    Patient.findOne({ user: req.user.id }).then((patient) => {
      if (patient) {
        Patient.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((patient) => res.json(patient));
      } else {
        // Create
        // Check if handle exists
        Patient.findOne({ handle: profileFields.handle }).then((patient) => {
          if (patient) {
            errors.handle = "Handle already exists!";
            res.status(400).json(errors);
          }
          const newUser = new Patient(profileFields);
          console.log("new: ", newUser);
          newUser
            .save()
            .then((patient) => res.json(patient))
            .catch((err) => console.log(err));
        });
      }
    });
  }
);

// @route   DELETE api/patient
// @desc    Delete current patient and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

//	@route	POST api/patient/chart
//	@desc	add glucose data to chart
//	@access	private
router.post(
  "/chart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(req.body);
    Patient.findOne({ handle: req.body.handle })
      .then((patient) => {
        // let today = new Date().toISOString().slice(0, 10)
        const glucoseData = req.body.glucoseData;
        const dt = glucoseData.date;
        if (patient.chart.length === 0 || patient.chart[0].date != dt) {
          let data = {
            date: glucoseData.date,
            fasting: glucoseData.fasting,
            morning: glucoseData.morning,
            afternoon: glucoseData.afternoon,
            night: glucoseData.night,
          };
          patient.chart.unshift(data);
        } else {
          let data = patient.chart.shift();
          data.fasting = glucoseData.fasting
            ? glucoseData.fasting
            : data.fasting;
          data.morning = glucoseData.morning
            ? glucoseData.morning
            : data.morning;
          data.afternoon = glucoseData.afternoon
            ? glucoseData.afternoon
            : data.afternoon;
          data.night = glucoseData.night ? glucoseData.night : data.night;
          patient.chart.unshift(data);
        }
        patient
          .save()
          .then((data) => res.json(data))
          .catch((err) => console.log(err));
        console.log(patient);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/patient/request
// @desc    request doctor
// @access  private

router.post(
  "/request",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("request: ", req.body);
    const { doctor, _id, handle, mtype } = req.body;
    if (mtype == "subscribe") {
      console.log("subscribe");
      const msg = {
        _id,
        handle,
        mtype,
        date: new Date().toDateString(),
      };
      Doctor.findOne({ handle: doctor })
        .then((doctor) => {
          if (doctor != null) {
            doctor.notifications.requests.unshift(msg);
            doctor
              .save()
              .then(() => {
                Patient.findOneAndUpdate(
                  { _id: _id },
                  { subscription: "wait" },
                  { new: true }
                )
                  .then((patient) => {
                    console.log(patient);
                    res.json(patient);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => res.status(404).json(err));
          }
        })
        .catch((err) => console.log(err));
    } else if (mtype == "unsubscribe") {
      console.log("unsubscribe");
      const msg = {
        _id,
        handle,
        date: new Date().toDateString(),
        message: handle + "Unsubscribed you",
      };
      Doctor.findOne({ handle: doctor }).then((doctor) => {
        if (doctor != null) {
          doctor.notifications.messages.unshift(msg);
          doctor
            .save()
            .then(() => {
              Patient.findOneAndUpdate(
                { _id: _id },
                { subscription: "none", doctor: "" },
                { new: true }
              )
                .then((patient) => res.json(patient))
                .catch((err) => console.log(err));
            })
            .catch((err) => res.status(404).json(err));
        }
      });
    }
  }
);

module.exports = router;
