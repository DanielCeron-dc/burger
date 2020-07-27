import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolBar = (props) => (
	<header className={classes.ToolBar}>
		<DrawerToggle clicked={props.SideDrawerToggleFunc} />

		<div className={classes.Logo}>
			<Logo />
		</div>

		<nav className={classes.DescktopOnly}>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

export default toolBar;
