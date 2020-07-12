import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
	const ingredientsOrder = Object.keys(props.ingredients).map((ingredientKey) => {
		return (
			<li key={ingredientKey}>
				<span style={{ textTransform: "capitalize" }}> {ingredientKey} </span> = {props.ingredients[ingredientKey]}
			</li>
		);
	});

	return (
		<React.Fragment>
			<h3> YOUR ORDER: </h3>
			<p>A delicious burger with the following ingredients: </p>
			<ul>{ingredientsOrder}</ul>
			<p> Total Price: {props.price.toFixed(2)}</p>
			<p> Continue Checkout? </p>
			<Button btnType='Danger' clicked={props.closeModalFunc}>
				Cancel
			</Button>
			<Button btnType='Success' clicked={props.continuePurchasingFunc}>
				Continue
			</Button>
		</React.Fragment>
	);
};

export default orderSummary;
