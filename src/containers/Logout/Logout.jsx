import { connect } from "react-redux";
import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
	const { logout } = props;

	useEffect(() => {
		logout();
	}, [logout]);

	return <Redirect to='/'></Redirect>;
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(actions.authInitiateLogout()),
});

export default connect(null, mapDispatchToProps)(Logout);
