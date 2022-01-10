import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

export default function Account(props) {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!["admin", "main-admin"].includes(currentUser?.role)) navigate("/home", { replace: true });
	}, [currentUser, navigate]);

	return (
		<Container className="d-flex flex-column min-vh-100 p-0" fluid>
			<Header />
			<Container as="main" className="d-flex flex-column flex-grow-1 p-3">
				<Row>
					<Col xs={12} sm={4} lg={3} className="p-1">
						<ListGroup as="ul">
							<ListGroup.Item
								as="li"
								onClick={() => navigate("security")}
								active={location.pathname === "/account/security"}
							>
								Security
							</ListGroup.Item>
							<ListGroup.Item
								as="li"
								onClick={() => navigate("addresses")}
								active={location.pathname === "/account/addresses"}
							>
								Addresses
							</ListGroup.Item>
							<ListGroup.Item
								as="li"
								onClick={() => navigate("order")}
								active={location.pathname === "/account/orders"}
							>
								Orders
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col xs={12} sm={8} lg={9} className="p-1">
						<Outlet />
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
