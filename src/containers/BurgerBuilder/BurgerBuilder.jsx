import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actions from "../../store/actions";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler";

export const BurgerBuilder = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
	const error = useSelector((state) => state.burgerBuilder.error);
	const price = useSelector((state) => state.burgerBuilder.price);
	const isAuth = useSelector((state) => state.auth.token !== null);
	const purchasing = useSelector((state) => state.burgerBuilder.purchasing);

	const addIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
	const removeIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
	const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
	const initPurchased = useCallback(() => dispatch(actions.initPurchased()), [dispatch]);
	const changePurchasingState = useCallback((value) => dispatch(actions.changePurchasingState(value)), [dispatch]);

	useEffect(() => {
		initIngredients();
		initPurchased();
	}, [initIngredients, initPurchased]);

	const showPurchasingModelHandler = useCallback(() => {
		changePurchasingState(true);
		if (!isAuth) {
			history.push("/auth");
		}
	}, [changePurchasingState, isAuth, history]);

	const closePurchasingModelHandler = useCallback(() => {
		changePurchasingState(false);
	}, [changePurchasingState]);

	const continuePurchasingModelHandler = useCallback(() => {
		changePurchasingState(false);
		history.push("/checkout");
	}, [changePurchasingState, history]);

	const updatePurchaseState = useCallback((prmIngredients) => {
		let sum = 0;
		if (prmIngredients) {
			sum = Object.keys(prmIngredients)
				.map((key) => {
					return prmIngredients[key];
				})
				.reduce((sum, currentValue) => {
					return (sum = sum + currentValue);
				}, 0);
		}

		return sum > 0;
	}, []);

	let disableInfo = { ...ingredients };
	for (let key in disableInfo) {
		disableInfo[key] = ingredients[key] <= 0;
	}

	let orderSummary = null;

	let burger;

	error ? (burger = <p>ingredients cant be loaded</p>) : (burger = <Spinner />);
	if (ingredients) {
		orderSummary = (
			<OrderSummary
				closeModalFunc={closePurchasingModelHandler}
				continuePurchasingFunc={continuePurchasingModelHandler}
				ingredients={ingredients}
				price={price}
			/>
		);

		burger = (
			<React.Fragment>
				<Burger ingredients={ingredients} />
				<BuildControls
					isAuth={isAuth}
					disable={updatePurchaseState(ingredients)}
					price={price}
					showPurchasingFunc={showPurchasingModelHandler}
					disableInfo={disableInfo}
					AddIngredientFunction={addIngredient}
					RemoveIngredientFunction={removeIngredient}></BuildControls>
			</React.Fragment>
		);
	}

	if (props.loading) {
		orderSummary = <Spinner />;
	}

	return (
		<React.Fragment>
			<Modal show={purchasing} closeModalFunc={closePurchasingModelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</React.Fragment>
	);
};

export default withErrorHandler(BurgerBuilder, axios);
