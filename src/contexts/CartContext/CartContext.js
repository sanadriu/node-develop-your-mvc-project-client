import { createContext, useContext, useReducer } from "react";
import { reducer, actionTypes } from "./reducer";

const initialState = {
	cartItems: [],
};

const CartContext = createContext();

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cartItems } = state;

	const value = {
		cartItems,
		addItem: (product) => {
			dispatch({ type: actionTypes.ADD_ITEM, payload: { product } });
		},
		removeItem: (product) => {
			dispatch({ type: actionTypes.REMOVE_ITEM, payload: { product } });
		},
		changeUnitsItem: (product, units) => {
			dispatch({ type: actionTypes.CHANGE_UNITS_ITEM, payload: { product, units } });
		},
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function AuthConsumer({ children }) {
	return <CartContext.Consumer>{children}</CartContext.Consumer>;
}

function getCartSubtotal(item) {
	return item.price * item.quantity, 0;
	}

function useCart() {
	return useContext(CartContext) || null;
}

export { AuthProvider, AuthConsumer, useCart, getCartSubtotal };
