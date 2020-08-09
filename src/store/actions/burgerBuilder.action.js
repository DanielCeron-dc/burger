import * as actionTypes from "./actionsTypes.action";

//* action Creators
export const addIngredient = (ingredientName) => ({
	type: actionTypes.ADD_INGREDIENT,
	ingredientName,
});

export const changePurchasingState = (payload) => ({
	type: actionTypes.CHANGE_PURCHASING_STATE,
	payload,
});

export const removeIngredient = (ingredientName) => ({
	type: actionTypes.REMOVE_INGREDIENT,
	ingredientName,
});

export const setIngredients = (ingredients) => ({
	type: actionTypes.SET_INGREDIENTS,
	ingredients,
	price: 0,
});

export const fetchIngredientsFailed = () => ({
	type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => ({
	type: actionTypes.INIT_INGREDIENTS_SAGA,
});
