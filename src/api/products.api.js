import { request } from "../services/api";

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
	if (!id) return Promise.reject("User ID must be provided");

	const config = {
		url: `/products/${id}`,
		method: "GET",
		signal,
	};

	return request(config);
}

export function createProduct({ signal, token, data }) {
	if (!token) return Promise.reject("Auth bearer token must be provided");

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
	if (!token) return Promise.reject("Auth bearer token must be provided");
	if (!id) return Promise.reject("Product ID must be provided");

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
	if (!token) return Promise.reject("Auth bearer token must be provided");
	if (!id) return Promise.reject("Product ID must be provided");

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
