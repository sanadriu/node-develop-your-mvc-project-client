import { request } from "../services/api.service";
import ApiErrors from "./constants/errors";

export function getProducts({ signal, params: { page = 1 } }) {
	const config = {
		url: "/products",
		params: {
			page,
		},
		method: "GET",
		signal,
	};

	return request(config);
}

export function getProduct({ signal, id }) {
	if (!id) return Promise.reject(ApiErrors.missing_product_id);

	const config = {
		url: `/products/${id}`,
		method: "GET",
		signal,
	};

	return request(config);
}

export function createProduct({ signal, token, data }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const config = {
		url: "/products",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function updateProduct({ signal, token, id, data }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_product_id);

	const config = {
		url: `/products/${id}`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function deleteProduct({ signal, token, id }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_product_id);

	const config = {
		url: `/products/${id}`,
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}
