// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";

function getCartTotal(cartItems) {
	return cartItems
		.reduce((acc, item) => {
			return acc + item.price * item.units;
		}, 0)
		.toFixed(2);
}

export default function CheckoutSummary(props) {
	// const navigate = useNavigate();
	const { cartItems } = useCart();

	return (
		<>
			<div className="w-100">
				<div className="card border-0 ">
					<div className="card-header card-2 d-flex justify-content-between">
						<p className="card-text mb-2 space">YOUR ORDER 📦 </p>
						<p className=" small mb-2  text-muted  cursor-pointer">Edit order ⚙️</p>{" "}
					</div>
					<div className="card-body pt-0 ">
						{cartItems.map((item) => (
							<div key={item._id} className="d-flex flex-row justify-content-between align-items-center">
								<div className="d-flex p-2 gap-3 align-items-center">
									<img style={{ aspectRatio: 1, width: "4rem" }} src={item.images[0]} />
									<small className="text-muted">{item.title}</small>
								</div>
								<div className=" d-flex flex-column gap-2">
									<small className="text-muted">{item.units} uds</small>
									<small className="text-muted fw-bold">{item.price} €</small>
								</div>
							</div>
						))}
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
											<b>{getCartTotal(cartItems)}</b>
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
											<b>5 €</b>
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
								<button type="button" className="btn btn-block btn-outline-secondary btn-lg">
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
