import { useState } from "react";
import { useFetchProducts } from "../../hooks";

import Header from "../../components/Header";
import NavPagination from "../../components/NavPagination";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

export default function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);

	const { response, status } = useFetchProducts(currentPage);
	const { success, data: products, lastPage, message } = response;

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="flex-basis-1 p-2">
				<Container className="d-flex flex-column justify-content-center align-items-center" fluid>
					{status === "loading" && <Spinner animation="border" role="status" />}
					{status === "success" && success && (
						<div className="">
							{products.map((product) => (
								<p key={product._id}>{product.title}</p>
							))}
							<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
						</div>
					)}
					{status === "error" && !success && (
						<>
							<p>{message}</p>
							<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
						</>
					)}
					{status === "error" && <p>Something went wrong :(</p>}
				</Container>
			</main>
		</div>
	);
}
