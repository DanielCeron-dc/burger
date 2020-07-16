import React, { Component } from "react";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

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
				touched: false,
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
				touched: false,
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
				touched: false,
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
				},
				valid: false,
				touched: false,
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
				touched: false,
			},
		},

		loading: false,
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.minLenght) {
			isValid = value.length >= rules.minLenght && isValid;
		}
		if (rules.maxLenght) {
			isValid = value.length <= rules.maxLenght && isValid;
		}
		return isValid;
	};

	checkValidityOrderButton = () => {
		for (let key in this.state.orderForm) {
			if (this.state.orderForm[key].validation) {
				if ((this.state.orderForm[key].valid && this.state.orderForm[key].touched) === false) {
					this.setState({ disable: true });
					return;
				}
			}
		}
		this.setState({ disable: false });
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const orderFormCopy = this.state.orderForm;
		const copy = this.state.orderForm[inputIdentifier];
		copy.value = event.target.value;
		copy.touched = true;
		copy.valid = this.checkValidity(copy.value, copy.validation);
		orderFormCopy[inputIdentifier] = copy;
		this.setState({ orderForm: orderFormCopy });
		this.checkValidityOrderButton();
	};

	sendToFirebase = () => {
		this.setState({ loading: true });
		let orderData = {};
		for (let objectIdentifier in this.state.orderForm) {
			orderData[objectIdentifier] = this.state.orderForm[objectIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
			customer: orderData,
		};
		axios.post("order.json", order).then(
			(response) => {
				this.setState({ loading: false });
				console.log(response);
				this.props.history.push("/");
			},
			(error) => {
				this.setState({ loading: false });
				console.log("there was an error!" + error);
				this.props.history.push("/");
			}
		);
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.sendToFirebase();
	};

	render() {
		let inputelements = [];

		for (let key in this.state.orderForm) {
			inputelements.push(
				<Input
					key={key}
					inputType={this.state.orderForm[key].elementType}
					inputConfig={this.state.orderForm[key].elementConfig}
					value={this.state.orderForm[key].value}
					invalid={!this.state.orderForm[key].valid && this.state.orderForm[key].touched}
					changed={(event) => this.inputChangedHandler(event, key)}
				/>
			);
		}

		let OrderForm = (
			<div className={classes.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form>
					{inputelements}
					<Button btnType='Success' clicked={this.orderHandler} disabled={this.state.disable}>
						ORDER
					</Button>
				</form>
			</div>
		);

		if (this.state.loading) {
			OrderForm = <Spinner />;
		}

		return <div> {OrderForm} </div>;
	}
}

export default ContactData;
