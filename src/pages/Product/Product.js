import { useCart } from "../../contexts/CartContext";
import { useProduct } from "../../hooks/useProduct";

import Error from "../../components/Error";
import defaultImage from "../../images/no-fotos.png";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../../components/Layout";

export default function Product() {
	const { addItem } = useCart();
	const {
		getRequest: { response, error, isLoading, isFailed },
	} = useProduct();

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
		const { data: product } = response;

		return (
			<Layout>
				<Container className="d-flex justify-content-center align-items-center" fluid="md">
					<Row>
						<Col xs={12} sm={4} lg={3} className="d-flex flex-column justify-content-center align-items-center p-3">
							<img
								className="w-100 border shadow-sm p-3"
								src={product.images ? product.images[0] : defaultImage}
								alt="Product"
							/>
						</Col>
						<Col xs={12} sm={8} lg={9} className="d-flex flex-column p-3">
							<div className="me-2 p-2">
								<p className="h3 mb-0 ">{product.title}</p>
								<p className="text-secondary">{product.specs}</p>
							</div>
							<div className="me-2 p-2">
								<p className="h6 mb-0 w-30">{product.description}</p>
							</div>
							<div className="p-2">
								<p className="mb-0 font-weight-bold">Price: {product.price.toFixed(2)}€</p>
							</div>
							<div className="p-2">
								<p className="font-weight-bold">Stock {product.stock}</p>
							</div>
							<div className="p-2">
								<button className="btn btn-secondary" onClick={() => addItem(product)}>
									Add to cart
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</Layout>
		);
	}

	return null;
}
