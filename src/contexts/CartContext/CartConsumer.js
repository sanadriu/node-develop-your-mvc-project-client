import { CartContext } from "./CartContext";

export function CartConsumer({ children }) {
	return <CartContext.Consumer>{children}</CartContext.Consumer>;
}
