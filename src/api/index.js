import axios from "axios";

// const api = new axios.create({
// 	baseURL: process.env.REACT_APP_SERVER_BASE_URL,
// 	headers: { "X-Requested-With": "XMLHttpRequest", "Access-Control-Allow-Origin": "*" },
// });

export async function signUp({ email, uid }) {
	const response = await axios({
		baseURL: "http://localhost:4000/",
		url: "/users/sign-up",
		method: "POST",
		data: {
			email,
			uid,
		},
	});

	return response;
}
