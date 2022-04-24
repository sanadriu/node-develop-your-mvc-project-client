import * as auth from "../../services/auth.service";
import * as api from "../../api/auth.api";
import * as actions from "../../reducers/auth/actions";

export async function syncHandler(dispatch) {
	dispatch(actions.setSignInLoading());

	try {
		const token = await auth.getCurrentUserToken();

		if (!token) return dispatch(actions.resetUser());

		const response = await api.userSignIn({ token });

		const { success, message, data: user } = response;

		if (!success) throw new Error(message);

		dispatch(actions.setSignInSuccess(user));
	} catch (error) {
		dispatch(actions.setSignInError(error));
	}
}

export async function signUpHandler(dispatch, data) {
	dispatch(actions.setSignUpLoading());

	try {
		await auth.signUpWithEmailAndPassword(data.email, data.password);

		const token = await auth.getCurrentUserToken();
		const response = await api.userSignUp({ token, data });

		const { success, message, data: user } = response;

		if (!success) throw new Error(message);

		dispatch(actions.setSignUpSuccess(user));
	} catch (error) {
		await auth.deleteCurrentUser();

		dispatch(actions.setSignUpError(error));
	}
}

export async function signInHandler(dispatch, data) {
	dispatch(actions.setSignInLoading());

	try {
		await auth.signInWithEmailAndPassword(data.email, data.password);

		const token = await auth.getCurrentUserToken();
		const response = await api.userSignIn({ token });

		const { success, message, data: user } = response;

		if (!success) throw new Error(message);

		dispatch(actions.setSignInSuccess(user));
	} catch (error) {
		await auth.signOut();

		dispatch(actions.setSignInError(error));
	}
}

export async function signOutHandler(dispatch) {
	dispatch(actions.setSignOutLoading());

	try {
		const token = await auth.getCurrentUserToken();
		const response = await api.userSignOut({ token });

		const { success, message } = response;

		if (!success) throw new Error(message);

		dispatch(actions.setSignOutSuccess());

		await auth.signOut();
	} catch (error) {
		await auth.signOut();

		dispatch(actions.setSignOutError(error));
	}
}

export function signUpResetHandler(dispatch) {
	dispatch(actions.resetSignUp);
}

export function signInResetHandler(dispatch) {
	dispatch(actions.resetSignIn);
}

export function signOutResetHandler(dispatch) {
	dispatch(actions.resetSignOut);
}

export function sendPasswordResetEmailHandler() {
	return auth.sendPasswordResetEmail();
}

export function getCurrentUserTokenHandler() {
	return auth.getCurrentUserToken();
}
