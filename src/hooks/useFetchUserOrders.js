import { useCallback, useReducer } from "react";
import { getUserOrders } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchUserOrders() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (token, id, page) => {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });
			if (!id) return dispatch({ type: actionTypes.ERROR, payload: new Error("User ID is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { id, page };

			await getUserOrders(token, params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
