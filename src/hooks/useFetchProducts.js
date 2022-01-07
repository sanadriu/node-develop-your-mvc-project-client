import { useEffect, useReducer } from "react";
import { getProducts } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useFetchProducts(page = 1) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: actionTypes.LOADING });

		const params = { page };

		getProducts(params)
			.then((response) => {
				dispatch({ type: actionTypes.SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: actionTypes.ERROR, payload: error });
			});
	}, [page]);

	return state;
}
