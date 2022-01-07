import { addItem, changeUnitsItem, removeItem } from "./modifiers";

const actionTypes = {
	ADD_ITEM: Symbol(),
	REMOVE_ITEM: Symbol(),
	EDIT_UNITS_ITEM: Symbol(),
};

function reducer(state, action) {
	const { type, payload } = action;
	const { cartItems } = state;

	switch (type) {
		case actionTypes.ADD_ITEM:
			const { product } = payload;

			return {
				...state,
				cartItems: addItem(cartItems, product),
			};
		case actionTypes.REMOVE_ITEM:
			const { product } = payload;

			return {
				...state,
				cartItems: removeItem(cartItems, product),
			};
		case actionTypes.EDIT_UNITS_ITEM:
			const { product, units } = payload;

			return {
				...state,
				cartItems: changeUnitsItem(cartItems, product, units),
			};
		default:
			return state;
	}
}

export { actionTypes, reducer };
