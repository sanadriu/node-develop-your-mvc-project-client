export function addItem(cartItems, product) {
	const index = cartItems.findIndex((cartItem) => cartItem._id === product._id);

	if (index !== -1) {
		const stock = cartItems[index].stock;
		const units = cartItems[index].units;

		const newCartItems = [...cartItems];

		newCartItems[index] = { ...cartItems[index], units: units < stock ? units + 1 : units };

		return newCartItems;
	} else {
		return [...cartItems, { ...product, units: 1 }];
	}
}

export function removeItem(cartItems, product) {
	const index = cartItems.findIndex((cartItem) => cartItem._id === product._id);

	if (index !== -1) {
		const units = cartItems[index].units;
		if (units > 1) {
			const newCartItems = [...cartItems];

			newCartItems[index] = { ...cartItems[index], units: units - 1 };

			return newCartItems;
		} else {
			return cartItems.filter((cartItem) => cartItem._id !== product._id);
		}
	} else {
		return cartItems;
	}
}

export function changeItemUnits(cartItems, product, units) {
	const cartItem = cartItems.find((cartItem) => cartItem._id === product._id);

	if (cartItem && cartItem.units <= cartItem.stock) {
		cartItem.units = units;
	}

	return cartItems;
}
