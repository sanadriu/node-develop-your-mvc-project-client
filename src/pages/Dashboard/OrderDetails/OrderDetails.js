import { useParams } from "react-router-dom";
import { useOrderDetails } from "../../../hooks/useOrderDetails";

import Error from "../../../components/Error";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

export default function OrderDetails() {
	const { idOrder } = useParams();
	const {
		getRequest: { response, error, isLoading, isFailed },
	} = useOrderDetails();

	if (isLoading) {
		return (
			<Container as="main">
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			</Container>
		);
	}

	if (isFailed) {
		return (
			<Container as="main">
				<Error message={error?.message} />
			</Container>
		);
	}

	if (!response?.success) {
		return (
			<Container as="main">
				<Error message={response?.message} />
			</Container>
		);
	}

	const { data: order } = response;

	return (
		<Container as="main">
			<Container className="mb-3">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="fw-light m-0">Order details</h1>
					<span className="fw-light">{`Order #${idOrder}`}</span>
				</div>
				<hr className="mt-2 mb-3" />
				<div>
					<h6 className="fs-6 py-2 fw-normal border-bottom">Order billing summary</h6>
					<ListGroup className="mb-2">
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Purchase cost (€)</span>
							<span className="fw-light">{order.products.reduce((acc, product) => acc + product.price, 0)}</span>
						</ListGroup.Item>
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Shipping cost (€)</span>
							<span className="fw-light">{order.shippingCost}</span>
						</ListGroup.Item>
						<ListGroup.Item className="d-flex justify-content-between">
							<span>nº items</span>
							<span className="fw-light">{order.products.length}</span>
						</ListGroup.Item>
					</ListGroup>
					{order.user !== null && (
						<>
							<h6 className="fs-6 py-2 fw-normal border-bottom">User</h6>
							<ListGroup className="mb-2">
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Email address</span>
									<span className="fw-light">{order.user.email}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Phone number</span>
									<span className="fw-light">{order.user.phone}</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Fullname</span>
									<span className="fw-light">
										{order.user.firstname && order.user.lastname
											? `${order.user.firstname} ${order.user.lastname}`
											: "Not specified"}
									</span>
								</ListGroup.Item>
								<ListGroup.Item className="d-flex justify-content-between">
									<span>Email</span>
									<span className="fw-light">{order.user.email}</span>
								</ListGroup.Item>
							</ListGroup>
						</>
					)}
					<h6 className="fs-6 py-2 fw-normal border-bottom">Shipping Address</h6>
					<ListGroup className="mb-2">
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Address</span>
							<span className="fw-light">{order.shippingAddress.address}</span>
						</ListGroup.Item>
						<ListGroup.Item className="d-flex justify-content-between">
							<span>City</span>
							<span className="fw-light">{order.shippingAddress.city}</span>
						</ListGroup.Item>
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Postal code</span>
							<span className="fw-light">{order.shippingAddress.postalCode}</span>
						</ListGroup.Item>
						<ListGroup.Item className="d-flex justify-content-between">
							<span>Country code</span>
							<span className="fw-light">{order.shippingAddress.countryCode}</span>
						</ListGroup.Item>
					</ListGroup>
					<h6 className="fs-6 py-2 fw-normal border-bottom">Products</h6>
					<ListGroup className="mb-2">
						{order.products.map((item) => {
							return item.product !== null ? (
								<ListGroup.Item key={item.product._id} className="d-flex justify-content-between align-items-center p2">
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
		</Container>
	);
}
