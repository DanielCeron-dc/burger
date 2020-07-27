import * as actionTypes from "./actionsTypes.action";
import axios from "../../axios-orders";

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

const fetchIngredientsFailed = () => ({
	type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get("https://react-my-burger-609a3.firebaseio.com/ingredients.json")
			.then((response) => {
				dispatch(setIngredients(response.data));
			})
			.catch((e) => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
