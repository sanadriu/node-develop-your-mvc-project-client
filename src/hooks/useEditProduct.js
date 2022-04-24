import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "./useRequest";
import { getProduct, updateProduct } from "../api/products.api";
import validationSchema from "../validation/editProduct.schema";

const initialValues = {
	title: "",
	description: "",
	price: 0,
	stock: 0,
	image: "",
};

export function useEditProduct() {
	const navigate = useNavigate();
	const { idProduct } = useParams();
	const { getCurrentUserToken } = useAuth();
	const { sendRequest: sendGet, response: getResponse, ...getState } = useRequest(getProduct);
	const { sendRequest: sendUpdate, response: updateResponse, ...updateState } = useRequest(updateProduct);

	const formik = useFormik({
		initialValues: getResponse?.data || initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			if (updateResponse?.success) return;

			getCurrentUserToken().then((token) => {
				sendUpdate({ token, id: idProduct, data: values });
			});
		},
	});

	useEffect(() => {
		sendGet({ id: idProduct });
	}, [sendGet, idProduct]);

	useEffect(() => {
		if (updateResponse?.success) setTimeout(() => navigate("./.."), 2000);
	}, [updateResponse, navigate]);

	return {
		form: { ...formik },
		getRequest: {
			...getState,
			response: getResponse,
		},
		updateRequest: {
			...updateState,
			response: updateResponse,
		},
	};
}
