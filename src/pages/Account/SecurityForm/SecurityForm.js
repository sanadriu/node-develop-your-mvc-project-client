import { useAuth } from "../../../contexts/AuthContext";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

export default function SecurityForm(props) {
	const { currentUser, sendPasswordResetEmail, isLoading, authError } = useAuth();

	const handleResetPassword = () => {
		sendPasswordResetEmail(currentUser?.email);
	};

	return (
		<Container as="main">
			<h4 className="fw-light m-0">Change Password</h4>
			<hr className="mt-2 mb-3" />
			{authError && <Alert variant="danger text-center">{authError.message}</Alert>}
			<ListGroup>
				<ListGroup.Item className="d-flex justify-content-between align-items-center">
					<span>Send reset password email</span>
					<Button variant="warning" onClick={handleResetPassword} disabled={isLoading}>
						Reset password
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</Container>
	);
}
