import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		loading: false,
	};

	componentDidMount() {
		this.props.initIngredients();
		this.props.initPurchased();
	}

	showPurchasingModelHandler = () => {
		this.props.changePurchasingState(true);
		if (!this.props.isAuth) {
			this.props.history.push("/auth");
		}
	};

	closePurchasingModelHandler = () => {
		this.props.changePurchasingState(false);
	};

	continuePurchasingModelHandler = () => {
		this.props.changePurchasingState(false);
		this.props.history.push("/checkout");
	};

	updatePurchaseState = (ingredients) => {
		let sum = Object.keys(ingredients)
			.map((key) => {
				return ingredients[key];
			})
			.reduce((sum, currentValue) => {
				return (sum = sum + currentValue);
			}, 0);
		return sum > 0;
	};

	render() {
		let disableInfo = { ...this.props.ingredients };
		for (let key in disableInfo) {
			disableInfo[key] = this.props.ingredients[key] <= 0;
		}

		let orderSummary = null;

		let burger;

		this.props.error ? (burger = <p>ingredients cant be loaded</p>) : (burger = <Spinner />);
		if (this.props.ingredients) {
			orderSummary = (
				<OrderSummary
					closeModalFunc={this.closePurchasingModelHandler}
					continuePurchasingFunc={this.continuePurchasingModelHandler}
					ingredients={this.props.ingredients}
					price={this.props.price}
				/>
			);

			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						isAuth={this.props.isAuth}
						disable={this.updatePurchaseState(this.props.ingredients)}
						price={this.props.price}
						showPurchasingFunc={this.showPurchasingModelHandler}
						disableInfo={disableInfo}
						AddIngredientFunction={this.props.addIngredient}
						RemoveIngredientFunction={this.props.removeIngredient}></BuildControls>
				</React.Fragment>
			);
		}

		if (this.props.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<React.Fragment>
				<Modal show={this.props.purchasing} closeModalFunc={this.closePurchasingModelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.price,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
		purchasing: state.burgerBuilder.purchasing,
	};
};

const mapDispathToProps = (dispatch) => {
	return {
		addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
		removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
		initIngredients: () => dispatch(actions.initIngredients()),
		initPurchased: () => dispatch(actions.initPurchased()),
		changePurchasingState: (value) => dispatch(actions.changePurchasingState(value)),
	};
};

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, axios));
