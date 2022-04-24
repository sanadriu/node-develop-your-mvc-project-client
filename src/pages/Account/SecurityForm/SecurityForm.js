import { useAuth } from "../../../contexts/AuthContext";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function SecurityForm() {
	const { sendPasswordResetEmail } = useAuth();

	return (
		<Container as="main">
			<h4 className="fw-light m-0">Change Password</h4>
			<hr className="mt-2 mb-3" />
			<ListGroup>
				<ListGroup.Item className="d-flex justify-content-between align-items-center">
					<span>Send reset password email</span>
					<Button variant="warning" onClick={sendPasswordResetEmail}>
						Reset password
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</Container>
	);
}
