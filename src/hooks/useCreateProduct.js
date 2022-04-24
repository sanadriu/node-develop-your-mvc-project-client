import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "./useRequest";
import { createProduct } from "../api/products.api";
import validationSchema from "../validation/createProduct.schema";

const initialValues = {
	title: "",
	description: "",
	price: 0,
	stock: 0,
	image: "",
};

export function useCreateProduct() {
	const navigate = useNavigate();
	const { getCurrentUserToken } = useAuth();
	const { response, error, isLoading, isFailed, sendRequest } = useRequest(createProduct);

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
