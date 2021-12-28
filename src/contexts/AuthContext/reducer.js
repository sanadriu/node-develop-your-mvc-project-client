const actionTypes = {
	SET_CURRENT_USER: Symbol(),
	SET_AUTH_ERROR: Symbol(),
	RESET_CURRENT_USER: Symbol(),
	RESET_AUTH_ERROR: Symbol(),
};

function reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload.user,
			};
		case actionTypes.SET_AUTH_ERROR:
			return {
				...state,
				authError: payload.error,
			};
		case actionTypes.RESET_CURRENT_USER:
			return {
				...state,
				currentUser: null,
			};
		case actionTypes.RESET_AUTH_ERROR:
			return {
				...state,
				authError: null,
			};
		default:
			return state;
	}
}

export { actionTypes, reducer };
