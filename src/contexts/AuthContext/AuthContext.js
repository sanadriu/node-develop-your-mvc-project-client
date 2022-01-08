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
import { syncUser } from "../../api";

const initialState = {
	currentUser: null,
	authError: null,
	isLoading: false,
};

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentUser, info, authError, isLoading } = state;

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: actionTypes.LOADING });

				syncUser(user.accessToken)
					.then((response) => {
						if (!response.data?.success) return Promise.reject("Could not sync user with DB");

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

	console.log(currentUser, info, isLoading);

	const value = {
		currentUser,
		authError,
		isLoading,
		createUserWithEmailAndPassword: useCallback((data) => {
			createUserWithEmailAndPassword(dispatch, data);
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
