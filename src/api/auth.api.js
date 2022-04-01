import { request } from "../services/api";
import ApiRoutes from "./constants/routes";
import ApiErrors from "./constants/errors";

export async function userSync({ signal, token }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const response = await request({
		url: `${ApiRoutes.users}/sync`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "http://localhost:3000",
		},
		signal,
	});

	return response;
}

export async function userRegister({ signal, data }) {
	const response = request({
		url: `${ApiRoutes.users}/register`,
		method: "POST",
		data,
		signal,
	});

	return response;
}
