import * as yup from "yup";
import validator from "validator";

const schema = yup.object({
	firstname: yup
		.string()
		.required("First name is required")
		.max(32, "First name must have equal or less than 32 characters"),
	lastname: yup
		.string()
		.required("Last name is required")
		.max(32, "Last name must have equal or less than 32 characters"),
	role: yup
		.string()
		.required("User role is required.")
		.oneOf(["customer", "admin"], "Role only must be 'customer' or 'admin'"),
	email: yup.string().required("Email address is required.").email("Email is invalid.").max(64),
	phone: yup
		.string()
		.required("Phone number is required.")
		.test("validate-phone-number", "Phone number is invalid", (value) => {
			return value && validator.isMobilePhone(value, "any", { strictMode: true });
		}),

	password: yup
		.string()
		.required("Password is required")
		.test("validate-password", "Password must be more secure", function (value) {
			return value && validator.isStrongPassword(value);
		}),
	passwordConfirm: yup
		.string()
		.required("Password confirmation is required")
		.test("validate-confirm-password", "Password doesn't match", function (value) {
			return value === this.parent.password;
		}),
});

export default schema;
