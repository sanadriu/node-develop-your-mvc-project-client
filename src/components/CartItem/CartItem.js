import { useCart } from "../../contexts/CartContext";

export default function CartItem(props) {
	const { item } = props;
	const { title, units, price } = item;

	const { addItem, removeItem } = useCart();

	return (
		<div className="p-3">
			<div>
				<h4 className="h5 fw-bold">{title}</h4>
			</div>
			<div>
				<p>{price} €</p>
			</div>
			<div className="col mt-auto">
				<div className="d-flex gap-3">
					<span className="w-50 bg-primary d-flex align-items-center justify-content-center rounded fw-bold">
						{units}
					</span>
					<button className="w-25 btn btn-success fw-bold" onClick={() => addItem(item)}>
						+
					</button>
					<button className="w-25 btn btn-danger fw-bold" onClick={() => removeItem(item)}>
						-
					</button>
				</div>
			</div>
		</div>
	);
}
