// import { useFormik } from "formik";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCart, getCartSubtotal } from "../../../contexts/CartContext";

export default function CheckoutSummary(props) {
  // const navigate = useNavigate();
  const {
    state: { cartItems },
  } = useCart();

  return (
    <>
      <div className="w-100">
        <div className="card border-0 ">
          <div className="card-header card-2 d-flex justify-content-between">
            <p className="card-text mb-2 space">YOUR ORDER 📦 </p>
            <p className=" small mb-2  text-muted  cursor-pointer">
              Edit order ⚙️
            </p>{" "}
          </div>
          <div className="card-body pt-0 ">
            <div className="d-flex flex-row justify-content-between">
              <div className=" d-flex">
                {cartItems.map((item) => (
                  <div className="media flex-column flex-sm-row">
                    <div className="col-auto ">
                      <img
                        className=" img-fluid "
                        src={item.product.images[0]}
                        width="80"
                        height="80"
                      />
                    </div>
                    <div className="media-body my-auto">
                      <div className="row d-flex ">
                        <div className="media flex-column flex-sm-row">
                          <p className="mb-0">
                            <b>{item.product.title}</b>
                          </p>
                          <small className="text-muted">
                            Rose gold - 256gb
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" d-flex flex-row gap-2 mt-4">
                <p className="">
                  <small className="text-muted"> QTY:</small>
                  <small className="text-muted"> {item.units}</small>
                </p>
                <p className="mb-1">
                  <b>{item.price}</b>
                </p>
              </div>
            </div>
            <hr className="my-0 mb-3" />
            <div className="row ">
              <div className="col">
                <div className="row justify-content-between mb-3">
                  <div className="col-4">
                    <p className="mb-1">
                      <b>Subtotal</b>
                    </p>
                  </div>

                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">
                      <b>{getCartSubtotal(item)}</b>
                    </p>
                  </div>
                </div>
                <hr className="my-0 mb-3" />

                <div className="row justify-content-between mb-3">
                  <div className="col">
                    <p className="mb-1">
                      <b>Shipping</b>
                    </p>
                  </div>

                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">
                      <b>11,50 €</b>
                    </p>
                  </div>
                </div>
                <hr className="my-0 mb-3 " />
                <div className="row justify-content-between ">
                  <div className="col-4">
                    <p>
                      <b>Total</b>
                    </p>
                  </div>
                  <div className="flex-sm-col col-auto">
                    <p className="mb-1">
                      <b>970,50€</b>
                    </p>
                  </div>
                </div>
                <hr className="my-0 mb-3" />
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-md-7 col-lg-6 mx-auto d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-block btn-outline-secondary btn-lg"
                >
                  Complete order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
