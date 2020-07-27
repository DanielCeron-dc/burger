import React, { useState } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
	const { inputType, inputConfig } = props;
	const [valid, setValid] = useState(false);
	const [touched, settouched] = useState(false);
	const [value, setvalue] = useState(props.value);

	let InputElement;

	let classesArray = [classes.InputElement];

	if (!valid && touched) {
		classesArray.push(classes.Invalid);
	}

	const checkValidity = (newValue, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = newValue.trim() !== "" && isValid;
		}
		if (rules.minLenght) {
			isValid = newValue.length >= rules.minLenght && isValid;
		}
		if (rules.maxLenght) {
			isValid = newValue.length <= rules.maxLenght && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(newValue) && isValid;
		}
		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(newValue) && isValid;
		}
		setValid(isValid);
		return isValid;
	};

	const inputChanged = (event) => {
		event.preventDefault();
		settouched(true);
		setvalue(event.target.value);
		props.changed(props.id, checkValidity(event.target.value, props.rules), event.target.value);
	};

	switch (inputType) {
		case "input":
			InputElement = <input className={classesArray.join(" ")} {...inputConfig} value={value} onChange={inputChanged} />;
			break;
		case "textarea":
			InputElement = <textarea className={classesArray.join(" ")} {...inputConfig} value={value} onChange={inputChanged} />;
			break;
		case "select":
			InputElement = (
				<select value={value} onChange={inputChanged} className={classes.SelectElement}>
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
