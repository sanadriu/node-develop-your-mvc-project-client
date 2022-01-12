export function addItem(cartItems, product) {
	const index = cartItems.findIndex((cartItem) => cartItem._id === product._id);

	console.log(product);

	if (index !== -1) {
		if (cartItems[index].units < product.stock) {
			cartItems[index].units++;
			console.log("holi");
		}
	} else {
		console.log("before ", cartItems);

		cartItems.push({
			...product,
			units: 1,
		});

		console.log("after ", cartItems);
	}

	return cartItems;
}

export function removeItem(cartItems, product) {
	const cartItem = cartItems.find((cartItem) => cartItem._id === product._id);

	console.log(cartItem);

	if (cartItem) {
		if (cartItem.units > 1) {
			cartItem.units = cartItem.units - 1;
		} else {
			cartItems = cartItems.filter((cartItem) => cartItem._id !== product._id);
		}
	}

	return cartItems;
}

export function changeUnitsItem(cartItems, product, units) {
	const cartItem = cartItems.find((cartItem) => cartItem._id === product._id);

	if (cartItem && cartItem.units <= cartItem.stock) {
		cartItem.units = units;
	}

	return cartItems;
}
