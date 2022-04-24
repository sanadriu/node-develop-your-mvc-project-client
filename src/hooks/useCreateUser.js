import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "./useRequest";
import { createUser } from "../api/users.api";
import validationSchema from "../validation/createUser.schema";

const initialValues = {
	role: "",
	email: "",
	phone: "",
	firstname: "",
	lastname: "",
	password: "",
	passwordConfirm: "",
};

export function useCreateUser() {
	const navigate = useNavigate();
	const { getCurrentUserToken } = useAuth();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(createUser);

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (response?.success) return;

			getCurrentUserToken().then((token) => {
				sendRequest({ token, data: values });
			});
		},
	});

	useEffect(() => {
		if (response?.success) setTimeout(() => navigate("./.."), 2000);
	}, [response, navigate]);

	return {
		form: { ...formik },
		createRequest: { response, error, isLoading, isFailed },
	};
}
