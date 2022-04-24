import { useCallback, useReducer } from "react";
import reducer from "../../reducers/cart/reducer";
import initialState from "../../reducers/cart/state";
import { CartContext } from "./CartContext";
import { addItemHandler, removeItemHandler, changeItemUnitsHandler } from "./handlers";

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addItem = useCallback((product) => addItemHandler(dispatch, product), [dispatch]);
	const removeItem = useCallback((product) => removeItemHandler(dispatch, product), [dispatch]);
	const changeItemUnits = useCallback((product, units) => changeItemUnitsHandler(dispatch, product, units), [dispatch]);

	const value = {
		...state,
		addItem,
		removeItem,
		changeItemUnits,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
