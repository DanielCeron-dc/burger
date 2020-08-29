import React from "react";
import classes from "./Burger.module.css";
import Ingredient from "./Burgeringredient/Burgeringredient";


//this is a comment to view if i can save my work with gitpod :D
const burger = (props) => {
	let TranformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				//!study why the three points are used here
				return <Ingredient key={igKey + i} type={igKey} />; //*we transformed the ingredients object to an array of ingredients components
			});
		})
		.reduce((preArr, current) => {
			return preArr.concat(current); //*with this, we make sure that we won't have an array with multiple empty slots
		}, []);

	if (TranformedIngredients.length === 0) {
		TranformedIngredients = <p> please start adding ingredients !!</p>;
	}

	return (
		<div className={classes.Burger}>
			<Ingredient type='breadTop'></Ingredient>
			{TranformedIngredients}
			<Ingredient type='breadBottom'></Ingredient>
		</div>
	);
};

export default burger;
