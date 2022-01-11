import { useCallback, useReducer } from "react";
import { getOrders } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchOrders() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (token, page) => {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { page };

			await getOrders(token, params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
