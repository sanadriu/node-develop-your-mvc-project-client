import * as yup from "yup";
import validator from "validator";

const schema = yup.object({
	firstname: yup.string().required("First name is required").max(32, "First name must have equal or less than 32 characters"),
	lastname: yup.string().required("Last name is required").max(32,"Last name must have equal or less than 32 characters"),
	email: yup.string().required("Email address is required.").email("Email is invalid.").max(64),
	phone: yup.string().required("Phone number is required.").test("validate-phone-number", "Phone number is invalid", (value) => validator.isMobilePhone(value, "any", {strictMode: true})),
  password: yup.string().required("Password is required").test("validate-password", "Password doesn't match", (value) => value === yup.ref('passwordConfirm'))
});

export default schema;