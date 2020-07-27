import { updateObject } from "../../tools/codeClean";
import * as actionTypes from "../actions/actionsTypes.action";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.AUTH_START:
			return updateObject(state, { loading: true });
		case actionTypes.AUTH_FAIL:
			return updateObject(state, { error: payload.error, loading: false });
		case actionTypes.AUTH_SUCCESS:
			return updateObject(state, { token: payload.token, userId: payload.userId, loading: false, error: null });
		case actionTypes.AUTH_LOGOUT:
			return updateObject(state, { token: null, userId: null });

		default:
			return state;
	}
};
