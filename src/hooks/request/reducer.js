import { REQUEST_CLEAR, REQUEST_LOADING, REQUEST_SET_ERROR, REQUEST_SET_RESULT } from "./types";

export default function reducer(state, action) {
	switch (action.type) {
		case REQUEST_LOADING: {
			return {
				...state,
				request: {
					...state.request,
					status: "loading",
				},
			};
		}
		case REQUEST_CLEAR: {
			return {
				response: null,
				request: {
					error: null,
					status: "idle",
				},
			};
		}
		case REQUEST_SET_RESULT: {
			return {
				response: action.payload,
				request: {
					error: null,
					status: "done",
				},
			};
		}
		case REQUEST_SET_ERROR: {
			return {
				response: null,
				request: {
					error: action.payload,
					status: "error",
				},
			};
		}
		default: {
			return state;
		}
	}
}
