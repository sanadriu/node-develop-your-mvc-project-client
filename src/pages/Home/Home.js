import { useState } from "react";
import { useFetchProducts } from "../../hooks";

import Spinner from "react-bootstrap/Spinner";
import Header from "../../components/Header";
import NavPagination from "../../components/NavPagination";

export default function Home(props) {
	const [currentPage, setCurrentPage] = useState(1);

	const { response, status } = useFetchProducts(currentPage);
	const { success, data: products, message } = response;

	const lastPage = 8;

	return (
		<div>
			<Header />
			{status === "loading" && <Spinner animation="border" role="status" />}
			{status === "success" && success && (
				<>
					{products.map((product) => (
						<p key={product._id}>{product.title}</p>
					))}
					<NavPagination currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
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
	);
}
