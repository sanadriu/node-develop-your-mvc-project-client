import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EDIT_ITEM_UNITS } from "./types";

export function addCartItem(product) {
	return { type: CART_ADD_ITEM, payload: { product } };
}

export function removeCartItem(product) {
	return { type: CART_REMOVE_ITEM, payload: { product } };
}

export function editCartItemUnits(product, units) {
	return { type: CART_EDIT_ITEM_UNITS, payload: { product, units } };
}
