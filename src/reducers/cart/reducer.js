import actionTypes from "./types";
import { addItem, changeItemUnits, removeItem } from "./utils";

export default function reducer(state, action) {
	const { cartItems } = state;

	switch (action.type) {
		case actionTypes.addItem:
			return {
				...state,
				cartItems: addItem(cartItems, action.payload.product),
			};
		case actionTypes.removeItem:
			return {
				...state,
				cartItems: removeItem(cartItems, action.payload.product),
			};
		case actionTypes.changeItemUnits:
			return {
				...state,
				cartItems: changeItemUnits(cartItems, action.payload.product, action.payload.units),
			};
		default:
			return state;
	}
}
