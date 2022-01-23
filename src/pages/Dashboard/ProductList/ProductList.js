import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct, useFetchProducts } from "../../../hooks";
import { useAuth } from "../../../contexts/AuthContext";

import Error from "../../../components/Error";
import NavPagination from "../../../components/NavPagination";
import { AddIcon, DeleteIcon, EditIcon } from "../../../components/Icons";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function ProductList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { user } = useAuth();
	const { fetchRequest, fetchResponse } = useFetchProducts();
	const { deleteRequest, deleteResponse } = useDeleteProduct();
	const { data: products, lastPage } = response;
	const navigate = useNavigate();

	const handleDelete = (id) => {
		if (!user) return;

		const token = user.accessToken;
		const params = { id };

		deleteRequest.send({ token, params });
	};

	useEffect(() => {
		const params = { page: currentPage };

		fetchRequest.send({ params });
	}, [fetchRequest.send, currentPage]);

	useEffect(() => {
		if (deleteRequest.status !== "done") return;

		const params = {
			page: currentPage,
		};

		fetchRequest.send(params);

		setTimeout(() => deleteRequest.clear(), 2000);
	}, [fetchRequest.send, currentPage, deleteRequest.status, deleteRequest.clear]);

	return (
		<Container as="main">
			{fetchRequest.status === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{fetchRequest.status === "done" && fetchResponse.success && (
				<>
					<Container className="mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Products</h1>
							<Button variant="outline-secondary" onClick={() => navigate("new")}>
								<AddIcon />
							</Button>
						</div>
						<hr className="mt-2 mb-3" />
						{deleteRequest.status === "done" && deleteResponse.success && (
							<Alert variant="success text-center">Product deleted successfully</Alert>
						)}
						{deleteRequest.status === "done" && !deleteResponse.success && (
							<Alert variant="danger text-center">{deleteResponse.message}</Alert>
						)}
						{deleteRequest.status === "error" && (
							<Alert variant="danger text-center">{deleteRequest.error.message}</Alert>
						)}
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
						<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
					</Container>
				</>
			)}
			{fetchRequest.status === "done" && !fetchResponse.success && <Error message={fetchResponse.message} />}
			{fetchRequest.status === "error" && <Error message={fetchRequest.error.message} />}
		</Container>
	);
}
