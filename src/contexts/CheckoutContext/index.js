import { createContext, useCallback, useContext, useReducer } from "react";
import { useCreateOrder } from "../../hooks";
import { useAuth } from "../AuthContext/AuthContext.js";
import reducer from "./reducer";
import initialState from "./state";
import {
	setCheckoutPrevStep,
	setCheckoutNextStep,
	setCheckoutBillingAddress,
	setCheckoutPaymentDetails,
	setCheckoutOrder,
} from "./actions";

const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { checkout } = state;

	return (
		<CheckoutContext.Provider
			value={{
				checkout,
				setCheckoutPrevStep: useCallback(() => dispatch(setCheckoutPrevStep()), [dispatch]),
				setCheckoutNextStep: useCallback(() => dispatch(setCheckoutNextStep()), [dispatch]),
				setCheckoutBillingAddress: useCallback((values) => dispatch(setCheckoutBillingAddress(values)), [dispatch]),
				setCheckoutPaymentDetails: useCallback((values) => dispatch(setCheckoutPaymentDetails(values)), [dispatch]),
				setCheckoutOrder: useCallback((values) => dispatch(setCheckoutOrder(values)), [dispatch]),
				// createOrderStatus,
				// createOrderError,
				// createOrder: () => {
				// 	const order = {
				// 		user: user?._id,
				// 		shippingCost: 5,
				// 		shippingAddress: state.shippingAddress,
				// 		paymentDetails: state.paymentDetails,
				// 		orderSummary: state.orderSummary,
				// 		products: [],
				// 	};

				// 	createOrder(user?.accessToken, order);
				// },
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
