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
	phone: yup
		.string()
		.required("Phone number is required.")
		.test("validate-phone-number", "Phone number is invalid", (value) => {
			return value && validator.isMobilePhone(value, "any", { strictMode: true });
		}),
	passwordChange: yup.boolean(),
	password: yup
		.string()
		.test("required-password", "Password is required", function (value) {
			return this.parent.passwordChange ? value.length : true;
		})
		.test("validate-password", "Password must be more secure", function (value) {
			return this.parent.passwordChange ? value && validator.isStrongPassword(value) : true;
		}),
	passwordConfirm: yup
		.string()
		.test("required-confirm-password", "Password confirm is required", function (value) {
			return this.parent.passwordChange ? value.length : true;
		})
		.test("validate-confirm-password", "Password doesn't match", function (value) {
			return value === this.parent.password;
		}),
});

export default schema;
