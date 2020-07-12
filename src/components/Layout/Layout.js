import React, { Component } from "react";
import classes from "./Layout.module.css";
import ToolBar from "../navigation/ToolBar";
import SideDrawer from "../navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = { SideDrawerView: false };

	closeSideDrawerHandler = () => {
		this.setState({ SideDrawerView: false });
	};

	openSideDrawerHandler = () => {
		this.setState({ SideDrawerView: true });
	};

	SideDrawerToggleHandler = () => {
		this.setState((preState) => {
			return { SideDrawerView: !preState.SideDrawerView };
		});
	};

	render() {
		return (
			<React.Fragment>
				<ToolBar SideDrawerToggleFunc={this.SideDrawerToggleHandler} />
				<SideDrawer show={this.state.SideDrawerView} closeSideDrawerFunc={this.closeSideDrawerHandler} />
				<main className={classes.Container}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;
