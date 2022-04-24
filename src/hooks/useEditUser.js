import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";
import { useRequest } from "./useRequest";
import { getUser, updateUser } from "../api/users.api";
import validationSchema from "../validation/editUser.schema";

const initialValues = {
	role: "",
	phone: "",
	firstname: "",
	lastname: "",
	password: "",
	passwordConfirm: "",
	passwordChange: false,
};

export function useEditUser() {
	const navigate = useNavigate();
	const { idUser } = useParams();
	const { getCurrentUserToken } = useAuth();
	const { sendRequest: sendGet, response: getResponse, ...getState } = useRequest(getUser);
	const { sendRequest: sendUpdate, response: updateResponse, ...updateState } = useRequest(updateUser);

	const formik = useFormik({
		initialValues: getResponse?.data || initialValues,
		validationSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
			if (updateResponse?.success) return;

			getCurrentUserToken().then((token) => {
				sendUpdate({ token, id: idUser, data: values });
			});
		},
	});

	useEffect(() => {
		sendGet({ id: idUser });
	}, [sendGet, idUser]);

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
