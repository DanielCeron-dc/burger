import * as actionTypes from "./actionsTypes.action";
import axios from "../../axios-orders";

const purchaseBurgerSucces = () => ({
	type: actionTypes.PURCHASE_BURGER_SUCCESS,
});

const purchaseBurgerFail = (error) => ({
	type: actionTypes.PURCHASE_BURGER_FAIL,
	error,
});

const purchaseBurgerStart = () => ({
	type: actionTypes.PURCHASE_BURGER_START,
});

export const initPurchased = () => ({
	type: actionTypes.INIT_PURCHASED,
});

export const purchaseBurger = (order, token) => (dispatch, getState) => {
	dispatch(purchaseBurgerStart());

	const queryParams = "?auth=" + token;
	axios.post("order.json" + queryParams, { ...order, userId: getState().auth.userId }).then(
		(response) => {
			dispatch(purchaseBurgerSucces());
		},
		(error) => {
			dispatch(purchaseBurgerFail(error));
		}
	);
};

const fetchOrdersSuccess = (orders) => ({
	type: actionTypes.FETCH_ORDERS_SUCCESS,
	orders,
});

const fetchOrdersFail = () => ({
	type: actionTypes.FETCH_ORDERS_FAIL,
});

const fetchOrdersStart = () => ({
	type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = (token) => (dispatch, getState) => {
	dispatch(fetchOrdersStart());
	let fetchedOrders = [];
	const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + getState().auth.userId + '"';
	axios
		.get("https://react-my-burger-609a3.firebaseio.com/order.json" + queryParams)
		.then((res) => {
			for (let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id: key,
				});
			}
			dispatch(fetchOrdersSuccess(fetchedOrders));
		})
		.catch((e) => {
			dispatch(fetchOrdersFail());
		});
};

const deleteOrderSuccess = () => ({
	type: actionTypes.DELETE_ORDER_SUCCESS,
});
const deleteOrderFail = () => ({
	type: actionTypes.DELETE_ORDER_FAIL,
});

const deletOrderStart = () => ({
	type: actionTypes.DELETE_ORDER_START,
});

export const deleteOrder = (key, token) => (dispatch) => {
	dispatch(deletOrderStart());

	axios.delete("https://react-my-burger-609a3.firebaseio.com/order/" + key + ".json?auth=" + token).then(
		(response) => {
			dispatch(fetchOrders(token));
			dispatch(deleteOrderSuccess()); //! this doesn't do anything
		},
		(error) => {
			dispatch(deleteOrderFail());
		}
	);
};
