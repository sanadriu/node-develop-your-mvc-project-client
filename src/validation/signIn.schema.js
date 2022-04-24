import * as yup from "yup";

const schema = yup.object({
	email: yup.string().required("Email address is required"),
	password: yup.string().required("Password is required"),
});

export default schema;
