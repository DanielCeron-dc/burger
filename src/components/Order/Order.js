import React from "react";

import Button from "../UI/Button/Button";

import classes from "./Order.module.css";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

const order = (props) => {
	let ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
	}

	const ingredientsOutput = ingredients.map((ig) => {
		let blankSpace = " ";
		return (
			<span style={{ textTransform: "capitalize" }} key={ig.name}>
				{ig.name} ({ig.amount}) {blankSpace}
			</span>
		);
	});

	console.log(props.id + "<= este es el key we ");
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>
				Price: <strong>USD {props.price}</strong>
			</p>
			<Button btnType='Danger' clicked={() => props.deleteOrder(props.id, props.token)}>
				delete
			</Button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token)),
	};
};

const mapStateToProps = (state) => ({
	token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(order);
