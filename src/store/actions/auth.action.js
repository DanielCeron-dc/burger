import * as actionTypes from "./actionsTypes.action";
import axios from "axios";

const authSuccess = (token, userId) => ({
	type: actionTypes.AUTH_SUCCESS,
	payload: {
		token,
		userId,
	},
});

const authStart = () => ({
	type: actionTypes.AUTH_START,
});

const authFail = (error) => ({
	type: actionTypes.AUTH_FAIL,
	payload: { error },
});

export const authLogout = () => {
	localStorage.clear();
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTime = (expireTime) => (dispatch) => {
	setTimeout(() => {
		dispatch(authLogout());
	}, expireTime * 1000);
};

export const autoLog = () => (dispatch) => {
	if (localStorage.getItem("token")) {
		let expirationDate = new Date(localStorage.getItem("expirationDate"));
		if (new Date() < expirationDate) {
			dispatch(authSuccess(localStorage.getItem("token"), localStorage.getItem("userId")));
			let seconds = (expirationDate.getTime() - new Date().getTime()) / 1000;
			dispatch(checkAuthTime(seconds));
		}
	}
};

export const auth = (email, password, isSignUp) => (dispatch) => {
	dispatch(authStart());
	const authData = {
		email,
		password,
		returnSecureToken: true,
	};
	let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBp8YpOXSkVE3fvwAIp3iv0ZPh_auTeT8U";
	if (!isSignUp) {
		url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBp8YpOXSkVE3fvwAIp3iv0ZPh_auTeT8U";
	}
	axios
		.post(url, authData)
		.then((response) => {
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

			localStorage.setItem("userId", response.data.localId);
			localStorage.setItem("token", response.data.idToken);
			localStorage.setItem("expirationDate", expirationDate);
			dispatch(checkAuthTime(response.data.expiresIn));
			dispatch(authSuccess(response.data.idToken, response.data.localId));
		})
		.catch((error) => {
			dispatch(authFail(error.response.data.error.message));
		});
};
