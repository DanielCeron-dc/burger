import React from "react";
import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";

const modal = (props) => {
	return (
		<React.Fragment>
			<BackDrop show={props.show} clicked={props.closeModalFunc}></BackDrop>
			<div
				className={classes.Modal}
				style={{ transform: props.show ? "translateY(0)" : "translateY(-100vh)", opacity: props.show ? "1" : "0" }}>
				{props.children}
			</div>
		</React.Fragment>
	);
};

export default React.memo(
	modal,
	(prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
