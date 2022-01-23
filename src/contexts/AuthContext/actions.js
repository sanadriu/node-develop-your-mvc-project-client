import {
	AUTH_START_LOADING,
	AUTH_STOP_LOADING,
	AUTH_SET_USER,
	AUTH_SET_ERROR,
	AUTH_CLEAR_USER,
	AUTH_CLEAR_ERROR,
} from "./types";

export function setAuthStartLoading() {
	return { type: AUTH_START_LOADING };
}

export function setAuthEndLoading() {
	return { type: AUTH_STOP_LOADING };
}

export function setAuthUser(user) {
	return { type: AUTH_SET_USER, payload: user };
}

export function setAuthError(error) {
	return { type: AUTH_SET_ERROR, payload: error };
}

export function clearAuthUser() {
	return { type: AUTH_CLEAR_USER };
}

export function clearAuthError() {
	return { type: AUTH_CLEAR_ERROR };
}
