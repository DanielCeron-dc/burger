import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem exact Link={"/"}>
			Burger
		</NavigationItem>

		{props.isAuth ? (
			<React.Fragment>
				<NavigationItem Link={"/orders"}> Order list </NavigationItem>
				<NavigationItem Link={"/logout"}>Log Out</NavigationItem>
			</React.Fragment>
		) : (
			<NavigationItem Link={"/auth"}>Authenticate</NavigationItem>
		)}
	</ul>
);
export default NavigationItems;
