import { createContext, useCallback, useContext, useReducer } from "react";
import reducer from "./reducer";
import initialState from "./state";
import { addCartItem, removeCartItem, editCartItemUnits } from "./actions";

const CartContext = createContext();

function CartProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cartItems } = state;

	const value = {
		cartItems,
		addCartItem: useCallback((product) => dispatch(addCartItem(product)), [dispatch]),
		removeCartItem: useCallback((product) => dispatch(removeCartItem(product)), [dispatch]),
		editCartItemUnits: useCallback((product, units) => dispatch(editCartItemUnits(product, units)), [dispatch]),
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function CartConsumer({ children }) {
	return <CartContext.Consumer>{children}</CartContext.Consumer>;
}

function useCart() {
	return useContext(CartContext) || null;
}

export { CartProvider, CartConsumer, useCart };
