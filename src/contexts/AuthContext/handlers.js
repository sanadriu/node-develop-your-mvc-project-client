import * as Auth from "../../services/auth";
import * as Api from "../../api";
import { actionTypes } from "./reducer";

const signInWithEmailAndPassword = async (dispatch, email, password) => {
	dispatch({ type: actionTypes.CLEAR_ERROR });
	dispatch({ type: actionTypes.START_LOADING });

	try {
		await Auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: { error } });
	}

	dispatch({ type: actionTypes.END_LOADING });
};

const signInWithGoogle = async (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_ERROR });
	dispatch({ type: actionTypes.START_LOADING });

	try {
		await Auth.signInWithGoogle();
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: { error } });
	}

	dispatch({ type: actionTypes.END_LOADING });
};

const createUserWithEmailAndPassword = async (dispatch, email, password) => {
	dispatch({ type: actionTypes.CLEAR_ERROR });
	dispatch({ type: actionTypes.START_LOADING });

	try {
		const {
			user: { uid },
		} = await Auth.createUserWithEmailAndPassword(email, password);

		const response = await Api.signUp({ email, uid });

		if (!response.success) throw new Error(response.message);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: { error } });
	}

	dispatch({ type: actionTypes.END_LOADING });
};

const signOut = async (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_ERROR });
	dispatch({ type: actionTypes.START_LOADING });

	try {
		await Auth.signOut();

		dispatch({ type: actionTypes.CLEAR_USER });
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: { error } });
	}

	dispatch({ type: actionTypes.END_LOADING });
};

const sendPasswordResetEmail = async (dispatch, email) => {
	dispatch({ type: actionTypes.CLEAR_ERROR });
	dispatch({ type: actionTypes.START_LOADING });

	try {
		await Auth.sendPasswordResetEmail(email);
	} catch (error) {
		dispatch({ type: actionTypes.ERROR, payload: { error } });
	}

	dispatch({ type: actionTypes.END_LOADING });
};

export {
	signInWithEmailAndPassword,
	signInWithGoogle,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
};
