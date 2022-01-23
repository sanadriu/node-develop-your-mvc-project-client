import { REQUEST_CLEAR, REQUEST_LOADING, REQUEST_SET_ERROR, REQUEST_SET_RESULT } from "./types";

export function setRequestResult(result) {
	return { type: REQUEST_SET_RESULT, payload: result };
}

export function setRequestError(error) {
	return { type: REQUEST_SET_ERROR, payload: error };
}

export function setRequestLoading() {
	return { type: REQUEST_LOADING };
}

export function clearRequest() {
	return { type: REQUEST_CLEAR };
}
