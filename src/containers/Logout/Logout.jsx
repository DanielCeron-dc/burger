import { connect } from "react-redux";
import React, { Component } from "react";
import * as actions from "../../store/actions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
	}

	render() {
		return <Redirect to='/'></Redirect>;
	}
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(actions.authLogout()),
});

export default connect(null, mapDispatchToProps)(Logout);
