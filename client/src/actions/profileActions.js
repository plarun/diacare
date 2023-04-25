import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./types";

// getCurrentProfile
// getProfileByHandle
// createProfile
// addGlucoseData
// requestDoctor
// getPatients
// deleteAccount
// setProfileLoading
// clearCurrentProfile

// Get current profile
export const getCurrentProfile = (useras) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/${useras}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

//	Get profile by handle
export const getProfileByHandle = (useras, handle) => (dispatch) => {
  dispatch(setProfileLoading());
  return axios
    .get(`http://localhost:5000/api/${useras}/handle/${handle}`)
    .then((res) => {
      console.log(res, res.data);
      return res;
    })
    .catch((err) => console.log(err));
};

// check profile existance
export const isValidUser = (useras, handle) => (dispatch) => {
  return axios
    .get(`http://localhost:5000/api/${useras}/isValidUser/${handle}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

// Create Profile
export const createProfile = (profileData, useras, history) => (dispatch) => {
  return axios
    .post(`http://localhost:5000/api/${useras}`, profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add Glucosedata
export const addGlucoseData = (handle, glucoseData, history) => (dispatch) => {
  console.log(handle, glucoseData, history);
  axios
    .post("http://localhost:5000/api/patient/chart", { handle, glucoseData })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//	request doctor
export const requestDoctor = (doctor, _id, handle, mtype) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/patient/request", {
      doctor,
      _id,
      handle,
      mtype,
    })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// accept patient
export const responsePatient =
  (doctorHandle, patientHandle, msg_id, isAccepted) => (dispatch) => {
    axios
      .post("http://localhost:5000/api/doctor/response", {
        doctorHandle,
        patientHandle,
        msg_id,
        isAccepted,
      })
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

// reject patient
export const rejectPatient = (doctor, patient) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/doctor/reject", { doctor, patient })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// remove message patient
export const removeMessage = (doctorHandle, msg_id) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/doctor/removeMsg", {
      doctorHandle,
      msg_id,
    })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// subscribe doctor
export const subscribeDoctor = (handle, doctor) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/patient/subscribe", { handle, doctor })
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// unsubscribe doctor
export const unsubscribeDoctor =
  (patient_handle, doctor_handle) => (dispatch) => {
    axios
      .post("http://localhost:5000/api/patient/unsubscribe", {
        patient_handle,
        doctor_handle,
      })
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };

// Delete Education
// export const deleteEducation = id => dispatch => {
// 	axios
// 		.delete(`http://localhost:5000/api/profile/education/${id}`)
// 		.then(res =>
// 			dispatch({
// 				type: GET_PROFILE,
// 				payload: res.data
// 			})
// 		)
// 		.catch(err =>
// 			dispatch({
// 				type: GET_ERRORS,
// 				payload: err.response.data
// 			})
// 		)
// }

// Get all patients profiles for doctor
export const getPatients = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:5000/api/patient/all")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

//	Get all my patients
export const getMyPatients = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  console.log(handle);
  axios
    .get(`http://localhost:5000/api/doctor/myPatient/${handle}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      })
    );
};

// Delete account & profile
export const deleteAccount = (useras, user_id) => (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    console.log(useras, user_id);
    axios
      .delete(`http://localhost:5000/api/${useras}`, { user_id })
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
