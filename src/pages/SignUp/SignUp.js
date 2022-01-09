import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "../../components/Header";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

import { default as schema } from "./schema.js";

export default function SignUp(props) {
	const { currentUser, authError, isLoading, signUpWithEmailAndPassword, resetAuthError } = useAuth();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const firstnameRef = useRef();
	const lastnameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	useEffect(() => {
		return resetAuthError;
	}, [resetAuthError]);

	useEffect(() => {
		if (currentUser) navigate("/home", { replace: true });
	}, [currentUser, navigate]);

	function handleSubmit(event) {
		event.preventDefault();

		const values = {
			firstname: firstnameRef.current.value,
			lastname: lastnameRef.current.value,
			email: emailRef.current.value,
			phone: phoneRef.current.value,
			password: passwordRef.current.value,
			passwordConfirm: passwordConfirmRef.current.value,
		};

		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				setErrors(() => ({}));
				signUpWithEmailAndPassword(values);
			})
			.catch((validationErrors) => {
				const errors = {};

				validationErrors.inner.forEach((validationError) => {
					errors[validationError.path] = validationError.message;
				});

				setErrors(() => errors);
			});
	}

	return (
		<div className="d-flex flex-column vh-100">
			<Header />
			<main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
				<Card style={{ width: "32rem" }}>
					<Card.Body className="bg-light">
						<h1 className="text-center fw-light fs-3 my-3">Sign Up</h1>
						{authError && <Alert variant="danger text-center">{authError.message}</Alert>}
						<Form className="p-2" onSubmit={handleSubmit}>
							<div className="d-flex gap-2">
								<Form.Group className="w-50 mb-3">
									<Form.Label htmlFor="input_firstname">First name</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											id="input_firstname"
											type="text"
											placeholder="John"
											ref={firstnameRef}
											isInvalid={Boolean(errors?.firstname)}
										/>
										<Form.Control.Feedback type="invalid">{errors?.firstname}</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
								<Form.Group className="w-50 mb-3">
									<Form.Label htmlFor="input_lastname">Last name</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											id="input_lastname"
											type="text"
											placeholder="Doe"
											ref={lastnameRef}
											isInvalid={Boolean(errors?.lastname)}
										/>
										<Form.Control.Feedback type="invalid">{errors?.lastname}</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</div>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_email">Email address</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input_email"
										type="text"
										placeholder="john.doe@mail.com"
										ref={emailRef}
										isInvalid={Boolean(errors?.email)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_phone">Phone number</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input_phone"
										type="tel"
										placeholder="+447900000000"
										ref={phoneRef}
										isInvalid={Boolean(errors?.phone)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_password">Password</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input_password"
										type="password"
										placeholder="Password"
										ref={passwordRef}
										isInvalid={Boolean(errors?.password)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.password}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input_password_confirm">Password confirmation</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input_password_confirm"
										type="password"
										placeholder="Password Confirmation"
										ref={passwordConfirmRef}
										isInvalid={Boolean(errors?.passwordConfirm)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.passwordConfirm}</Form.Control.Feedback>
								</InputGroup>
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
					<span>Do you already have an account? </span>
					<Link to="/sign-in" className="text-decoration-none">
						Sign In
					</Link>
				</div>
			</main>
		</div>
	);
}
