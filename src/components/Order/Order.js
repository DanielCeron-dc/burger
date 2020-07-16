import React from "react";

import classes from "./Order.module.css";

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

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>
				Price: <strong>USD {props.price}</strong>
			</p>
		</div>
	);
};

export default order;
