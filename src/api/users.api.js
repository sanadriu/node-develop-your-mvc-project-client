import { request } from "../services/api.service";
import ApiErrors from "./constants/errors";

export function getUsers({ signal, token, params: { page = 1 } }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const config = {
		url: "/users",
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

export function getUser({ signal, token, id }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_user_id);

	const config = {
		url: `/users/${id}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function createUser({ signal, token, data }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const config = {
		url: "/users",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function updateUser({ signal, token, id, data }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_user_id);

	const config = {
		url: `/users/${id}`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function deleteUser({ signal, token, id }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);
	if (!id) return Promise.reject(ApiErrors.missing_user_id);

	const config = {
		url: `/users/${id}`,
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}
