import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

function request(config) {
	return instance
		.request(config)
		.then((response) => Promise.resolve(response.data))
		.catch((error) =>
			error.response ? Promise.resolve(error.response.data) : Promise.reject({ success: false, message: error.message })
		);
}

export { instance, request };
