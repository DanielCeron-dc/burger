import * as actionTypes from "../actions/actionsTypes.action";
import { updateObject } from "../../tools/codeClean";

const INGREDIENTS_PRICES = {
	salad: 0.4,
	cheese: 1,
	meat: 4,
	bacon: 2,
};

const intialState = {
	ingredients: null,
	price: 0,
	error: false,
	purchasing: false,
};

const addIngredient = (state, action) => {
	let newPrice = state.price + INGREDIENTS_PRICES[action.ingredientName];
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
		},
		price: newPrice,
	};
};

const removeIngredient = (state, action) => {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
		},
		price: state.price - INGREDIENTS_PRICES[action.ingredientName],
	};
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return updateObject(state, { ingredients: action.ingredients, error: false, price: action.price });
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		case actionTypes.CHANGE_PURCHASING_STATE:
			return updateObject(state, { purchasing: action.payload });
		default:
			return state;
	}
};

export default reducer;
