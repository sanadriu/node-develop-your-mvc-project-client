import { useReducer, createContext, useContext } from "react";
import { useCreateOrder } from "../../hooks";
import { useAuth } from "../AuthContext/AuthContext.js";
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
		cardHolderName: "",
		cardNumber: "",
		cardExpirationMonth: "",
		cardExpirationYear: "",
		cardCVV: "",
	},

};

const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
	const { currentUser } = useAuth();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [{ createOrderStatus, createOrderError }, createOrder] = useCreateOrder();

	return (
		<CheckoutContext.Provider
			value={{
				state,
				createOrderStatus,
				createOrderError,
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
				setOrder: (values) => {
					dispatch({ type: actionTypes.SET_ORDER, payload: values });
				},
				createOrder: () => {
					const order = {
						user: currentUser?._id,
						shippingCost: 5,
						shippingAddress: state.shippingAddress,
						paymentDetails: state.paymentDetails,
						OrderSummary: state.OrderSummary,
						products: [],
					};

					createOrder(currentUser?.accessToken, order);
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
