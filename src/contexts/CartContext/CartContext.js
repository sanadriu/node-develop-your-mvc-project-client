import { createContext, useContext } from "react";

const initialState = [];

const CartContext = createContext();

function AuthProvider({ children }) {
	return <CartContext.Provider>{children}</CartContext.Provider>;
}

function AuthConsumer({ children }) {
	return <CartContext.Consumer>{children}</CartContext.Consumer>;
}

function useCart() {
	return useContext(CartContext);
}

export { AuthProvider, AuthConsumer, useCart };
