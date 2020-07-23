import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

//* action Creators
export const addIngredient = (ingredientName) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName,
	};
};

export const removeIngredient = (ingredientName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName,
	};
};

const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients,
		price: 0,
	};
};

const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

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
