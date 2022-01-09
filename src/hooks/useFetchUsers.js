import { useCallback, useReducer } from "react";
import { getUsers } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchUsers() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback((token, page) => {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { page };

			getUsers(token, params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
