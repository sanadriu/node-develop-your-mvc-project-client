import { useCallback, useReducer } from "react";
import { updateUser } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useUpdateUser() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (token, id, data) => {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });
			if (!id) return dispatch({ type: actionTypes.ERROR, payload: new Error("User ID is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { id };

			await updateUser(token, params, data)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
