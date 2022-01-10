import { useCallback, useReducer } from "react";
import { getOrder } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchOrder() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (token, id) => {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });
			if (!id) return dispatch({ type: actionTypes.ERROR, payload: new Error("Order ID is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { id };

			await getOrder(token, params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
