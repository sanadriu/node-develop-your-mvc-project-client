import * as Yup from "yup";
import cardValidator from "card-validator";

const schema = Yup.object({
	method: Yup.string().required("Select a payment method."),
	cardHolderName: Yup.string()
		.required("Cardholder is required.")
		.test("test-card-holder", "Invalid card holder.", function (value) {
			return cardValidator.cardholderName(value).isValid;
		}),
	cardNumber: Yup.string()
		.required("Card number is required.")
		.test("test-card-number", "Invalid card number.", function (value) {
			return cardValidator.number(value).isValid;
		}),
	cardExpirationMonth: Yup.string()
		.required("Month is required.")
		.test("test-card-expiration-month", "Invalid month.", function (value) {
			return cardValidator.expirationMonth(value).isValid;
		}),
	cardExpirationYear: Yup.string()
		.required("Year is required.")
		.test("test-card-expiration-month", "Invalid year.", function (value) {
			return cardValidator.expirationYear(value).isValid;
		}),
	cardCVV: Yup.string()
		.required("CVC is required.")
		.test("test-cardCVV", "Invalid CVV", function (value) {
			return cardValidator.cvv(value).isValid;
		}),
});

export default schema;
