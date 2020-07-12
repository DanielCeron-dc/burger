import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => (
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button onClick={props.RemoveIngredientFunction} className={classes.Less} disabled={props.disable}>
			Less
		</button>
		<button onClick={props.AddIngredientFunction} className={classes.More}>
			More
		</button>
	</div>
);

export default buildControl;
