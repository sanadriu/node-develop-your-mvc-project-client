export function addItem(cartItems, product) {
	const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);

	if (cartItem) {
		if (cartItems.units < product.stock) cartItem.units++;
	} else {
		cartItems.push({
			...product,
			units: 1,
		});
	}

	return cartItems;
}

export function removeItem(cartItems, product) {
	const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);

	if (cartItem) {
		if (cartItems.units > 1) {
			cartItem.units--;
		} else {
			cartItems = cartItems.filter((cartItem) => cartItem.id !== product.id);
		}
	}

	return cartItems;
}

export function changeUnitsItem(cartItems, product, units) {
	const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);

	if (cartItem && cartItem.units <= cartItem.stock) {
		cartItem.units = units;
	}

	return cartItems;
}
