import { useProducts } from "../../hooks/useProducts";

import Error from "../../components/Error";
import NavPagination from "../../components/NavPagination";
import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Layout from "../../components/Layout";

export default function Home() {
	const {
		getRequest: { response, error, isLoading, isFailed },
	} = useProducts();

	if (isLoading) {
		return (
			<Layout>
				<Container className="d-flex align-items-center justify-content-center h-100">
					<Spinner animation="border" role="status" />
				</Container>
			</Layout>
		);
	}

	if (isFailed) {
		return (
			<Layout>
				<Error message={error?.message} />
			</Layout>
		);
	}

	if (response?.success === false) {
		return (
			<Layout>
				<Error message={response?.message} />
			</Layout>
		);
	}

	if (response?.success === true) {
		const { lastPage, data: products } = response;

		return (
			<Layout>
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
					<NavPagination lastPage={lastPage} />
				</Container>
			</Layout>
		);
	}

	return null;
}
