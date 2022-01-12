{
	cartItems.map((item) => (
		<ListGroup.Item key={item.product._id} className="d-flex justify-content-between align-items-center p2">
			<div className="d-flex justify-content-between align-items-center p2 gap-3">
				<img className="rounded" style={{ aspectRatio: 1, width: "3rem" }} src={item.product.images[0]} alt="product" />
				<span className="fw-light">{item.product.title}</span>
			</div>
			<span className="fw-light">{`${item.units} uds. X ${item.price} €`}</span>
		</ListGroup.Item>
	));
}
