import { Outlet, useNavigate } from "react-router-dom";
import { useCheckout } from "../../contexts/CheckoutContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useEffect } from "react";

import Header from "../../components/Header";
import Container from "react-bootstrap/Container";

const steps = { 1: "Shipping address", 2: "Payments details", 3: "Order summary" };

export default function Checkout() {
	const { currentUser } = useAuth();
	const { cartItems } = useCart();
	const {
		state: { step },
	} = useCheckout();

	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser === null) navigate("/sign-in");
	}, [navigate, currentUser]);

	useEffect(() => {
		if (cartItems.length === 0) navigate("/home");
	}, [navigate, cartItems]);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-2">
				<Container className="mb-4" style={{ maxWidth: "768px" }}>
					<header className="d-flex align-items-center justify-content-between">
						<h2 className="fw-light">{steps[step]}</h2>
						<span>{step} of 3</span>
					</header>
					<hr className="mt-0 mb-3" />
					<div className="d-flex justify-content-center shadow p-3bg-white rounded">
						<Outlet />
					</div>
				</Container>
			</main>
		</div>
	);
}
