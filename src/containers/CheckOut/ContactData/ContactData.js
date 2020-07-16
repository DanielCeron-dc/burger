import React, { Component } from "react";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	sendToFirebase = () => {
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
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
		let OrderForm = (
			<div className={classes.ContactData}>
				<h4> Enter your Contact Data</h4>
				<form>
					<input className={classes.Input} type='text' name='name' placeholder='Your Name' />
					<input className={classes.Input} type='text' name='email' placeholder='Your Email' />
					<input className={classes.Input} type='text' name='street' placeholder='Street' />
					<input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
					<Button btnType='Success' clicked={this.orderHandler}>
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
