import actionTypes from "./types";

export function setSignUpLoading() {
	return { type: actionTypes.signUpLoading };
}

export function setSignUpError(error) {
	return { type: actionTypes.signUpFail, payload: error };
}

export function setSignUpSuccess(user) {
	return { type: actionTypes.signUpSuccess, payload: user };
}

export function resetSignUp() {
	return { type: actionTypes.signUpReset };
}

export function setSignInLoading() {
	return { type: actionTypes.signInLoading };
}

export function setSignInError(error) {
	return { type: actionTypes.signInFail, payload: error };
}

export function setSignInSuccess(user) {
	return { type: actionTypes.signInSuccess, payload: user };
}

export function resetSignIn() {
	return { type: actionTypes.signInReset };
}

export function setSignOutLoading() {
	return { type: actionTypes.signOutLoading };
}

export function setSignOutError(error) {
	return { type: actionTypes.signOutFail, payload: error };
}

export function setSignOutSuccess() {
	return { type: actionTypes.signOutSuccess };
}

export function resetSignOut() {
	return { type: actionTypes.signOutReset };
}

export function setUser(user) {
	return { type: actionTypes.setUser, payload: user };
}

export function resetUser() {
	return { type: actionTypes.resetUser };
}
