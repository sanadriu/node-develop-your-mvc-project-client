import { useReducer, createContext, useContext } from "react";
import { actionTypes, reducer } from "./reducer.js";

const initialState = {
	step: 1,
	shippingAddress: {
		address: "",
		city: "",
		postalCode: "",
		countryCode: "ES",
	},
	paymentDetails: {
		method: "Card",
		cardHolderName: "",
		cardNumber: "",
		cardExpirationMonth: "",
		cardExpirationYear: "",
		cardCVV: "",
	},
	orderCosts: {
		subtotal: 0,
		shipping: 0,
	},
};

const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<CheckoutContext.Provider
			value={{
				state,
				goBack: () => {
					dispatch({ type: actionTypes.BACK });
				},
				goNext: () => {
					dispatch({ type: actionTypes.NEXT });
				},
				setShippingAddress: (values) => {
					dispatch({ type: actionTypes.SET_SHIPPING_ADDRESS, payload: values });
				},
				setPaymentDetails: (values) => {
					dispatch({ type: actionTypes.SET_PAYMENT_DETAILS, payload: values });
				},
			}}
		>
			{children}
		</CheckoutContext.Provider>
	);
}

function CheckoutConsumer({ children }) {
	return <CheckoutContext.Consumer>{children}</CheckoutContext.Consumer>;
}

function useCheckout() {
	return useContext(CheckoutContext) || null;
}

export { CheckoutProvider, CheckoutConsumer, useCheckout };
