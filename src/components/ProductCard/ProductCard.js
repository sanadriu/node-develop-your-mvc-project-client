import React from "react"

export default function ProductCard(props) {
const {title,price,stock,description,images}= props
	return (<>
		<div className="card" style={{width: "18rem"}} >
<img className="card-img-top" src={images} alt="Card image"/>
			<div className="card-body">
				<h4 className="card-title">{title}</h4>
				<p className="card-text">{description}</p>
				<h4 className="card-text">{ price}€</h4>
				<h4 className="card-text">Stock:{stock} uds</h4>
				<a className="btn btn-primary">Buy</a>
			</div>
		</div>
	</>)
}
