import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import CheckoutAddress from "../../components/CheckoutAddress";
import CheckoutCostumer from "../../components/CheckoutCostumer";
import CheckoutPayment from "../../components/CheckoutPayment";

export default function Checkout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="d- flex flex-basis-1 p-2 ">
        <Container>
          <>
            <header className="d-flex align-items-center justify-content-between">
              <h3 className="fw-light">step - 1</h3>
              <span>Step 1 of 4</span>
            </header>
            <hr className="mt-0 mb-2" />
            <div className="col-8 d-flex shadow p-3 mb-5 bg-white rounded">
            <CheckoutAddress/>
            </div>
          </>
        </Container>
      </main>
    </div>
  );
}
