import { useCart } from "../../contexts/CartContext/CartContext";
import CartItem from "../CartItem";
import "./style.css";

function getCartTotal(item) {
	return item.price * item.quantity || 0;
}

export default function Cart(props) {
	const { cartItems = [] } = useCart();

	const { show } = props;
	return (
		<>
			<div className="wrapper position-relative">
				<nav id="sidebar" className={`position-absolute end-0 rounded ${show ? "active" : ""}`}>
					<div className="p-3">
						<h2 className="h3 m-0">Shopping Cart</h2>
					</div>
					<hr className="my-0" />
					{cartItems.length > 0 ? (
						cartItems.map((item, index) => <CartItem key={index} item={item} />)
					) : (
						<div className="p-3">
							<h4 className="text-center">Your cart is empty</h4>
						</div>
					)}
					<hr className="my-0" />
					<div className="p-2">
						<div className="d-flex justify-content-between p-3">
							<span className="h5">Total</span>
							<span className="fw-bold">{getCartTotal(cartItems)}€</span>
						</div>
						{cartItems.length > 0 && <button className="btn btn-success w-100 mt-2">Checkout</button>}
					</div>
				</nav>
			</div>
		</>
	);
}
