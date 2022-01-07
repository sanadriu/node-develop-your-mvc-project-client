import useFetchProduct from "../../hooks/useFetchProduct";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import defaultImage from "../../images/no-fotos.png";

export default function Product() {
  const { idProduct } = useParams();

	const { response, status } = useFetchProduct(idProduct);
	const { success, data: product, message } = response;

  console.log(response);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d-flex flex-basis-1 p-2">
      {status === "loading" && <Spinner animation="border" role="status" />}
      {status === "success" && success && 
        <Container className="d-flex justify-content-center align-items-center" fluid="md">
          <Row>
            <Col xs={12} sm={4} lg={3} className="d-flex flex-column justify-content-center align-items-center p-3">
              <img className="w-100 border shadow-sm p-3"
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
                <button className="btn btn-secondary">Add to cart</button>
              </div>
            </Col>
          </Row>
        </Container>
      }
      {status === "error" && !success && <p>{message}</p>}
      {status === "error" && <p>Something went wrong :(</p>}
      </main>
    </div>
  );
}
