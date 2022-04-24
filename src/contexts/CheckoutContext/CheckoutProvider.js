import { useCallback, useReducer } from "react";
import reducer from "../../reducers/cart/reducer";
import initialState from "../../reducers/checkout/state";
import { CheckoutContext } from "./CheckoutContext";
import {
	goBackHandler,
	goForwardHandler,
	setBillingAddressHandler,
	setCheckoutOrderHandler,
	setPaymentDetailsHandler,
} from "./handlers";

export function CheckoutProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const goBack = useCallback(() => goBackHandler(dispatch), [dispatch]);
	const goForward = useCallback(() => goForwardHandler(dispatch), [dispatch]);
	const setBillingAddress = useCallback((values) => setBillingAddressHandler(dispatch, values), [dispatch]);
	const setPaymentDetails = useCallback((values) => setPaymentDetailsHandler(dispatch, values), [dispatch]);
	const setOrder = useCallback((values) => setCheckoutOrderHandler(dispatch, values), [dispatch]);

	return (
		<CheckoutContext.Provider
			value={{
				...state,
				goBack,
				goForward,
				setBillingAddress,
				setPaymentDetails,
				setOrder,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	);
}
