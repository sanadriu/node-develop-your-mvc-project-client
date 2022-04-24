import actionTypes from "./types";

export function addItem(product) {
	return { type: actionTypes.addItem, payload: { product } };
}

export function removeItem(product) {
	return { type: actionTypes.removeItem, payload: { product } };
}

export function changeItemUnits(product, units) {
	return { type: actionTypes.changeItemUnits, payload: { product, units } };
}
