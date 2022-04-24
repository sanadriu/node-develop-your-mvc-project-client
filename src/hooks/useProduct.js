import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products.api";
import { useRequest } from "./useRequest";

export function useProduct() {
	const { idProduct } = useParams();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getProduct);

	useEffect(() => {
		sendRequest({ id: idProduct });
	}, [sendRequest, idProduct]);

	return {
		getRequest: {
			response,
			error,
			isLoading,
			isFailed,
		},
	};
}
