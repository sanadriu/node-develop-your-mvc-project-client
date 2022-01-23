import { useCallback, useEffect, useReducer, useRef } from "react";
import reducer from "./request/reducer";
import initialState from "./request/state";
import { setRequestLoading, setRequestResult, setRequestError, clearRequest } from "./request/actions";
import { getUsers } from "../api";

const abortController = new AbortController();

export default function useFetchUsers() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { response, request } = state;

	useEffect(() => {
		return abortController.abort();
	}, []);

	request.send = useCallback(
		({ token, params }) => {
			dispatch(setRequestLoading());

			return getUsers({ signal: abortController.signal, token, params })
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
