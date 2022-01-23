import { useCallback, useEffect, useReducer, useRef } from "react";
import reducer from "./request/reducer";
import initialState from "./request/state";
import { setRequestLoading, setRequestResult, setRequestError, clearRequest } from "./request/actions";
import { updateUser } from "../api";

const abortController = new AbortController();

export default function useUpdateUser() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { response, request } = state;

	useEffect(() => {
		return abortController.abort();
	}, []);

	request.send = useCallback(
		async ({ token, params, data }) => {
			dispatch(setRequestLoading());

			try {
				const response = await updateUser({ signal: abortController.signal, token, params, data });
				dispatch(setRequestResult(response));
			} catch (error) {
				dispatch(setRequestError(error));
			}
		},
		[dispatch]
	);

	request.clear = useCallback(() => dispatch(clearRequest()), [dispatch]);

	return { request, response };
}
