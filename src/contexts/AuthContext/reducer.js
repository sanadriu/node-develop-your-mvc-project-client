const actionTypes = {
	START_LOADING: Symbol(),
	END_LOADING: Symbol(),
	SUCCESS: Symbol(),
	ERROR: Symbol(),
	CLEAR_USER: Symbol(),
	CLEAR_ERROR: Symbol(),
	SET_INFO: Symbol(),
};

function reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.START_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.END_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.SUCCESS:
			return {
				...state,
				currentUser: payload.user,
			};
		case actionTypes.SET_INFO:
			return {
				...state,
				info: payload.info,
			};
		case actionTypes.ERROR:
			return {
				...state,
				authError: payload.error,
			};
		case actionTypes.CLEAR_USER:
			return {
				...state,
				currentUser: null,
				info: null,
			};
		case actionTypes.CLEAR_ERROR:
			return {
				...state,
				authError: null,
			};
		default:
			return state;
	}
}

export { actionTypes, reducer };
