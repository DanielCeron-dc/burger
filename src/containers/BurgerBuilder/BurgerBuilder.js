import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENTS_PRICES = {
	salad: 0.4,
	cheese: 1,
	meat: 4,
	bacon: 2,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		price: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		axios
			.get("https://react-my-burger-609a3.firebaseio.com/ingredients.json")
			.then((response) => {
				this.setState({ ingredients: response.data });
				console.log(this.state.ingredients);
			})
			.catch((e) => {});
	}

	showPurchasingModelHandler = () => {
		this.setState({ purchasing: true });
	};

	closePurchasingModelHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchasingModelHandler = () => {
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.price.toFixed(2),
			customer: {
				address: {
					country: "Colombia",
					calle: "calle-de-prueba777",
					zipCode: "55545",
				},
				email: "tests@gmail.com",
				name: "Daniel Ceron",
			},
		};
		axios.post("order.json", order).then(
			(response) => {
				this.setState({ loading: false, purchasing: false });
				console.log(response);
			},
			(error) => {
				this.setState({ loading: false, purchasing: false });
				console.log("there was an error!" + error);
			}
		);
	};

	updatePurchaseState = (ingredients) => {
		let sum = Object.keys(ingredients)
			.map((key) => {
				return ingredients[key];
			})
			.reduce((sum, currentValue) => {
				return (sum = sum + currentValue);
			}, 0);
		this.setState({ purchasable: sum > 0 });
	};

	AddIngredientHandler = (type) => {
		let count = 1 + this.state.ingredients[type];
		let updatedIngredientsObject = { ...this.state.ingredients };
		updatedIngredientsObject[type] = count;
		let newPrice = INGREDIENTS_PRICES[type] + this.state.price;

		this.setState({
			ingredients: updatedIngredientsObject,
			price: newPrice,
		});
		this.updatePurchaseState(updatedIngredientsObject);
	};

	RemoveIngredientHandler = (type) => {
		let count = this.state.ingredients[type] - 1;
		if (count < 0) {
			return;
		}
		let updatedIngredientsObject = { ...this.state.ingredients };
		updatedIngredientsObject[type] = count;
		let newPrice = this.state.price - INGREDIENTS_PRICES[type];
		this.setState({
			ingredients: updatedIngredientsObject,
			price: newPrice,
		});
		this.updatePurchaseState(updatedIngredientsObject);
	};

	render() {
		let disableInfo = { ...this.state.ingredients };
		for (let key in disableInfo) {
			disableInfo[key] = this.state.ingredients[key] <= 0;
		}

		let orderSummary = null;

		let burger = <Spinner />;

		if (this.state.ingredients) {
			orderSummary = (
				<OrderSummary
					closeModalFunc={this.closePurchasingModelHandler}
					continuePurchasingFunc={this.continuePurchasingModelHandler}
					ingredients={this.state.ingredients}
					price={this.state.price}
				/>
			);

			burger = (
				<React.Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						disable={this.state.purchasable}
						price={this.state.price}
						showPurchasingFunc={this.showPurchasingModelHandler}
						disableInfo={disableInfo}
						AddIngredientFunction={this.AddIngredientHandler}
						RemoveIngredientFunction={this.RemoveIngredientHandler}></BuildControls>
				</React.Fragment>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} closeModalFunc={this.closePurchasingModelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
