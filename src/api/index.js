import { request } from "../services/api";

export function userSync({ signal, token }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	const config = {
		url: "/users/sync",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3000",
		},
		signal,
	};

	return request(config);
}

export function userRegister({ signal, data }) {
	const config = {
		url: "/users/register",
		method: "POST",
		data,
		signal,
	};

	return request(config);
}

export function getUsers({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	const { page = 1 } = params;

	const config = {
		url: `/users?page=${page}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function getUser({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const { id } = params;

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
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

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

export function updateUser({ signal, token, params = {}, data }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const { id } = params;

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

export function deleteUser({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const { id } = params;

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

export function getProducts({ signal, params = {} }) {
	const { page = 1 } = params;

	const config = {
		url: `/products?page=${page}`,
		method: "GET",
		signal,
	};

	return request(config);
}

export function getProduct({ signal, params = {} }) {
	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const config = {
		url: `/products/${id}`,
		method: "GET",
		signal,
	};

	return request(config);
}

export function createProduct({ signal, token, data }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

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

export function updateProduct({ signal, token, params = {}, data }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("Product ID must be provided in 'params.id' property");
	}

	const { id } = params;

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

export function deleteProduct({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("Product ID must be provided in 'params.id' property");
	}

	const { id } = params;

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

export function getOrders({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	const { page = 1 } = params;

	const config = {
		url: `/orders?page=${page}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function getOrder({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("Order ID must be provided in 'params.id' property");
	}

	const { id } = params;

	const config = {
		url: `/orders/${id}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function createOrder({ signal, token, data }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	const config = {
		url: "/orders",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	};

	return request(config);
}

export function getUserOrders({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const { id } = params;

	const config = {
		url: `/users/${id}/orders`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

export function getUserOrder({ signal, token, params = {} }) {
	if (!token) {
		return Promise.reject("Auth bearer token must be provided in 'token' property");
	}

	if (!params.id) {
		return Promise.reject("User ID must be provided in 'params.id' property");
	}

	const { id, index = 1 } = params;

	const config = {
		url: `/users/${id}/orders/${index}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	};

	return request(config);
}

// if (!(signal instanceof AbortSignal)) {
// 	return Promise.reject("Abort signal must be provided in 'signal' property");
// }
