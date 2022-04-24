import actionTypes from "./types";

export function setResponse(result) {
	return { type: actionTypes.success, payload: result };
}

export function setError(error) {
	return { type: actionTypes.fail, payload: error };
}

export function setLoading() {
	return { type: actionTypes.loading };
}

export function reset() {
	return { type: actionTypes.reset };
}
