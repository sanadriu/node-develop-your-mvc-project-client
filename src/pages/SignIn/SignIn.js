import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../components/Header";
import Alert from "react-bootstrap/Alert";

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function SignIn(props) {
	const { currentUser, authError, isLoading, signInWithEmailAndPassword, resetAuthError } = useAuth();
	const navigate = useNavigate();

	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		return resetAuthError;
	}, [resetAuthError]);

	useEffect(() => {
		if (currentUser) navigate("/home", { replace: true });
	}, [currentUser, navigate]);

	function handleSubmit(event) {
		event.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		signInWithEmailAndPassword(email, password);
	}

	return (
		<div className="d-flex flex-column vh-100">
			<Header />
			<main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
				<Card style={{ width: "24rem" }}>
					<Card.Body className="bg-light">
						<h1 className="text-center fw-light fs-3 my-3">Sign In</h1>
						{authError && <Alert variant="danger">{authError.message}</Alert>}
						<Form className="p-2" onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_email">Email address</Form.Label>
								<Form.Control id="input_email" type="email" placeholder="Enter email" ref={emailRef} required />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_password">Password</Form.Label>
								<Form.Control id="input_password" type="password" placeholder="Password" ref={passwordRef} required />
							</Form.Group>
							<Button
								className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
								variant="primary"
								size="sm"
								type="submit"
							>
								<span>Sign In</span>
								{isLoading && <div className="spinner-border spinner-border-sm" role="status"></div>}
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="my-3">
					<span>Don't you have an account? </span>
					<Link to="/sign-up" className="text-decoration-none">
						Sign Up
					</Link>
				</div>
			</main>
		</div>
	);
}
