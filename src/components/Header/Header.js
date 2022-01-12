import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Cart from "../Cart";
import NavLink from "../NavLink";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function Header(props) {
	const { currentUser } = useAuth();
	const [displayCart, setDisplayCart] = useState(false);
	return (
		<>
			<header>
				<Navbar bg="dark" variant="dark" expand="sm">
					<Container className="d-flex justify-content-between">
						<Navbar.Brand href="/">Dummyland</Navbar.Brand>
						<Navbar.Toggle aria-controls="main-navbar" />
						<Navbar.Collapse id="main-navbar">
							<Nav>
								<NavLink to="/home">Home</NavLink>
								{!currentUser && (
									<>
										<NavLink to="/sign-up">Sign Up</NavLink>
										<NavLink to="/sign-in">Sign In</NavLink>
									</>
								)}
								{currentUser && (
									<>
										{["admin", "main-admin"].includes(currentUser?.role) && (
											<NavLink to="/dashboard">Dashboard</NavLink>
										)}
										<NavLink to="/account">Account</NavLink>
										<NavLink to="/checkout">Checkout</NavLink>
										<NavLink to="/sign-out">Sign Out</NavLink>
										<Button
											onClick={() => setDisplayCart(!displayCart)}
											type="button"
											id="sidebarCollapse"
											className="btn btn-primary"
										>
											<span>Cart</span>
										</Button>
									</>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<Cart show={!displayCart} />
		</>
	);
}
