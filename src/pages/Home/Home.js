import { useEffect, useState } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";

import Header from "../../components/Header";
import Error from "../../components/Error";
import NavPagination from "../../components/NavPagination";
import ProductCard from "../../components/ProductCard/ProductCard";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);
	const { request, response = {} } = useFetchProducts();

	const { data: products, lastPage } = response;

	useEffect(() => {
		const params = { page: currentPage };

		request.send({ params });
	}, [request.send, currentPage]);

	return (
		<>
			<Container className="d-flex flex-column min-vh-100 p-0" fluid>
				<Header />
				<Container as="main" className="d-flex flex-column justify-content-center flex-grow-1">
					{request.status === "loading" && (
						<Container className="d-flex align-items-center justify-content-center flex-grow-1">
							<Spinner animation="border" role="status" />
						</Container>
					)}
					{request.status === "done" && response.success && (
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
					{request.status === "done" && !response.success && <Error message={response.message} />}
					{request.status === "error" && <Error message={request.error.message} />}
				</Container>
			</Container>
		</>
	);
}
