import { put, delay } from "redux-saga/effects";

import { authLogoutSucceed, authInitiateLogout, authStart, authFail, authSuccess, checkAuthTime } from "../actions/auth.action";
import axios from "axios";

export function* logoutSaga(action) {
	yield localStorage.clear();
	yield put(authLogoutSucceed());
}

export function* checkAuthTimeSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(authInitiateLogout());
}

export function* AuthSaga(action) {
	yield put(authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};
	let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBp8YpOXSkVE3fvwAIp3iv0ZPh_auTeT8U";
	if (!action.isSignUp) {
		url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBp8YpOXSkVE3fvwAIp3iv0ZPh_auTeT8U";
	}

	try {
		const response = yield axios.post(url, authData);
		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield localStorage.setItem("userId", response.data.localId);
		yield localStorage.setItem("token", response.data.idToken);
		yield localStorage.setItem("expirationDate", expirationDate);
		yield put(checkAuthTime(response.data.expiresIn));
		yield put(authSuccess(response.data.idToken, response.data.localId));
	} catch (error) {
		yield put(authFail(error.response.data.error.message));
	}
}

export function* autoLogSaga(action) {
	if (yield localStorage.getItem("token")) {
		let expirationDate = yield new Date(localStorage.getItem("expirationDate"));
		if (new Date() < expirationDate) {
			yield put(authSuccess(localStorage.getItem("token"), localStorage.getItem("userId")));
			let seconds = yield (expirationDate.getTime() - new Date().getTime()) / 1000;
			yield put(checkAuthTime(seconds));
		}
	}
}
