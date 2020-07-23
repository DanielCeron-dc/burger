import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

const purchaseBurgerSucces = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
	};
};

const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error,
	};
};

const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const initPurchased = () => {
	return {
		type: actionTypes.INIT_PURCHASED,
	};
};

export const purchaseBurger = (order) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios.post("order.json", order).then(
			(response) => {
				dispatch(purchaseBurgerSucces());
			},
			(error) => {
				dispatch(purchaseBurgerFail(error));
			}
		);
	};
};

const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders,
	};
};

const fetchOrdersFail = () => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
	};
};

const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};
export const fetchOrders = () => {
	return (dispatch) => {
		dispatch(fetchOrdersStart());
		let fetchedOrders = [];
		axios
			.get("https://react-my-burger-609a3.firebaseio.com/order.json")
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
};

const deleteOrderSuccess = () => {
	return {
		type: actionTypes.DELETE_ORDER_SUCCESS,
	};
};
const deleteOrderFail = () => {
	return {
		type: actionTypes.DELETE_ORDER_FAIL,
	};
};

const deletOrderStart = () => {
	return {
		type: actionTypes.DELETE_ORDER_START,
	};
};

export const deleteOrder = (key) => {
	return (dispatch) => {
		dispatch(deletOrderStart());
		console.log("https://react-my-burger-609a3.firebaseio.com/order/" + key + ".json");
		axios.delete("https://react-my-burger-609a3.firebaseio.com/order/" + key + ".json").then(
			(response) => {
				dispatch(fetchOrders());
			},
			(error) => {
				dispatch(deleteOrderFail());
			}
		);
	};
};
