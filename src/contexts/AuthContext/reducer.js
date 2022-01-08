const actionTypes = {
	LOADING: Symbol(),
	END_LOADING: Symbol(),
	SUCCESS: Symbol(),
	ERROR: Symbol(),
	CLEAR_USER: Symbol(),
	CLEAR_ERROR: Symbol(),
};

function reducer(state, action) {
	switch (action.type) {
		case actionTypes.LOADING:
			return {
				...state,
				authError: null,
				isLoading: true,
			};
		case actionTypes.SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				isLoading: false,
			};
		case actionTypes.ERROR:
			return {
				...state,
				authError: action.payload,
				isLoading: false,
			};
		case actionTypes.CLEAR_USER:
			return {
				...state,
				currentUser: null,
				isLoading: false,
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
