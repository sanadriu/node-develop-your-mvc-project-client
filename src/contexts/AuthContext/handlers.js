import { syncUser } from "../../api";
import * as Auth from "../../services/auth";
import { actionTypes } from "./reducer";

const signInWithEmailAndPassword = async (dispatch, email, password) => {
	dispatch({ type: actionTypes.LOADING });

	try {
		await Auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
};

const signInWithGoogle = async (dispatch) => {
	dispatch({ type: actionTypes.LOADING });

	try {
		await Auth.signInWithGoogle();
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
};

const createUserWithEmailAndPassword = async (dispatch, data) => {
	dispatch({ type: actionTypes.LOADING });

	try {
		const { email, password, ...details } = data;

		const user = await Auth.createUserWithEmailAndPassword(email, password);
		const response = await syncUser(user.accessToken, details);

		if (!response.data?.success) {
			throw new Error("Could not sync user with DB");
		} else {
			const details = response.data.data;
			const currentUser = {
				...user,
				...details,
			};

			dispatch({ type: actionTypes.SUCCESS, payload: currentUser });
		}
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
};

const signOut = async (dispatch) => {
	dispatch({ type: actionTypes.LOADING });

	try {
		await Auth.signOut();

		dispatch({ type: actionTypes.CLEAR_USER });
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
};

const sendPasswordResetEmail = async (dispatch, email) => {
	dispatch({ type: actionTypes.LOADING });

	try {
		await Auth.sendPasswordResetEmail(email);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: error });
	}
};

export {
	signInWithEmailAndPassword,
	signInWithGoogle,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
};
