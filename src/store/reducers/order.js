import * as actionTypes from "../actions/actionsTypes";
import { updateState } from "../utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return updateState(state, { loading: false, purchased: true });
		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateState(state, { loading: false });
		case actionTypes.PURCHASE_BURGER_START:
			return updateState(state, { loading: true });
		case actionTypes.INIT_PURCHASED:
			return updateState(state, { purchased: false });
		case actionTypes.FETCH_ORDERS_START:
			return updateState(state, { loading: true });
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateState(state, { orders: action.orders, loading: false });
		case actionTypes.FETCH_ORDERS_FAIL:
			return updateState(state, { loading: false });
		case actionTypes.DELETE_ORDER_START:
			return updateState(state, { loading: true });
		case actionTypes.DELETE_ORDER_SUCCESS:
			return updateState(state, { loading: false });
		case actionTypes.DELETE_ORDER_FAIL:
			return updateState(state, { loading: false });
		default:
			return state;
	}
};

export default reducer;
