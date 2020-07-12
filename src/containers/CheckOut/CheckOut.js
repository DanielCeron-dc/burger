import React, { Component } from "react";
import classes from "./CheckOut.module.css";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";

class CheckOut extends Component {
	state = {
		ingredients: {
			salad: 1,
			bacon: 2,
			cheese: 1,
			meat: 1,
		},
	};

	render() {
		return (
			<div>
				<CheckOutSummary ingredients={this.state.ingredients} />
			</div>
		);
	}
}

export default CheckOut;
