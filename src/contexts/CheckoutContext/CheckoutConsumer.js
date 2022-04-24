import { CheckoutContext } from "./CheckoutContext";

export function CheckoutConsumer({ children }) {
	return <CheckoutContext.Consumer>{children}</CheckoutContext.Consumer>;
}
