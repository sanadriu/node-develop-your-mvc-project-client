import {
	CHECKOUT_SET_PREV_STEP,
	CHECKOUT_SET_NEXT_STEP,
	CHECKOUT_SET_PAYMENT_DETAILS,
	CHECKOUT_SET_SHIPPING_ADDRESS,
	CHECKOUT_SET_ORDER,
} from "./types";

export default function reducer(state, action) {
	switch (action.type) {
		case CHECKOUT_SET_PREV_STEP: {
			return {
				...state,
				step: state.step > 1 ? state.step - 1 : 1,
			};
		}
		case CHECKOUT_SET_NEXT_STEP: {
			return {
				...state,
				step: state.step + 1,
			};
		}
		case CHECKOUT_SET_SHIPPING_ADDRESS: {
			return {
				...state,
				paymentDetails: { ...action.payload },
			};
		}
		case CHECKOUT_SET_PAYMENT_DETAILS: {
			return {
				...state,
				shippingAddress: { ...action.payload },
			};
		}
		case CHECKOUT_SET_ORDER: {
			return {
				...state,
				orderSummary: { ...action.payload },
			};
		}
		default: {
			return state;
		}
	}
}
