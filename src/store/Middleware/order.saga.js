import { put, select } from "redux-saga/effects";
import {
	purchaseBurgerStart,
	purchaseBurgerSuccess,
	purchaseBurgerFail,
	fetchOrdersStart,
	fetchOrdersSuccess,
	fetchOrdersFail,
	deletOrderStart,
	deleteOrderFail,
	fetchOrders,
	deleteOrderSuccess,
} from "../actions";
import axios from "../../axios-orders";

export function* purchaseBurger(action) {
	try {
		yield put(purchaseBurgerStart());
		const queryParams = "?auth=" + action.token;
		const state = yield select();
		yield axios.post("order.json" + queryParams, { ...action.order, userId: state.auth.userId });
		yield put(purchaseBurgerSuccess());
	} catch (error) {
		console.log(error);
		yield put(purchaseBurgerFail(error));
	}
}

export function* fetchOrdersSaga(action) {
	yield put(fetchOrdersStart());
	let fetchedOrders = [];
	let state = yield select();
	const queryParams = "?auth=" + action.token + '&orderBy="userId"&equalTo="' + state.auth.userId + '"';
	console.log("hola");
	try {
		let response = yield axios.get("https://react-my-burger-609a3.firebaseio.com/order.json" + queryParams);
		for (let key in response.data) {
			fetchedOrders.push({
				...response.data[key],
				id: key,
			});
		}
		yield put(fetchOrdersSuccess(fetchedOrders));
	} catch (error) {
		yield put(fetchOrdersFail());
	}
}

export function* deleteOrderSaga(action) {
	yield put(deletOrderStart());
	try {
		yield axios.delete(
			"https://react-my-burger-609a3.firebaseio.com/order/" + action.key + ".json?auth=" + action.token
		);
		yield put(fetchOrders(action.token));
		yield put(deleteOrderSuccess()); //! this doesn't do anything
	} catch (error) {
		yield put(deleteOrderFail());
	}
}
