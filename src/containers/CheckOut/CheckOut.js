import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import ContactData from "./ContactData/ContactData";
import classes from "./CheckOut.module.css";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { connect } from "react-redux";

class CheckOut extends Component {
	checkOutCancelledHandler = () => {
		this.props.history.push("/");
	};

	checkOutContinueHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		let summary = <Redirect to='/' />; //* if is no loaded the ingredients :D

		if (this.props.ingredients && !this.props.purchased) {
			summary = (
				<div className={classes.CheckOut}>
					<CheckOutSummary
						ingredients={this.props.ingredients}
						cancel={this.checkOutCancelledHandler}
						continue={this.checkOutContinueHandler}
					/>
					<Route path={this.props.match.url + "/contact-data"} component={ContactData} />
				</div>
			);
		}

		return summary;
	}
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(CheckOut);
