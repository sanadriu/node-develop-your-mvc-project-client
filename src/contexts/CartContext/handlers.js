import * as actions from "../../reducers/cart/actions";

export function addItemHandler(dispatch, product) {
	dispatch(actions.addItem(product));
}

export function removeItemHandler(dispatch, product) {
	dispatch(actions.removeItem(product));
}

export function changeItemUnitsHandler(dispatch, product, units) {
	dispatch(actions.changeItemUnits(product, units));
}
