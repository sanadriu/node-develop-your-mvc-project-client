import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard(props) {
	const { _id: idProduct, title, price, stock, description, images } = props;

	return (
		<>
			<div className="card">
				<img className={`card-top-img ${styles.img}`} src={images} alt="Card" />
				<div className={`card-body d-flex flex-column justify-content-between ${styles.body}`}>
					<div>
						<h4 className="card-title fs-5 fw-normal">{title}</h4>
						<p className={`card-text fw-lighter ${styles.description}`}>{description}</p>
						<div className="card-text">Price: {price} €</div>
						<div className="card-text">Stock: {stock} uds</div>
					</div>
					<Link className="d-block mt-2 btn btn-primary" to={`/product/${idProduct}`}>
						Buy
					</Link>
				</div>
			</div>
		</>
	);
}
