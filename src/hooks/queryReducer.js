const actionTypes = {
	LOADING: Symbol(),
	SUCCESS: Symbol(),
	ERROR: Symbol(),
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.LOADING:
			return { status: "loading", response: {}, error: null };
		case actionTypes.SUCCESS:
			return { status: "success", response: action.payload, error: null };
		case actionTypes.ERROR:
			return { status: "error", response: {}, error: action.payload };
		default:
			return state;
	}
};

export { actionTypes, reducer };
