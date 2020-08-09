import * as actionTypes from "./actionsTypes.action";

export const authSuccess = (token, userId) => ({
	type: actionTypes.AUTH_SUCCESS,
	payload: {
		token,
		userId,
	},
});

export const authStart = () => ({
	type: actionTypes.AUTH_START,
});

export const authFail = (error) => ({
	type: actionTypes.AUTH_FAIL,
	payload: { error },
});

export const authInitiateLogout = () => {
	return {
		type: actionTypes.AUTH_INITIATE_LOGOUT, //* SAGA
	};
};

export const authLogoutSucceed = () => ({
	type: actionTypes.AUTH_LOGOUT, //* Saga action
});

export const checkAuthTime = (expirationTime) => ({
	type: actionTypes.AUTH_CHECK_TIMEOUT, //* Saga action
	expirationTime,
});

export const autoLog = () => ({
	type: actionTypes.AUTOLOG_SAGA,
});

export const auth = (email, password, isSignUp) => ({
	type: actionTypes.AUTH_SAGA,
	email,
	password,
	isSignUp,
});
