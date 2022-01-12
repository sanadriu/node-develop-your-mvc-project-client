const actionTypes = {
	BACK: Symbol(),
	NEXT: Symbol(),
	SET_SHIPPING_ADDRESS: Symbol(),
	SET_PAYMENT_DETAILS: Symbol(),
	SET_ORDER: Symbol(),
};

function reducer(state, action) {
	switch (action.type) {
		case actionTypes.BACK:
			return {
				...state,
				step: state.step > 1 ? state.step - 1 : 1,
			};
		case actionTypes.NEXT:
			return {
				...state,
				step: state.step + 1,
			};
		case actionTypes.SET_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: { ...action.payload },
			};
		case actionTypes.SET_PAYMENT_DETAILS:
			return {
				...state,
				paymentDetails: { ...action.payload },
			};
			case actionTypes.SET_ORDER:
				return {
				...state,
				OrderSummary: { ...action.payload },
				};
		default:
			return state;
	}
}

export { actionTypes, reducer };
