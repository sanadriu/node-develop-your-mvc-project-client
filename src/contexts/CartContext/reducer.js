const actionTypes = {
	ADD_ITEM: Symbol(),
	REMOVE_ITEM: Symbol(),
};

function reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.ADD_ITEM:
			const { product } = payload;

			state.find((item) => item.id === product.id);

			return [...state, { _id: payload.item.id, quantity: 1 }];
	}
}
