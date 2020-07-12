import classes from "./CheckOutSummary.module.css";
import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckOutSummary}>
			<p>we hope it tastes well!</p>

			<div
				style={{
					width: "100%",
					margin: "auto",
				}}>
				<Burger ingredients={props.ingredients} />
			</div>

			<Button btnType='Danger'> CANCEL </Button>
			<Button btnType='Success'> CONTINUE </Button>
		</div>
	);
};

export default CheckoutSummary;
