import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			current price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((control) => {
			return (
				<BuildControl
					disable={props.disableInfo[control.type]}
					AddIngredientFunction={() => props.AddIngredientFunction(control.type)}
					RemoveIngredientFunction={() => props.RemoveIngredientFunction(control.type)}
					key={control.label}
					label={control.label}></BuildControl>
			);
		})}
		<button onClick={props.showPurchasingFunc} className={classes.OrderButton} disabled={!props.disable}>
			{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
		</button>
	</div>
);

export default buildControls;
