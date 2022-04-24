import { request } from "../services/api.service";
import ApiErrors from "./constants/errors";

export function getOrders({ signal, token, params: { page = 1 } }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const config = {
		url: `${ApiRoutes.orders}`,
		params: {
			page,
		},
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function getOrder({ signal, token, id }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_order_id);

	const config = {
		url: `${ApiRoutes.orders}/${id}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function createOrder({ signal, token, data }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const config = {
		url: `${ApiRoutes.orders}`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function getUserOrders({ signal, token, id }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_user_id);

	const config = {
		url: `${ApiRoutes.users}/${id}/orders`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function getUserOrder({ signal, token, id, params: { index = 1 } }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_user_id);

	const config = {
		url: `${ApiRoutes.users}/${id}/orders/${index}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}
