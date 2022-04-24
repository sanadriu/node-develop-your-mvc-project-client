import actionTypes from "./types";

export function goBack() {
	return { type: actionTypes.goBack };
}

export function goForward() {
	return { type: actionTypes.goForward };
}

export function setBillingAddress(values) {
	return { type: actionTypes.setBillingAddress, payload: values };
}

export function setPaymentDetails(values) {
	return { type: actionTypes.setPaymentDetails, payload: values };
}

export function setOrder(values) {
	return { type: actionTypes.setPaymentDetails, payload: values };
}
