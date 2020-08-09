import React, { useCallback } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

import { useHistory } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import classes from "./CheckOut.module.css";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { connect } from "react-redux";

const CheckOut = (props) => {
	const history = useHistory();
	const match = useRouteMatch();

	const checkOutCancelledHandler = useCallback(() => {
		history.push("/");
	}, [history]);

	const checkOutContinueHandler = useCallback(() => {
		history.replace("/checkout/contact-data");
	}, [history]);

	let summary = <Redirect to='/' />; //* if is no loaded the ingredients :D

	if (props.ingredients && !props.purchased) {
		summary = (
			<div className={classes.CheckOut}>
				<CheckOutSummary
					ingredients={props.ingredients}
					cancel={checkOutCancelledHandler}
					continue={checkOutContinueHandler}
				/>
				<Route path={match.url + "/contact-data"} component={ContactData} />
			</div>
		);
	}

	return summary;
};
const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(CheckOut);
