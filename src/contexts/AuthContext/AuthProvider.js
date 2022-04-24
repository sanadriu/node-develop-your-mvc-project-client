import { AuthContext } from "./AuthContext";
import { useReducer, useCallback } from "react";
import { useOnMount } from "../../hooks/useOnMount";
import reducer from "../../reducers/auth/reducer";
import initialState from "../../reducers/auth/state";
import {
	getCurrentUserTokenHandler,
	sendPasswordResetEmailHandler,
	signInHandler,
	signInResetHandler,
	signOutHandler,
	signOutResetHandler,
	signUpHandler,
	signUpResetHandler,
	syncHandler,
} from "./handlers";

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useOnMount(() => {
		syncHandler(dispatch);
	});

	const signUp = useCallback((data) => signUpHandler(dispatch, data), [dispatch]);
	const signUpReset = useCallback(() => signUpResetHandler(dispatch), [dispatch]);
	const signIn = useCallback((data) => signInHandler(dispatch, data), [dispatch]);
	const signInReset = useCallback(() => signInResetHandler(dispatch), [dispatch]);
	const signOut = useCallback(() => signOutHandler(dispatch), [dispatch]);
	const signOutReset = useCallback(() => signOutResetHandler(dispatch), [dispatch]);
	const sendPasswordResetEmail = useCallback(() => sendPasswordResetEmailHandler(), []);
	const getCurrentUserToken = useCallback(() => getCurrentUserTokenHandler(), []);

	const value = {
		...state,
		signUp,
		signUpReset,
		signIn,
		signInReset,
		signOut,
		signOutReset,
		sendPasswordResetEmail,
		getCurrentUserToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
