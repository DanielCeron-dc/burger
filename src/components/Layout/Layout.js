import React, { useState } from "react";
import classes from "./Layout.module.css";
import ToolBar from "../navigation/ToolBar";
import SideDrawer from "../navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
	const [SideDrawerView, setSideDrawerView] = useState(false);

	const closeSideDrawerHandler = () => {
		setSideDrawerView(false);
	};

	const SideDrawerToggleHandler = () => {
		setSideDrawerView(!SideDrawerView);
	};

	return (
		<React.Fragment>
			<ToolBar isAuth={props.Auth} SideDrawerToggleFunc={SideDrawerToggleHandler} />
			<SideDrawer isAuth={props.Auth} show={SideDrawerView} closeSideDrawerFunc={closeSideDrawerHandler} />
			<main className={classes.Container}>{props.children}</main>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	Auth: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
