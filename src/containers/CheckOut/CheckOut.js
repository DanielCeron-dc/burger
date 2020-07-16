import React, { Component } from "react";
import { Route } from "react-router-dom";

import ContactData from "./ContactData/ContactData";
import classes from "./CheckOut.module.css";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";

class CheckOut extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		price: 0,
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			//* query entries, example = ["salad", "1"]

			if (param[0] === "price") {
				price = +param[1];
			} else {
				ingredients[param[0]] = +[param[1]];
			}
		}

		this.setState({
			ingredients,
			price,
		});
	}

	checkOutCancelledHandler = () => {
		this.props.history.push("/");
	};

	checkOutContinueHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		return (
			<div className={classes.CheckOut}>
				<CheckOutSummary
					ingredients={this.state.ingredients}
					cancel={this.checkOutCancelledHandler}
					continue={this.checkOutContinueHandler}
				/>
				<Route
					path={this.props.match.url + "/contact-data"}
					render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />}
				/>
			</div>
		);
	}
}

export default CheckOut;
