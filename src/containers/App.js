import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import CheckOut from "./CheckOut/CheckOut";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<BurgerBuilder></BurgerBuilder>
					<CheckOut />
				</Layout>
			</div>
		);
	}
}
export default App;
