import { useEffect } from "react";
import { getOrders } from "../api/orders.api";
import { useAuth } from "../contexts/AuthContext";
import { usePagination } from "./usePagination";
import { useRequest } from "./useRequest";

export function useListOrders() {
	const { page } = usePagination();
	const { getCurrentUserToken } = useAuth();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getOrders);

	useEffect(() => {
		getCurrentUserToken().then((token) => {
			sendRequest({ token, params: { page } });
		});
	}, [sendRequest, getCurrentUserToken, page]);

	return { getRequest: { response, error, isLoading, isFailed } };
}
