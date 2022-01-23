import { useCallback, useEffect, useReducer } from "react";
import reducer from "./request/reducer";
import initialState from "./request/state";
import { setRequestLoading, setRequestResult, setRequestError, clearRequest } from "./request/actions";
import { getProducts } from "../api";

const abortController = new AbortController();

export default function useFetchProducts() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { response, request } = state;

	useEffect(() => {
		return abortController.abort();
	}, []);

	request.send = useCallback(
		({ params }) => {
			dispatch(setRequestLoading());

			return getProducts({ signal: abortController.signal, params })
				.then((response) => {
					dispatch(setRequestResult(response));
				})
				.catch((error) => {
					dispatch(setRequestError(error));
				});
		},
		[dispatch, abortControllerRef]
	);

	request.clear = useCallback(() => dispatch(clearRequest()), [dispatch]);

	return { request, response };
}
