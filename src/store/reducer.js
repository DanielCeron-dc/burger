import * as actionTypes from "./actions";

const INGREDIENTS_PRICES = {
	salad: 0.4,
	cheese: 1,
	meat: 4,
	bacon: 2,
};

const intialState = {
	ingredients: {
		salad: 0,
		cheese: 0,
		meat: 0,
		bacon: 0,
	},
	price: 0,
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			let newPrice = state.price + INGREDIENTS_PRICES[action.ingredientName];
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				price: newPrice,
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				price: state.price - INGREDIENTS_PRICES[action.ingredientName],
			};
		default:
			return state;
	}
};

export default reducer;
