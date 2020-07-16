import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
	const { inputType, inputConfig, value } = props;
	let InputElement;

	let classesArray = [classes.InputElement];

	if (props.invalid) {
		classesArray.push(classes.Invalid);
	}

	switch (inputType) {
		case "input":
			InputElement = <input className={classesArray.join(" ")} {...inputConfig} value={value} onChange={props.changed} />;
			break;
		case "textarea":
			InputElement = <textarea className={classesArray.join(" ")} {...inputConfig} value={value} onChange={props.changed} />;
			break;
		case "select":
			InputElement = (
				<select value={value} onChange={props.changed} className={classes.SelectElement}>
					{props.inputConfig.options.map((optionConfig) => (
						<option value={optionConfig.value} key={optionConfig.value}>
							{optionConfig.displayValue}
						</option>
					))}
				</select>
			);
			break;

		default:
			InputElement = <input className={classesArray.join(" ")} value={value} />;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{InputElement}
		</div>
	);
};

export default Input;
