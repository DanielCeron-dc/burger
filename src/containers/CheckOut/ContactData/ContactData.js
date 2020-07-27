import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { checkValidityInputs } from "../../../tools/formTools";

class ContactData extends Component {
	state = {
		disable: true,
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation: {
					required: true,
				},

				valid: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				value: "",
				validation: {
					required: true,
				},

				valid: false,
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
				validation: {
					required: true,
				},

				valid: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "E-mail",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},

				valid: false,
			},

			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "fastest" },
						{ value: "chepeast", displayValue: "chepeast" },
					],
				},
				validation: {},
				value: "fastest",

				valid: true,
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code",
				},
				value: "",
				validation: {
					required: true,
					maxLenght: 5,
					minLenght: 5,
				},

				valid: false,
			},
		},
	};

	//!new
	inputStateHandler = (inputIdentifier, valid) => {
		const orderFormCopy = this.state.orderForm;
		const copy = this.state.orderForm[inputIdentifier];
		copy.valid = valid;

		orderFormCopy[inputIdentifier] = copy;
		this.setState({
			orderForm: orderFormCopy,
			disable: checkValidityInputs(inputIdentifier, valid, this.state.orderForm),
		});
	};

	sendToFirebase = () => {
		let orderData = {};
		for (let objectIdentifier in this.state.orderForm) {
			orderData[objectIdentifier] = this.state.orderForm[objectIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
			customer: orderData,
		};

		this.props.onPurchase(order, this.props.token);
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.sendToFirebase();
	};

	render() {
		let inputElements = [];

		for (let key in this.state.orderForm) {
			inputElements.push(
				<Input
					key={key}
					id={key}
					value={this.state.orderForm[key].value}
					inputType={this.state.orderForm[key].elementType}
					inputConfig={this.state.orderForm[key].elementConfig}
					firstValue={this.state.orderForm[key].value}
					changed={this.inputStateHandler}
					rules={this.state.orderForm[key].validation}
				/>
			);
		}

		let OrderForm = (
			<div className={classes.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form>
					{inputElements}
					<Button btnType='Success' clicked={this.orderHandler} disabled={this.state.disable}>
						ORDER
					</Button>
				</form>
			</div>
		);

		if (this.props.loading) {
			OrderForm = <Spinner />;
		}

		return <div> {OrderForm} </div>;
	}
}

const mapStateToProps = (state) => ({
	ingredients: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.price,
	loading: state.order.loading,
	token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
	onPurchase: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
