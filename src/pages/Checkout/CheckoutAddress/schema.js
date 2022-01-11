import * as Yup from "yup";
import validator from "validator";

const schema = Yup.object({
	address: Yup.string().required("Address is required."),
	city: Yup.string().required("City is required."),
	postalCode: Yup.string()
		.required("Zip code is required.")
		.test("validate-postal-code", "Invalid postal code for the specified country", function (value) {
			return value && this.parent.countryCode && validator.isPostalCode(value, this.parent.countryCode);
		}),
	countryCode: Yup.string()
		.required("Country is required.")
		.test("validate-country-code", "Invalid country code", function (value) {
			return value && validator.isISO31661Alpha2(value);
		}),
});

export default schema;
