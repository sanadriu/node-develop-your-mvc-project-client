import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import reducer from "./reducer";
import initialState from "./state";
import {
	syncHandler,
	loginHandler,
	logoutHandler,
	resetPasswordHandler,
	clearHandler,
	registerHandler,
} from "./handlers";
import auth from "../../services/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { user, error, status } = state;

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged((firebaseUser) => {
			syncHandler(dispatch, firebaseUser);
		});

		return async () => {
			if (unsubscribeFromAuth) unsubscribeFromAuth();
		};
	}, [dispatch]);

	const value = {
		user,
		error,
		status,
		register: useCallback((data) => registerHandler(dispatch, data), [dispatch]),
		login: useCallback((email, password) => loginHandler(dispatch, email, password), [dispatch]),
		logout: useCallback(() => logoutHandler(dispatch), [dispatch]),
		resetPassword: useCallback((email) => resetPasswordHandler(dispatch, email), [dispatch]),
		clear: useCallback(() => clearHandler(dispatch), [dispatch]),
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
