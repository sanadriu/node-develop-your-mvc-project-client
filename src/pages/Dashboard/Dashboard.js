import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

const allowedRoles = ["admin", "main-admin"];

export default function Dashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!allowedRoles.includes(user?.role)) navigate("/home", { replace: true });
	}, [user, navigate]);

	return (
		<Container className="d-flex flex-column min-vh-100 p-0" fluid>
			<Header />
			<Container as="main" className="d-flex flex-column flex-grow-1 p-3">
				<Row>
					<Col xs={12} md={4} lg={3} className="p-1 mb-3">
						<ListGroup as="ul">
							<ListGroup.Item
								as="li"
								onClick={() => navigate("users")}
								active={location.pathname === "/dashboard/users"}
							>
								Users
							</ListGroup.Item>
							<ListGroup.Item
								as="li"
								onClick={() => navigate("products")}
								active={location.pathname === "/dashboard/products"}
							>
								Products
							</ListGroup.Item>
							<ListGroup.Item
								as="li"
								onClick={() => navigate("orders")}
								active={location.pathname === "/dashboard/orders"}
							>
								Orders
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col xs={12} md={8} lg={9} className="p-1 mb-3">
						<Outlet />
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
