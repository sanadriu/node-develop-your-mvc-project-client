import { useCallback, useReducer } from "react";
import { getProduct } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchProduct() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (id) => {
			if (!id) return dispatch({ type: actionTypes.ERROR, payload: new Error("Product ID is required") });

			dispatch({ type: actionTypes.LOADING });

			const params = { id };

			await getProduct(params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
