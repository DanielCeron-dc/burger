import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (props.show) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<React.Fragment>
			<BackDrop show={props.show} clicked={props.closeSideDrawerFunc} />
			<div className={attachedClasses.join(" ")} onClick={props.closeSideDrawerFunc}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;
