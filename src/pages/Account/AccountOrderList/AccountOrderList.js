import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { getUserOrders } from "../../../api/orders.api";

import Error from "../../../components/Error";
import NavPagination from "../../../components/NavPagination";
import { DetailsIcon } from "../../../components/Icons";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function AccountOrderList() {
	const [page, setPage] = useState(1);
	const { user, getCurrentUserToken } = useAuth();
	const navigate = useNavigate();

	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getUserOrders);

	useEffect(() => {
		getCurrentUserToken().then((token) => {
			sendRequest({ token, params: { page }, id: user._id });
		});
	}, [sendRequest, user, page]);

	return (
		<Container as="main">
			{isLoading && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{!isLoading && response?.success === true && (
				<>
					<Container className="mb-3">
						<h1 className="fw-light m-0">Orders</h1>
						<hr className="mt-2 mb-3" />
						<ListGroup as="ul">
							{response.data.map((order, index) => (
								<ListGroup.Item
									className="d-flex justify-content-between align-items-center p-0"
									as="li"
									xs={12}
									sm={6}
									md={3}
									key={order._id}
								>
									<div className="flex-grow-1 p-3 border-end">
										<h5 className="fw-light fs-5">{order._id}</h5>
										<div className="d-flex justify-content-between my-1">
											<span>Purchase cost (€)</span>
											<span className="fw-light">
												{order.products.reduce((acc, product) => acc + product.price, 0)}
											</span>
										</div>
										<div className="d-flex justify-content-between my-1">
											<span>Shipping cost (€)</span>
											<span className="fw-light">{order.shippingCost}</span>
										</div>
										<div className="d-flex justify-content-between my-1">
											<span>nº items</span>
											<span className="fw-light">{order.products.length}</span>
										</div>
									</div>
									<Button variant="outline-secondary" className="m-3" onClick={() => navigate(index + 1)}>
										<DetailsIcon />
									</Button>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Container>
					<Container className="d-flex flex-row justify-content-center">
						<NavPagination page={page} lastPage={response.lastPage} setPage={setPage} />
					</Container>
				</>
			)}
			{!isLoading && response?.success === false && <Error message={response.message} />}
			{!isLoading && isFailed && <Error message={error.message} />}
		</Container>
	);
}
