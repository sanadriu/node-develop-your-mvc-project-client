import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

function request(config) {
	return instance
		.request(config)
		.then((response) => {
			return Promise.resolve(response.data);
		})
		.catch((error) => {
			const { response } = error;

			if (!response) return Promise.reject({ success: false, message: error.message });

			return Promise.resolve(response.data);
		});
}

export { instance, request };
