import { useState } from "react";
import { useFetchProducts } from "../../hooks";

import Header from "../../components/Header";
import NavPagination from "../../components/NavPagination";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);

	const { response, status } = useFetchProducts(currentPage);
	const { success, data: products, lastPage, message } = response;

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="flex-grow-1 p-5">
				<div className="h-100">
					{status === "loading" && <Spinner animation="border" role="status" />}
					{status === "success" && success && (
						<>
							<div className="h-75">
								<Row>
									{products.map((product) => (
										<Col xs={12} sm={6} md={3} key={product._id}>
											<p className="text-center border">{product.title}</p>
										</Col>
									))}
								</Row>
							</div>
							<div className="h-25 d-flex flex-row justify-content-center">
								<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
							</div>
						</>
					)}
					{status === "error" && !success && (
						<>
							<p>{message}</p>
							<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
						</>
					)}
					{status === "error" && <p>Something went wrong :(</p>}
				</div>
			</main>
		</div>
	);
}
