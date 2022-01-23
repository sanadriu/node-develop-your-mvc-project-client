import { useAuth } from "../../../contexts/AuthContext";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export default function SecurityForm() {
	const { user, sendPasswordResetEmail, status, error } = useAuth();

	const handleResetPassword = () => {
		sendPasswordResetEmail(user?.email);
	};

	return (
		<Container as="main">
			<h4 className="fw-light m-0">Change Password</h4>
			<hr className="mt-2 mb-3" />
			{error && <Alert variant="danger text-center">{error.message}</Alert>}
			<ListGroup>
				<ListGroup.Item className="d-flex justify-content-between align-items-center">
					<span>Send reset password email</span>
					<Button variant="warning" onClick={handleResetPassword} disabled={status === "loading"}>
						Reset password
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</Container>
	);
}
