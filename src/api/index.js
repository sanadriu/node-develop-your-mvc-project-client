import axios from "axios";

export async function syncUser(userToken, data) {
	console.log(userToken);
	
  const response = await axios({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: "/users/sync",
		method: "POST",
    headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3000",
      Authorization: `Bearer ${userToken}`,
    },
		data
  });

	return response;
}


export async function getUsers(token, params) {
	const { page = 1 } = params;

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/users?page=${page}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}

export async function getUser(token, params) {
	const { id = undefined } = params;

	if (!id) throw new Error("User ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/users/${id}`,
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}

export async function createUser(token, data) {
	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: "/users",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

export async function updateUser(token, params, data) {
	const { id = undefined } = params;

	if (!id) throw new Error("User ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/users/${id}`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

export async function deleteUser(token, params, data) {
	const { id = undefined } = params;

	if (!id) throw new Error("User ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/users/${id}`,
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

export async function getProducts(params) {
	const { page = 1 } = params;

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/products?page=${page}`,
		method: "GET",
	});

	return response;
}

export async function getProduct(params) {
	const { id = undefined } = params;

	if (!id) throw new Error("Product ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/products/${id}`,
		method: "GET",
	});

	return response;
}

export async function createProduct(token, data) {
	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: "/products",
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

export async function updateProduct(token, params, data) {
	const { id = undefined } = params;

	if (!id) throw new Error("Product ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/products/${id}`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

export async function deleteProduct(token, params, data) {
	const { id = undefined } = params;

	if (!id) throw new Error("Product ID is required");

	const response = await axios({
		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
		url: `/products/${id}`,
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
	});

	return response;
}

// export async function syncUser(params) {
// 	const { email, uid } = params;

// 	const response = await axios({
// 		baseURL: process.env.REACT_APP_SERVER_BASE_URL,
// 		url: "/users/sync",
// 		method: "POST",
// 		data: {
// 			email,
// 			uid,
// 		},
// 	});

// 	return response;
// }