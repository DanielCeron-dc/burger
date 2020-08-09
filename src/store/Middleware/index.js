import { takeEvery } from "redux-saga/effects";
import { logoutSaga, checkAuthTimeSaga, AuthSaga, autoLogSaga } from "./auth.saga";
import { InitIngredientsSaga } from "./burgerBuilder.saga";
import { purchaseBurger, fetchOrdersSaga, deleteOrderSaga } from "./order.saga";

import * as actionTypes from "../actions/actionsTypes.action";

export function* watchAuth() {
	yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeSaga);
	yield takeEvery(actionTypes.AUTH_SAGA, AuthSaga);
	yield takeEvery(actionTypes.AUTOLOG_SAGA, autoLogSaga);
}

export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS_SAGA, InitIngredientsSaga);
}

export function* watchOrder() {
	yield takeEvery(actionTypes.PURCHASE_BURGER_SAGA, purchaseBurger);
	yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga);
	yield takeEvery(actionTypes.DELETE_ORDER_SAGA, deleteOrderSaga);
}
