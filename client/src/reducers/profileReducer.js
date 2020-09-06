import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
} from "../actions/types"

const initialState = {
	profile: null,
	patients: null,
	loading: false,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			}
		case GET_PROFILES:
			return {
				...state,
				patients: action.payload,
				loading: false,
			}
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
			}
		default:
			return state
	}
}
