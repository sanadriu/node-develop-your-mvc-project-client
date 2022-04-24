import { request } from "../services/api.service";
import ApiRoutes from "./constants/routes";
import ApiErrors from "./constants/errors";

export async function userSignIn({ signal, token }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const response = await request({
		url: `${ApiRoutes.users}/sign-in`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	});

	return response;
}

export async function userSignOut({ signal, token }) {
	if (!token) return Promise.reject(ApiErrors.missing_auth_token);

	const response = await request({
		url: `${ApiRoutes.users}/sign-out`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		signal,
	});

	return response;
}

export async function userSignUp({ signal, token, data }) {
	const response = request({
		url: `${ApiRoutes.users}/sign-up`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data,
		signal,
	});

	return response;
}

// "Content-Type": "application/json",
// "Access-Control-Allow-Origin": "http://localhost:3000",
