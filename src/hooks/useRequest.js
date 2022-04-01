import { useCallback, useEffect, useReducer, useRef } from "react";
import { setLoading, setResponse, setError, reset } from "./request/actions";
import reducer from "./request/reducer";
import initialState from "./request/state";

export default function useRequest(request) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const abortController = useRef(new AbortController());

	useEffect(() => {
		return abortController.current.abort();
	}, []);

	const clearRequest = useCallback(() => dispatch(reset()), [dispatch]);
	const sendRequest = useCallback(
		({ token, id, data, params }) => {
			if (!(request instanceof Promise)) {
				return dispatch(setError(new Error("Request must be a promise")));
			}

			dispatch(setLoading());

			request({ signal: abortController.current.signal, token, id, data, params })
				.then((response) => dispatch(setResponse(response)))
				.catch((error) => dispatch(setError(error)));
		},
		[dispatch, abortControllerRef]
	);

	return { ...state, sendRequest, clearRequest };
}
