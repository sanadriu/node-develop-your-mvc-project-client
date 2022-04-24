import * as actions from "../../reducers/checkout/actions";

export function goBackHandler(dispatch) {
	dispatch(actions.goBack());
}
export function goForwardHandler(dispatch) {
	dispatch(actions.goForward());
}

export function setBillingAddressHandler(dispatch, values) {
	dispatch(actions.setBillingAddress(values));
}

export function setPaymentDetailsHandler(dispatch, values) {
	dispatch(actions.setPaymentDetails(values));
}

export function setCheckoutOrderHandler(dispatch, values) {
	dispatch(actions.setOrder(values));
}
