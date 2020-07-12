import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem active> Burger Builder </NavigationItem>
		<NavigationItem>CheckOut</NavigationItem>
	</ul>
);
export default NavigationItems;
