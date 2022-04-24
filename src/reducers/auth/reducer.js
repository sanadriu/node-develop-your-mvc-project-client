import actionTypes from "./types";

export default function reducer(state, action) {
	switch (action.type) {
		case actionTypes.signUpLoading: {
			return {
				...state,
				signUp: {
					...state.signUp,
					isLoading: true,
				},
			};
		}
		case actionTypes.signUpFail: {
			return {
				...state,
				signUp: {
					isLoading: false,
					isFailed: true,
					error: action.payload,
				},
			};
		}
		case actionTypes.signUpSuccess: {
			return {
				...state,
				signUp: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
				user: action.payload,
			};
		}
		case actionTypes.signUpReset: {
			return {
				...state,
				signUp: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
			};
		}
		case actionTypes.signInLoading: {
			return {
				...state,
				signIn: {
					...state.signIn,
					isLoading: true,
				},
			};
		}
		case actionTypes.signInFail: {
			return {
				...state,
				signIn: {
					isLoading: false,
					isFailed: true,
					error: action.payload,
				},
			};
		}
		case actionTypes.signInSuccess: {
			return {
				...state,
				signIn: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
				user: action.payload,
			};
		}
		case actionTypes.signInReset: {
			return {
				...state,
				signIn: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
			};
		}
		case actionTypes.signOutLoading: {
			return {
				...state,
				signOut: {
					...state.signOut,
					isLoading: true,
				},
			};
		}
		case actionTypes.signOutFail: {
			return {
				...state,
				signOut: {
					isLoading: false,
					isFailed: true,
					error: action.payload,
				},
			};
		}
		case actionTypes.signOutSuccess: {
			return {
				...state,
				signOut: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
				user: null,
			};
		}
		case actionTypes.signOutReset: {
			return {
				...state,
				signOut: {
					isLoading: false,
					isFailed: false,
					error: null,
				},
			};
		}
		case actionTypes.setUser: {
			return {
				...state,
				user: action.payload,
			};
		}
		case actionTypes.resetUser: {
			return {
				...state,
				user: null,
			};
		}
		default:
			return state;
	}
}
