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

export default function ProductList(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const { currentUser } = useAuth();
	const [{ status: getStatus, error: getError, response }, getProducts] = useFetchProducts();
	const [{ status: deleteStatus, error: deleteError }, deleteProduct, clearDeleteProductStatus] = useDeleteProduct();
	const { data: products, lastPage } = response;
	const navigate = useNavigate();

	const handleDelete = (id) => {
		deleteProduct(currentUser?.accessToken, id);
	};

	useEffect(() => {
		getProducts(currentPage);
	}, [getProducts, currentPage]);

	useEffect(() => {
		if (deleteStatus === "success") {
			getProducts(currentPage);

			setTimeout(() => {
				clearDeleteProductStatus();
			}, 2000);
		}
	}, [getProducts, currentPage, deleteStatus, clearDeleteProductStatus]);

	return (
		<Container as="main">
			{getStatus === "loading" && (
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			)}
			{getStatus === "success" && products && (
				<>
					<Container className="mb-3">
						<div className="d-flex justify-content-between align-items-center">
							<h1 className="fw-light m-0">Products</h1>
							<Button variant="outline-secondary" onClick={() => navigate("new")}>
								<AddIcon />
							</Button>
						</div>
						<hr className="mt-2 mb-3" />
						{deleteStatus === "error" && <Alert variant="danger text-center">{deleteError.message}</Alert>}
						{deleteStatus === "success" && <Alert variant="success text-center">Product deleted successfully</Alert>}
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
			{getStatus === "error" && <Error message={getError.message} />}
		</Container>
	);
}
