import * as actionTypes from "./actionsTypes.action";

export const purchaseBurgerSuccess = () => ({
	type: actionTypes.PURCHASE_BURGER_SUCCESS,
});

export const purchaseBurgerFail = (error) => ({
	type: actionTypes.PURCHASE_BURGER_FAIL,
	error,
});

export const purchaseBurgerStart = () => ({
	type: actionTypes.PURCHASE_BURGER_START,
});

export const initPurchased = () => ({
	type: actionTypes.INIT_PURCHASED,
});

export const purchaseBurger = (order, token) => ({
	type: actionTypes.PURCHASE_BURGER_SAGA, //*SAGA
	order,
	token,
});

export const fetchOrdersSuccess = (orders) => ({
	type: actionTypes.FETCH_ORDERS_SUCCESS,
	orders,
});

export const fetchOrdersFail = () => ({
	type: actionTypes.FETCH_ORDERS_FAIL,
});

export const fetchOrdersStart = () => ({
	type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token) => ({
	type: actionTypes.FETCH_ORDERS_SAGA, //*SAGA
	token,
});

export const deleteOrderSuccess = () => ({
	type: actionTypes.DELETE_ORDER_SUCCESS,
});
export const deleteOrderFail = () => ({
	type: actionTypes.DELETE_ORDER_FAIL,
});

export const deletOrderStart = () => ({
	type: actionTypes.DELETE_ORDER_START,
});

export const deleteOrder = (key, token) => ({
	type: actionTypes.DELETE_ORDER_SAGA,
	key,
	token,
});
