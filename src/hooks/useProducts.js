import { useEffect } from "react";
import { getProducts } from "../api/products.api";
import { usePagination } from "./usePagination";
import { useRequest } from "./useRequest";

export function useProducts() {
	const { page } = usePagination();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getProducts);

	useEffect(() => {
		const params = { page: page };

		sendRequest({ params });
	}, [sendRequest, page]);

	return { getRequest: { response, error, isLoading, isFailed } };
}
