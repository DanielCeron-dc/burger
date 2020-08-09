import React, { useReducer, useCallback } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { checkValidityInputs } from "../../../tools/formTools";

const initialState = {
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

const formReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_ELEMENT_VALUE":
			let updatedState = { ...state };
			let updatedform = { ...state.orderForm };
			updatedform[action.indentifier].value = action.update;
			updatedState.OrderForm = updatedform;
			return updatedState;
		case "CHANGE_DISABLE":
			return { ...state, disable: checkValidityInputs("", false, state.orderForm) };

		default:
			return state;
	}
};

const ContactData = (props) => {
	const [formState, formDispatch] = useReducer(formReducer, initialState);

	//!new
	const inputStateHandler = useCallback((inputIdentifier, valid, value) => {
		formDispatch({ type: "CHANGE_ELEMENT_VALUE", update: value, indentifier: inputIdentifier });
		formDispatch({ type: "CHANGE_DISABLE" });
	}, []);

	const sendToFirebase = () => {
		let orderData = {};
		for (let objectIdentifier in formState.orderForm) {
			orderData[objectIdentifier] = formState.orderForm[objectIdentifier].value;
		}

		const order = {
			ingredients: props.ingredients,
			price: props.price.toFixed(2),
			customer: orderData,
		};

		props.onPurchase(order, props.token);
	};

	const orderHandler = (event) => {
		event.preventDefault();
		sendToFirebase();
	};

	let inputElements = [];

	for (let key in formState.orderForm) {
		inputElements.push(
			<Input
				key={key}
				id={key}
				value={formState.orderForm[key].value}
				inputType={formState.orderForm[key].elementType}
				inputConfig={formState.orderForm[key].elementConfig}
				firstValue={formState.orderForm[key].value}
				changed={inputStateHandler}
				rules={formState.orderForm[key].validation}
			/>
		);
	}

	let OrderForm = (
		<div className={classes.ContactData}>
			<h4> Enter your Contact Data</h4>
			<form>
				{inputElements}
				<Button btnType='Success' clicked={orderHandler} disabled={formState.disable}>
					ORDER
				</Button>
			</form>
		</div>
	);

	if (props.loading) {
		OrderForm = <Spinner />;
	}

	return <div> {OrderForm} </div>;
};

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
