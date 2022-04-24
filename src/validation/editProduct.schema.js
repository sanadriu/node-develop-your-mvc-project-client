import * as yup from "yup";
import validator from "validator";

const schema = yup.object({
	title: yup.string().required("Title is required").max(64, "Title must not exceed 64 characters"),
	description: yup.string().required("Description is required").max(512, "Description must not exceed 512 characters"),
	price: yup.number().required("Price is required.").min(0, "Price must be equal or greater than 0"),
	stock: yup.number().required("Stock is required.").min(0, "Stock must be equal or greater than 0"),
	image: yup.string().test("validate-image", "Image must be a valid URL", function (value) {
		return value && validator.isURL(value);
	}),
});

export default schema;
