import React, { Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";

const AsyncCheckOut = React.lazy(() => {
	return import("./CheckOut/CheckOut");
});
const AsyncAuth = React.lazy(() => {
	return import("./Auth/Auth");
});
const AsyncOrders = React.lazy(() => {
	return import("./Orders/Orders");
});
const AsyncLogOut = React.lazy(() => {
	return import("./Logout/Logout");
});

const App = (props) => {
	props.autoLog();
	let routes = (
		<Switch>
			<Route path='/auth' render={() => <AsyncAuth />} />
			<Route path='/' exact render={() => <BurgerBuilder />} />
			<Redirect to='/' />
		</Switch>
	);
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path='/auth' render={() => <AsyncAuth />} />
				<Route path='/orders' render={() => <AsyncOrders />} />
				<Route path='/' exact render={() => <BurgerBuilder />} />
				<Route path='/checkout' render={() => <AsyncCheckOut />} />
				<Route path='/logout' render={() => <AsyncLogOut />} />
				<Redirect to='/' />
			</Switch>
		);
	}
	return (
		<Layout>
			<Suspense fallback={<p>loading...</p>}>{routes}</Suspense>
		</Layout>
	);
};

const mapDispatchToProps = (dispatch) => ({
	autoLog: () => dispatch(actions.autoLog()),
});

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.token !== null,
	purchasing: state.burgerBuilder.purchasing,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
