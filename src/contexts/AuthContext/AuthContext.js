import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { auth } from "../../services/auth";
import { reducer, actionTypes } from "./reducer";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithGoogle,
	signOut,
	sendPasswordResetEmail,
} from "./handlers";

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
		dispatch({ type: actionTypes.START_LOADING });

		const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: actionTypes.SUCCESS, payload: { user } });
			} else {
				dispatch({ type: actionTypes.CLEAR_USER });
			}

			dispatch({ type: actionTypes.END_LOADING });
		});

		return async () => {
			if (unsubscribeFromAuth) unsubscribeFromAuth();
		};
	}, []);

	const value = {
		currentUser,
		authError,
		isLoading,
		createUserWithEmailAndPassword: useCallback((email, password) => {
			createUserWithEmailAndPassword(dispatch, email, password);
		}, []),
		signInWithEmailAndPassword: useCallback((email, password) => {
			signInWithEmailAndPassword(dispatch, email, password);
		}, []),
		signInWithGoogle: useCallback(() => {
			signInWithGoogle(dispatch);
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
