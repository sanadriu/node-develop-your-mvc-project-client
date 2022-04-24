import { useCallback, useEffect } from "react";
import { deleteUser, getUsers } from "../api/users.api";
import { useAuth } from "../contexts/AuthContext";
import { usePagination } from "./usePagination";
import { useRequest } from "./useRequest";

export function useListUsers() {
	const { page } = usePagination();
	const { getCurrentUserToken } = useAuth();
	const { sendRequest: sendGet, response: getResponse, ...getState } = useRequest(getUsers);
	const {
		sendRequest: sendDelete,
		resetRequest: resetDelete,
		response: deleteResponse,
		...deleteState
	} = useRequest(deleteUser);

	useEffect(() => {
		getCurrentUserToken().then((token) => {
			sendGet({ token, params: { page } });
		});
	}, [sendGet, getCurrentUserToken, page]);

	useEffect(() => {
		if (deleteResponse?.success) {
			setTimeout(() => resetDelete(), 2000);
		}
	}, [deleteResponse, resetDelete]);

	const handleDelete = useCallback(
		(id) => {
			getCurrentUserToken().then((token) => {
				sendDelete({ token, id });
			});
		},
		[sendDelete, getCurrentUserToken]
	);

	return {
		handleDelete,
		getRequest: {
			...getState,
			response: getResponse,
		},
		deleteRequest: {
			...deleteState,
			response: deleteResponse,
		},
	};
}
