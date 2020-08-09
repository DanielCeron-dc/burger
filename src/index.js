import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import orderReducer from "./store/reducers/order.reducer";
import burgerBuilderReducer from "./store/reducers/burgerBuilder.reducer";
import authReducer from "./store/reducers/auth.reducer";

import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/Middleware";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
	combineReducers({ order: orderReducer, burgerBuilder: burgerBuilderReducer, auth: authReducer }),
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
