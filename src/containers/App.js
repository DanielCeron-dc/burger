import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";
import CheckOut from "./CheckOut/CheckOut";
import { Route, Redirect, Switch } from "react-router-dom";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Logout/Logout";

import "./App.css";

class App extends Component {
	render() {
		this.props.autoLog();
		if (this.props.isAuthenticated) {
			return (
				<Layout>
					<Switch>
						<Route path='/orders' component={Orders} />
						<Route path='/' exact component={BurgerBuilder} />
						<Route path='/checkout' component={CheckOut} />
						<Route path='/logout' component={Logout} />
						<Redirect to='/' />
					</Switch>
				</Layout>
			);
		}

		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/auth' component={Auth} />
						<Route path='/' exact component={BurgerBuilder} />
						<Redirect to='/' />
					</Switch>
				</Layout>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	autoLog: () => dispatch(actions.autoLog()),
});

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
