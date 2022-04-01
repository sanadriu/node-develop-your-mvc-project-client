import actionTypes from "./types";
import initialState from "./state";

export default function reducer(state, action) {
	switch (action.type) {
		case actionTypes.loading: {
			return {
				...state,
				isLoading: true,
			};
		}
		case actionTypes.success: {
			return {
				response: action.payload,
				error: null,
				isLoading: false,
				isFailed: false,
			};
		}
		case actionTypes.fail: {
			return {
				...state,
				error: action.payload,
				isLoading: false,
				isFailed: false,
			};
		}
		case actionTypes.reset: {
			return {
				...initialState,
			};
		}
		default: {
			return state;
		}
	}
}
