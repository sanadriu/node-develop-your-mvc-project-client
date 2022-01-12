import { addItem, changeUnitsItem, removeItem } from "./modifiers";

const actionTypes = {
	ADD_ITEM: Symbol(),
	REMOVE_ITEM: Symbol(),
	EDIT_UNITS_ITEM: Symbol(),
};

function reducer(state, action) {
	const { cartItems } = state;

	switch (action.type) {
		case actionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addItem(cartItems, action.payload.product),
			};
		case actionTypes.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItem(cartItems, action.payload.product),
			};
		case actionTypes.EDIT_UNITS_ITEM:
			return {
				...state,
				cartItems: changeUnitsItem(cartItems, action.payload.product, action.payload.units),
			};
		default:
			return state;
	}
}

export { actionTypes, reducer };
