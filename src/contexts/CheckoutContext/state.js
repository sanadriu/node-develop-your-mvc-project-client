const initialState = {
	step: 1,
	shippingAddress: {
		address: "",
		city: "",
		postalCode: "",
		countryCode: "ES",
	},
	paymentDetails: {
		cardHolderName: "",
		cardNumber: "",
		cardExpirationMonth: "",
		cardExpirationYear: "",
		cardCVV: "",
	},
};

export default initialState;
