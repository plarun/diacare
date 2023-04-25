const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const User = require("../../models/User");

// mongoose.set("debug", true)

const validateDoctorInput = require("../../validation/doctor");

// @route   GET api/doctor/test
// @desc    Test doctor profile
// @access  Public
router.get("/test", (req, res) => res.json({ masg: "Doctor profile works" }));

// @route   GET api/doctor
// @desc    Get current doctors profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Doctor.findOne({ user: req.user.id })
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

// @route   GET api/doctor/myPatient/:handle
// @desc    Get all my patients profile
// @access  public
router.get("/myPatient/:handle", (req, res) => {
  Patient.find({ doctor: req.params.handle }).then((patients) => {
    console.log(patients);
    res.json(patients);
  });
});

// @route   DELETE api/doctor
// @desc    Delete current doctor and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Doctor.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/doctor/all
// @desc    Get all doctor profile
// @access  Publlic
router.get("/all", (req, res) => {
  Doctor.find().then((doctors) => {
    if (!doctors) {
      errors.noprofile = "No profiles!";
      return res.status(404).json(errors);
    }
    res.json(doctors);
  });
});

// @route   GET api/doctor/isValidUser/:handle
// @desc    get profile by handle
// @access  Public

router.get("/isValidUser/:handle", (req, res) => {
  let status = { isValid: true };
  Doctor.findOne({ handle: req.params.handle })
    .then((doctor) => {
      if (!doctor) {
        status.isValid = false;
        return res.json(status);
      }
      return res.json(status);
    })
    .catch((err) => console.log(err));
});

// @route   GET api/doctor/handle/:handle
// @desc    get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Doctor.findOne({ handle: req.params.handle })
    .then((doctor) => {
      if (!doctor) {
        errors.noprofile = "No profile!";
        res.status(404).json(errors);
      } else {
        res.json(doctor);
      }
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/doctor/user/:user_id
// @desc    get profile by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Doctor.findOne({ user: req.params.user_id })
    .then((doctor) => {
      if (!doctor) {
        errors.noprofile = "No profile!";
        res.status(404).json(errors);
      }
      res.json(doctor);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   POST api/doctor
// @desc    Create or edit doctor profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDoctorInput(req.body);
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
    if (req.body.hospital) profileFields.hospital = req.body.hospital;
    // Address
    profileFields.address = {};
    if (req.body.door) profileFields.address.door = req.body.door;
    if (req.body.street) profileFields.address.street = req.body.street;
    if (req.body.landmark) profileFields.address.landmark = req.body.landmark;
    if (req.body.city) profileFields.address.city = req.body.city;
    if (req.body.pincode) profileFields.address.pincode = req.body.pincode;

    Doctor.findOne({ user: req.user.id }).then((doctor) => {
      if (doctor) {
        // Update
        console.log(doctor);
        Doctor.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then((doctor) => res.json(doctor))
          .catch((err) => console.log(err));
      } else {
        // Create
        // Check if handle exists
        Doctor.findOne({ handle: profileFields.handle }).then((doctor) => {
          if (doctor) {
            errors.handle = "Handle already exists!";
            res.status(400).json(errors);
          }
          // Save profile
          const newUser = new Doctor(profileFields);
          console.log("new: ", newUser);
          newUser
            .save()
            .then((doctor) => res.json(doctor))
            .catch((err) => console.log(err));
        });
      }
    });
  }
);

// @route   POST api/doctor/response
// @desc    accept or reject patient
// @access  private
router.post(
  "/response",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("request: ", req.body);
    const { isAccepted, doctorHandle, patientHandle, msg_id } = req.body;
    Doctor.findOneAndUpdate(
      { handle: doctorHandle },
      { $pull: { "notifications.requests": { _id: msg_id } } },
      { new: true }
    ).then((doctor) => {
      if (isAccepted) {
        Doctor.findOneAndUpdate(
          { handle: doctorHandle },
          { $push: { patients: patientHandle } },
          { new: true }
        )
          .then((doctor) => {
            if (doctor != null) {
              console.log(doctor);
              patient = doctor.patients[doctor.patients.length - 1];
              console.log(patient == patientHandle);
              if ((patient, patientHandle)) {
                Patient.updateOne(
                  { handle: patientHandle },
                  { $set: { subscription: "done", doctor: doctorHandle } }
                )
                  .then(() => res.json(doctor))
                  .catch((err) => res.status(404).json(err));
              }
            }
          })
          .catch((err) => res.status(404).json(err));
      } else {
        Patient.updateOne(
          { handle: patientHandle },
          { $set: { subscription: "none" } }
        )
          .then(() => res.json(doctor))
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

// @route   POST api/doctor/removeMsg
// @desc    remove message
// @access  private
router.post(
  "/removeMsg",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("request: ", req.body);
    const { doctorHandle, msg_id } = req.body;
    Doctor.findOneAndUpdate(
      { handle: doctorHandle },
      { $pull: { "notifications.messages": { _id: msg_id } } },
      { new: true }
    )
      .then((doctor) => res.json(doctor))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
