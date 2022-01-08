import { useState } from "react";
import { useFetchProducts } from "../../hooks";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import NavPagination from "../../components/NavPagination";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Error from "../../components/Error";

export default function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const { response, status, error } = useFetchProducts(currentPage);
	const { data: products, lastPage } = response;

	return (
		<Container className="d-flex flex-column min-vh-100 p-0" fluid>
			<Header />
			<Container as="main" className="d-flex flex-column justify-content-center flex-grow-1">
				{status === "loading" && (
					<Container className="d-flex align-items-center justify-content-center flex-grow-1">
						<Spinner animation="border" role="status" />
					</Container>
				)}
				{status === "success" && products && (
					<>
						<Container className="p-5 flex-grow-1">
							<Row>
								{products.map((product) => (
									<Col xs={12} sm={6} md={3} key={product._id}>
										<p
											className="text-center border p-3"
											style={{ cursor: "pointer" }}
											onClick={() => {
												navigate(`/product/${product._id}`);
											}}
										>
											{product.title}
										</p>
									</Col>
								))}
							</Row>
						</Container>
						<Container className="d-flex flex-row justify-content-center">
							<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
						</Container>
					</>
				)}
				{status === "error" && <Error message={error.message} />}
			</Container>
		</Container>
	);
}

/* <ProductCard title={product.title} description={product.description} images={product.images} stock={product.stock} price={product.price}/> */
