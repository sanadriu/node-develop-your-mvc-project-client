import { useSignUp } from "../../hooks/useSignup";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

export default function SignUp() {
	const { handleSubmit, signUpState, errors } = useSignUp();

	console.log(errors, signUpState);

	return (
		<Layout>
			<Card style={{ width: "32rem" }}>
				<Card.Body className="bg-light">
					<h1 className="text-center fw-light fs-3 my-3">Sign Up</h1>
					{signUpState.isFailed && <Alert variant="danger text-center">{signUpState.error.message}</Alert>}
					<Form className="p-2" onSubmit={handleSubmit}>
						<div className="d-flex gap-2">
							<Form.Group className="w-50 mb-3">
								<Form.Label htmlFor="input-firstname">First name</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input-firstname"
										name="firstname"
										type="text"
										placeholder="John"
										isInvalid={Boolean(errors?.firstname)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.firstname}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group className="w-50 mb-3">
								<Form.Label htmlFor="input-lastname">Last name</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										id="input-lastname"
										name="lastname"
										type="text"
										placeholder="Doe"
										isInvalid={Boolean(errors?.lastname)}
									/>
									<Form.Control.Feedback type="invalid">{errors?.lastname}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</div>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="input-email">Email address</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									id="input-email"
									name="email"
									type="text"
									placeholder="john.doe@mail.com"
									isInvalid={Boolean(errors?.email)}
								/>
								<Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="input-phone">Phone number</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									id="input-phone"
									name="phone"
									type="tel"
									placeholder="+447900000000"
									isInvalid={Boolean(errors?.phone)}
								/>
								<Form.Control.Feedback type="invalid">{errors?.phone}</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="input-password">Password</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									id="input-password"
									name="password"
									type="password"
									isInvalid={Boolean(errors?.password)}
								/>
								<Form.Control.Feedback type="invalid">{errors?.password}</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="input-password-confirm">Password confirmation</Form.Label>
							<InputGroup hasValidation>
								<Form.Control
									id="input-password-confirm"
									name="passwordConfirm"
									type="password"
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
							disabled={signUpState.isLoading}
						>
							<span>Sign Up</span>
							{signUpState.isLoading && <div className="spinner-border spinner-border-sm" role="status"></div>}
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
		</Layout>
	);
}
