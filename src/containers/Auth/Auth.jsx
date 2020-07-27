import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
	state = {
		redirectToHome: false,
		redirectToCheckOut: false,
		disable: true,
		isSignUp: false,
		orderForm: {
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
		},
	};

	checkValidityInputs = (inputIdentifier, valid, form) => {
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
	inputStateHandler = (inputIdentifier, valid, value) => {
		const orderFormCopy = this.state.orderForm;
		const copy = this.state.orderForm[inputIdentifier];
		copy.valid = valid;
		copy.value = value;

		orderFormCopy[inputIdentifier] = copy;
		this.setState({
			orderForm: orderFormCopy,
			disable: this.checkValidityInputs(inputIdentifier, valid, this.state.orderForm),
		});
	};

	LoginHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.orderForm.email.value, this.state.orderForm.password.value, this.state.isSignUp);
		//! i need to check if is there an error
		if (this.props.error !== null) {
			return;
		}

		if (this.props.purchasing) {
			this.props.changePurchasingState(false);
			this.setState({ redirectToCheckOut: true });
		} else {
			this.setState({ redirectToHome: true });
		}
	};

	switchAuthMode = (event) => {
		event.preventDefault();
		this.setState((prevState) => {
			return { isSignUp: !prevState.isSignUp };
		});
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
					changed={this.inputStateHandler}
					rules={this.state.orderForm[key].validation}
				/>
			);
		}

		if (this.props.token !== null) {
			if (this.state.redirectToCheckOut) {
				return <Redirect to='/checkout' />;
			}
			if (this.state.redirectToHome) {
				return <Redirect to='/' />;
			}
		}

		return (
			<div className={classes.Auth}>
				{this.props.loading ? (
					<Spinner />
				) : (
					<form>
						{this.props.error ? <p>{this.props.error}</p> : null}
						{inputElements}
						<Button clicked={this.LoginHandler} btnType='Success' disabled={this.state.disable}>
							{!this.state.isSignUp ? "SignIn" : "SignUp"}
						</Button>
						<Button clicked={this.switchAuthMode} btnType='Danger'>
							Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}
						</Button>
					</form>
				)}
			</div>
		);
	}
}

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
