import * as Auth from "../../services/auth";
import {
	setAuthStartLoading,
	setAuthEndLoading,
	setAuthError,
	setAuthUser,
	clearAuthError,
	clearAuthUser,
} from "./actions";
import { userRegister, userSync } from "../../api";

export function syncHandler(dispatch, firebaseUser) {
	if (firebaseUser) {
		dispatch(setAuthStartLoading());

		const token = firebaseUser.accessToken;

		userSync({ token })
			.then((response) => {
				const { success, message, data } = response;

				if (!success) return Promise.reject(message);

				const user = {
					...firebaseUser,
					...data,
				};

				dispatch(setAuthUser(user));
			})
			.catch((error) => {
				dispatch(setAuthError(error));
			});
	} else {
		dispatch(clearAuthUser());
	}
}

export function registerHandler(dispatch, data) {
	dispatch(setAuthStartLoading());

	userRegister({ data })
		.then((response) => {
			const { success, message } = response;

			if (!success) return Promise.reject(message);

			return Auth.signInWithEmailAndPassword(data.email, data.password);
		})
		.then(() => {
			dispatch(setAuthEndLoading());
		})
		.catch((error) => {
			dispatch(setAuthError(error));
		});
}

export function loginHandler(dispatch, email, password) {
	dispatch(setAuthStartLoading());

	Auth.signInWithEmailAndPassword(email, password)
		.then(() => {
			dispatch(setAuthEndLoading());
		})
		.catch((error) => {
			dispatch(setAuthError(error));
		});
}

export function logoutHandler(dispatch) {
	dispatch(setAuthStartLoading());

	Auth.signOut()
		.then(() => {
			dispatch(clearAuthUser());
		})
		.catch((error) => {
			dispatch(setAuthError(error));
		});
}

export function resetPasswordHandler(dispatch, email) {
	dispatch(setAuthStartLoading());

	Auth.sendPasswordResetEmail(email)
		.then(() => {
			dispatch(setAuthEndLoading());
		})
		.catch((error) => {
			dispatch(setAuthError(error));
		});
}

export function clear(dispatch) {
	dispatch(clearAuthError);
}
