import { useCallback, useEffect, useReducer, useRef } from "react";
import { setLoading, setResponse, setError, reset } from "../reducers/request/actions";
import reducer from "../reducers/request/reducer";
import initialState from "../reducers/request/state";

export function useRequest(request) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const abortControllerRef = useRef(new AbortController());

	useEffect(() => {
		const abortController = abortControllerRef.current;

		return () => {
			abortController.abort();
		};
	}, []);

	const resetRequest = useCallback(() => dispatch(reset()), [dispatch]);
	const sendRequest = useCallback(
		({ token, id, data, params }) => {
			dispatch(setLoading());

			request({ signal: abortControllerRef.current.signal, token, id, data, params })
				.then((response) => dispatch(setResponse(response)))
				.catch((error) => dispatch(setError(error)));
		},
		[dispatch, request]
	);

	return { ...state, sendRequest, resetRequest };
}
