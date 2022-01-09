import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { auth } from "../../services/auth";
import { reducer, actionTypes } from "./reducer";
import { signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "./handlers";
import { syncUser } from "../../api";

const initialState = {
	currentUser: null,
	authError: null,
	isLoading: false,
};

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentUser, authError, isLoading } = state;

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: actionTypes.LOADING });

				syncUser(user.accessToken)
					.then((response) => {
						const details = response.data.data;
						const currentUser = {
							...user,
							...details,
						};

						dispatch({ type: actionTypes.SUCCESS, payload: currentUser });
					})
					.catch((error) => {
						dispatch({ type: actionTypes.ERROR, payload: error });
					});
			} else {
				dispatch({ type: actionTypes.CLEAR_USER });
			}
		});

		return async () => {
			if (unsubscribeFromAuth) unsubscribeFromAuth();
		};
	}, []);

	const value = {
		currentUser,
		authError,
		isLoading,
		signUpWithEmailAndPassword: useCallback((data) => {
			signUpWithEmailAndPassword(dispatch, data);
		}, []),
		signInWithEmailAndPassword: useCallback((email, password) => {
			signInWithEmailAndPassword(dispatch, email, password);
		}, []),
		signOut: useCallback(() => {
			signOut(dispatch);
		}, []),
		sendPasswordResetEmail: useCallback(() => {
			sendPasswordResetEmail(dispatch);
		}, []),
		setAuthError: useCallback((message) => {
			dispatch({ type: actionTypes.ERROR, payload: { error: new Error(message) } });
		}, []),
		resetAuthError: useCallback(() => {
			dispatch({ type: actionTypes.CLEAR_ERROR });
		}, []),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function AuthConsumer({ children }) {
	return <AuthContext.Consumer>{children}</AuthContext.Consumer>;
}

function useAuth() {
	return useContext(AuthContext) || null;
}

export { AuthProvider, AuthConsumer, useAuth };
