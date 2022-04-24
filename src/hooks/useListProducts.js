import { useCallback, useEffect } from "react";
import { deleteProduct, getProducts } from "../api/products.api";
import { useAuth } from "../contexts/AuthContext";
import { usePagination } from "./usePagination";
import { useRequest } from "./useRequest";

export function useListProducts() {
	const { page } = usePagination();
	const { getCurrentUserToken } = useAuth();
	const { sendRequest: sendGet, response: getResponse, ...getState } = useRequest(getProducts);
	const {
		sendRequest: sendDelete,
		resetRequest: resetDelete,
		response: deleteResponse,
		...deleteState
	} = useRequest(deleteProduct);

	useEffect(() => {
		sendGet({ params: { page } });
	}, [sendGet, page]);

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
