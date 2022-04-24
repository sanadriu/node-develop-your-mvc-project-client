import actionTypes from "./types";

export default function reducer(state, action) {
	switch (action.type) {
		case actionTypes.goBack: {
			return {
				...state,
				step: state.step > 1 ? state.step - 1 : 1,
			};
		}
		case actionTypes.goForward: {
			return {
				...state,
				step: state.step + 1,
			};
		}
		case actionTypes.setBillingAddress: {
			return {
				...state,
				shippingAddress: { ...action.payload },
			};
		}
		case actionTypes.setPaymentDetails: {
			return {
				...state,
				paymentDetails: { ...action.payload },
			};
		}

		case actionTypes.setOrderSummary: {
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
