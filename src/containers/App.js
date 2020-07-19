import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.jsx";
import CheckOut from "./CheckOut/CheckOut";
import { Route } from "react-router-dom";
import Orders from "./Orders/Orders";

import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Route path='/orders' component={Orders} />
					<Route path='/' exact component={BurgerBuilder} />
					<Route path='/checkout' component={CheckOut} />
				</Layout>
			</div>
		);
	}
}
export default App;
