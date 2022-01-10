import { syncUser } from "../../api";
import * as Auth from "../../services/auth";
import { actionTypes } from "./reducer";

export async function signUpWithEmailAndPassword(dispatch, data) {
	dispatch({ type: actionTypes.LOADING });

	const { email, password, ...details } = data;

	try {
		const { user } = await Auth.signUpWithEmailAndPassword(email, password);
		const response = await syncUser(user.accessToken, details).catch((error) => {
			Auth.deleteUser(user);

			return Promise.reject(error);
		});

		const currentUser = {
			...user,
			...response.data.data,
		};

		dispatch({ type: actionTypes.SUCCESS, payload: currentUser });
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
}

export async function signInWithEmailAndPassword(dispatch, email, password) {
	dispatch({ type: actionTypes.LOADING });

	try {
		const { user } = await Auth.signInWithEmailAndPassword(email, password);
		const response = await syncUser(user.accessToken);

		const details = response.data.data;
		const currentUser = {
			...user,
			...details,
		};

		dispatch({ type: actionTypes.SUCCESS, payload: currentUser });
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
}

export async function signOut(dispatch) {
	dispatch({ type: actionTypes.LOADING });

	try {
		await Auth.auth.signOut();

		dispatch({ type: actionTypes.CLEAR_USER });
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
}

export async function sendPasswordResetEmail(dispatch, email) {
	try {
		await Auth.sendPasswordResetEmail(email);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
}
