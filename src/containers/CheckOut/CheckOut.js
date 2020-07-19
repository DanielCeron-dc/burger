import React, { Component } from "react";
import { Route } from "react-router-dom";

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
		return (
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
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.ingredients,
	};
};

export default connect(mapStateToProps)(CheckOut);
