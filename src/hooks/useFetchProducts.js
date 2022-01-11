import { useCallback, useReducer } from "react";
import { getProducts } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchProducts() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		useCallback(async (page) => {
			dispatch({ type: actionTypes.LOADING });

			const params = { page };

			await getProducts(params)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response.data });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		}, []),
	];
}
