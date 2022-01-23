import {
	CHECKOUT_SET_PREV_STEP,
	CHECKOUT_SET_NEXT_STEP,
	CHECKOUT_SET_PAYMENT_DETAILS,
	CHECKOUT_SET_SHIPPING_ADDRESS,
	CHECKOUT_SET_ORDER,
} from "./types";

export function setCheckoutPrevStep() {
	return { type: CHECKOUT_SET_PREV_STEP };
}

export function setCheckoutNextStep() {
	return { type: CHECKOUT_SET_NEXT_STEP };
}

export function setCheckoutBillingAddress(values) {
	return { type: CHECKOUT_SET_SHIPPING_ADDRESS, payload: values };
}

export function setCheckoutPaymentDetails(values) {
	return { type: CHECKOUT_SET_PAYMENT_DETAILS, payload: values };
}

export function setCheckoutOrder(values) {
	return { type: CHECKOUT_SET_ORDER, payload: values };
}
