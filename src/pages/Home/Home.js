import { useEffect, useState } from "react";
import { useFetchProducts } from "../../hooks";

import Header from "../../components/Header";
import Error from "../../components/Error";
import NavPagination from "../../components/NavPagination";
import ProductCard from "../../components/ProductCard/ProductCard";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);

	const [{ response, status, error }, getProducts] = useFetchProducts();
	const { data: products, lastPage } = response;

	useEffect(() => {
		getProducts(currentPage);
	}, [getProducts, currentPage]);

	return (
		<>
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
										<Col className="mb-4" xs={12} md={6} xl={4} key={product._id}>
											<ProductCard {...product} />
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
		</>
	);
}

/* <ProductCard title={product.title} description={product.description} images={product.images} stock={product.stock} price={product.price}/> */
