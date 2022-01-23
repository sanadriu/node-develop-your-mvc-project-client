import {
	AUTH_START_LOADING,
	AUTH_STOP_LOADING,
	AUTH_SET_USER,
	AUTH_SET_ERROR,
	AUTH_CLEAR_USER,
	AUTH_CLEAR_ERROR,
} from "./types";

export default function reducer(state, action) {
	switch (action.type) {
		case AUTH_START_LOADING: {
			return {
				...state,
				error: null,
				status: "loading",
			};
		}
		case AUTH_STOP_LOADING: {
			return {
				...state,
				status: "idle",
			};
		}
		case AUTH_SET_USER: {
			return {
				...state,
				user: action.payload,
				status: "idle",
			};
		}
		case AUTH_SET_ERROR: {
			return {
				...state,
				error: action.payload,
				status: "error",
			};
		}
		case AUTH_CLEAR_USER: {
			return {
				...state,
				user: null,
				status: "idle",
			};
		}
		case AUTH_CLEAR_ERROR: {
			return {
				...state,
				error: null,
				status: "idle",
			};
		}
		default:
			return state;
	}
}
