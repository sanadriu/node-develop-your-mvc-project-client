import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import useFetchProduct from "../../hooks/useFetchProduct";

export default function Product() {
	// const { response, status } = useFetchProduct(idProduct);
	// const { success, data: product, message } = response;
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d- flex flex-basis-1 p-2">
        <Container
          className="d-flex justify-content-center align-items-center"
          fluid
        >
          <div className="d-flex flex-column p-2 ">
            <img
              src="https://www.backmarket.es/cdn-cgi/image/format=auto,quality=75,width=640/https://d1eh9yux7w8iql.cloudfront.net/product_images/None_59a7092b-f2c4-40b9-9000-7987ecc6cd26.jpg"
              width="500"
              height="500"
              alt="Product image"
            />
            {/* <img>{image}</img> */}
          </div>

          <div className="d-flex flex-column w-50 p-2 ">
            <div className="me-2 p-2">
              <p className="h3 mb-0 ">iPhone 12</p>
              <p className="text-secondary">Lilac - 128GB</p>
              {/* <p>{product.title}</p> */}
							{/* <p>{specs}</p> */}
            </div>
            <div className="me-2 p-2">
              <p className="h6 mb-0 w-30">
                The iPhone 12 features a 6.1-inch (15 cm) display with Super
                Retina XDR OLED technology at a resolution of 2532×1170 pixels
                and a pixel density of about 460 ppi. The iPhone 12 Mini
                features a 5.4-inch (14 cm) display with the same technology at
                a resolution of 2340×1080 pixels and a pixel density of about
                476 ppi.
              </p>
              {/* <p>{description}</p> */}
            </div>
            <div className="p-2">
              <p className="mb-0 font-weight-bold">683,00€</p>
              {/* <p>{price}</p> */}
            </div>
            <div className="p-2">
              <p className="font-weight-bold">Stock: 32</p>
              {/* <p>{stock}</p> */}
            </div>

            <div className="p-2">
              <button className="btn btn-secondary">Add to cart</button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
