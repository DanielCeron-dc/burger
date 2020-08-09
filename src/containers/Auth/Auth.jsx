import React, { useState } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = (props) => {
	const [redirectToHome, setredirectToHome] = useState(false);
	const [redirectToCheckOut, setredirectToCheckOut] = useState(false);
	const [disable, setdisable] = useState(true);
	const [isSignUp, setisSignUp] = useState(false);

	const [orderForm, setOrderForm] = useState({
		email: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your email",
			},
			value: "",
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
		},
		password: {
			elementType: "input",
			elementConfig: {
				type: "Password",
				placeholder: "Your password",
			},
			value: "",
			validation: {
				required: true,
				minLenght: 6,
			},
			valid: false,
		},
	});

	const checkValidityInputs = (inputIdentifier, valid, form) => {
		for (let key in form) {
			if (form[key].validation) {
				if (key === inputIdentifier) {
					//! if i do it with the actual state, it would be in the pass so it wont work
					if (valid === false) {
						return true;
					}
				} else {
					if (form[key].valid === false) {
						return true;
					}
				}
			}
		}
		return false;
	};

	//!new
	const inputStateHandler = (inputIdentifier, valid, value) => {
		const orderFormCopy = orderForm;
		const copy = orderForm[inputIdentifier];
		copy.valid = valid;
		copy.value = value;
		orderFormCopy[inputIdentifier] = copy;

		setOrderForm(orderFormCopy);
		setdisable(checkValidityInputs(inputIdentifier, valid, orderFormCopy));
	};

	const LoginHandler = (event) => {
		event.preventDefault();
		props.onAuth(orderForm.email.value, orderForm.password.value, isSignUp);
		//! i need to check if is there an error
		if (props.error !== null) {
			return;
		}

		if (props.purchasing) {
			props.changePurchasingState(false);
			setredirectToCheckOut(true);
		} else {
			setredirectToHome(true);
		}
	};

	const switchAuthMode = (event) => {
		event.preventDefault();
		setisSignUp(!isSignUp);
	};

	let inputElements = [];

	for (let key in orderForm) {
		inputElements.push(
			<Input
				key={key}
				id={key}
				value={orderForm[key].value}
				inputType={orderForm[key].elementType}
				inputConfig={orderForm[key].elementConfig}
				changed={inputStateHandler}
				rules={orderForm[key].validation}
			/>
		);
	}

	if (props.token !== null) {
		if (redirectToCheckOut) {
			return <Redirect to='/checkout' />;
		}
		if (redirectToHome) {
			return <Redirect to='/' />;
		}
	}

	return (
		<div className={classes.Auth}>
			{props.loading ? (
				<Spinner />
			) : (
				<form>
					{props.error ? <p>{props.error}</p> : null}
					{inputElements}
					<Button clicked={LoginHandler} btnType='Success' disabled={disable}>
						{!isSignUp ? "SignIn" : "SignUp"}
					</Button>
					<Button clicked={switchAuthMode} btnType='Danger'>
						Switch to {isSignUp ? "SignIn" : "SignUp"}
					</Button>
				</form>
			)}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		changePurchasingState: (payload) => dispatch(actions.changePurchasingState(payload)),
	};
};

const mapStateToProps = (state) => {
	return {
		purchasing: state.burgerBuilder.purchasing,
		loading: state.auth.loading,
		error: state.auth.error,
		token: state.auth.token,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
