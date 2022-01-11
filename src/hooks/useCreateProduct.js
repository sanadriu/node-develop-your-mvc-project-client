import { useReducer } from "react";
import { createProduct } from "../api";
import { actionTypes, reducer } from "./queryReducer";

const initialState = {
	status: "idle",
	error: null,
	response: {},
};

export default function useCreateProduct() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [
		state,
		async function (token, data) {
			if (!token) return dispatch({ type: actionTypes.ERROR, payload: new Error("Access token is required") });

			dispatch({ type: actionTypes.LOADING });

			await createProduct(token, data)
				.then((response) => {
					dispatch({ type: actionTypes.SUCCESS, payload: response });
				})
				.catch((error) => {
					dispatch({ type: actionTypes.ERROR, payload: error });
				});
		},
	];
}
