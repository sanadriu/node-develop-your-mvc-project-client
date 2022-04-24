import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { getUserOrder } from "../../../api/orders.api";

import Error from "../../../components/Error";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

export default function AccountOrderDetails() {
	const { numOrder } = useParams();
	const { user, getCurrentUserToken } = useAuth();

	const { response, error, isLoading, isFailed, sendRequest } = useRequest(getUserOrder);

	useEffect(() => {
		getCurrentUserToken().then((token) => {
			sendRequest({ token, params: { index: numOrder }, id: user._id });
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
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Order details</h1>
							<span className="fw-light">{`Order #${response.data._id}`}</span>
						</div>
						<hr className="mt-2 mb-3" />
						<div>
							<h6 className="fs-6 py-2 fw-normal border-bottom">Order billing summary</h6>
							<ListGroup className="mb-2">
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Purchase cost (€)</span>
									<span className="fw-light">
										{response.data.products.reduce((acc, product) => acc + product.price, 0)}
									</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Shipping cost (€)</span>
									<span className="fw-light">{response.data.shippingCost}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>nº items</span>
									<span className="fw-light">{response.data.products.length}</span>
								</ListGroup.Item>
							</ListGroup>
							<h6 className="fs-6 py-2 fw-normal border-bottom">Shipping Address</h6>
							<ListGroup className="mb-2">
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Address</span>
									<span className="fw-light">{response.data.shippingAddress.address}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>City</span>
									<span className="fw-light">{response.data.shippingAddress.city}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Postal code</span>
									<span className="fw-light">{response.data.shippingAddress.postalCode}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Country code</span>
									<span className="fw-light">{response.data.shippingAddress.countryCode}</span>
								</ListGroup.Item>
							</ListGroup>
							<h6 className="fs-6 py-2 fw-normal border-bottom">Products</h6>
							<ListGroup className="mb-2">
								{response.data.products.map((item) => {
									return item.product !== null ? (
										<ListGroup.Item
											key={item.product._id}
											className="d-flex justify-content-between align-items-center p2"
										>
											<div className="d-flex justify-content-between align-items-center p2 gap-3">
												<img
													className="rounded"
													style={{ aspectRatio: 1, width: "3rem" }}
													src={item.product.images[0]}
													alt="product"
												/>
												<span className="fw-light">{item.product.title}</span>
											</div>
											<span className="fw-light">{`${item.units} uds. X ${item.price} €`}</span>
										</ListGroup.Item>
									) : (
										<ListGroup.Item key={item.product} className="d-flex justify-content-between align-items-center p2">
											<span className="fw-light fst-italic">Deleted product</span>
											<span className="fw-light">{`${item.units} uds. X ${item.price} €`}</span>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</div>
					</Container>
				</>
			)}
			{!isLoading && response?.success === false && <Error message={response.message} />}
			{!isLoading && isFailed && <Error message={error.message} />}
		</Container>
	);
}
