import { useNavigate } from "react-router-dom";
import { useListProducts } from "../../../hooks/useListProducts";

import Error from "../../../components/Error";
import NavPagination from "../../../components/NavPagination";
import { AddIcon, DeleteIcon, EditIcon } from "../../../components/Icons";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function ProductList() {
	const navigate = useNavigate();
	const { handleDelete, getRequest, deleteRequest } = useListProducts();

	if (getRequest.isLoading) {
		return (
			<Container as="main">
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			</Container>
		);
	}

	if (getRequest.isFailed) {
		return (
			<Container as="main">
				<Error message={getRequest.error?.message} />
			</Container>
		);
	}

	if (!getRequest.response?.success) {
		return (
			<Container as="main">
				<Error message={getRequest.response?.message} />
			</Container>
		);
	}

	const { lastPage, data: products } = getRequest.response;

	const DeleteAlert = deleteRequest.isFailed ? (
		<Alert variant="danger text-center">{deleteRequest.error.message}</Alert>
	) : deleteRequest.response?.success === false ? (
		<Alert variant="danger text-center">{deleteRequest.response.message}</Alert>
	) : deleteRequest.response?.success === true ? (
		<Alert variant="success text-center">{deleteRequest.response.message}</Alert>
	) : null;

	return (
		<Container as="main">
			<Container className="mb-3">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="fw-light m-0">Products</h1>
					<Button variant="outline-secondary" onClick={() => navigate("new")}>
						<AddIcon />
					</Button>
				</div>
				<hr className="mt-2 mb-3" />
				{!deleteRequest.isLoading && DeleteAlert}
				<ListGroup as="ul">
					{products.map((product) => (
						<ListGroup.Item
							className="d-flex justify-content-between align-items-center"
							as="li"
							xs={12}
							sm={6}
							md={3}
							key={product._id}
						>
							<span className="fw-light">{product.title}</span>
							<div className="d-flex gap-2">
								<Button variant="outline-secondary" onClick={() => navigate(product._id)}>
									<EditIcon />
								</Button>
								<Button variant="outline-secondary" onClick={() => handleDelete(product._id)}>
									<DeleteIcon />
								</Button>
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Container>
			<Container className="d-flex flex-row justify-content-center">
				<NavPagination lastPage={lastPage} />
			</Container>
		</Container>
	);
}
