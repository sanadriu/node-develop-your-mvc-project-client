import { useEffect, useReducer } from "react";
import { getUsers } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchUsers(token, page) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: actionTypes.LOADING });

		const params = { page };

		if (token) {
			getUsers(token, params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		} else {
			dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });
		}
	}, [token, page]);

	return state;
}
