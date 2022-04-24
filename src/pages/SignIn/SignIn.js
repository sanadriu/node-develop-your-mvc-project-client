import { useSignIn } from "../../hooks/useSignIn";

import Header from "../../components/Header";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

export default function SignIn() {
	const { handleSubmit, signInState, errors } = useSignIn();

	return (
		<div className="d-flex flex-column vh-100">
			<Header />
			<main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
				<Card style={{ width: "24rem" }}>
					<Card.Body className="bg-light">
						<h1 className="text-center fw-light fs-3 my-3">Sign In</h1>
						{signInState.isFailed && <Alert variant="danger text-center">{signInState.error.message}</Alert>}
						<Form className="p-2" onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input-email">Email address</Form.Label>
								<InputGroup hasValidation>
									<Form.Control id="input-email" name="email" type="email" />
									<Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="input-password">Password</Form.Label>
								<InputGroup hasValidation>
									<Form.Control id="input-password" name="password" type="password" />
									<Form.Control.Feedback type="invalid">{errors?.password}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Button
								className="w-100 mt-3 d-flex justify-content-center align-items-center gap-2"
								variant="primary"
								size="sm"
								type="submit"
								disabled={signInState.isLoading}
							>
								<span>Sign In</span>
								{signInState.isLoading && <div className="spinner-border spinner-border-sm" role="status"></div>}
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
