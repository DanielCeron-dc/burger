import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem exact Link={"/"}>
			Burger
		</NavigationItem>
		<NavigationItem Link={"/orders"}> Order list </NavigationItem>
	</ul>
);
export default NavigationItems;
