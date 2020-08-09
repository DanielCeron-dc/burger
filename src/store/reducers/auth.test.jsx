import reducer from "./auth.reducer";

import * as actionTypes from "../actions/actionsTypes.action";

describe("auth reducer", () => {
	it("it should return the intial state if i pass a undefined action", () => {
		expect(reducer(undefined, {})).toEqual({ token: null, userId: null, error: null, loading: false });
	});

	it("yes", () => {
		expect(
			reducer(undefined, { type: actionTypes.AUTH_SUCCESS, payload: { token: "some token", userId: "some User ID" } })
		).toEqual({ token: "some token", userId: "some User ID", loading: false, error: null });
	});
});
