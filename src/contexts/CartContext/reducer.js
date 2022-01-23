import { addItem, editItemUnits, removeItem } from "./utils";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EDIT_ITEM_UNITS } from "./types";

export default function reducer(state, action) {
	const { cartItems } = state;

	switch (action.type) {
		case CART_ADD_ITEM:
			return {
				...state,
				cartItems: addItem(cartItems, action.payload.product),
			};
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItem(cartItems, action.payload.product),
			};
		case CART_EDIT_ITEM_UNITS:
			return {
				...state,
				cartItems: editItemUnits(cartItems, action.payload.product, action.payload.units),
			};
		default:
			return state;
	}
}
