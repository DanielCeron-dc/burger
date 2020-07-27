import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder(this.props.token);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = (
				<div>
					{this.props.orders.map((order) => {
						return <Order ingredients={order.ingredients} price={order.price} id={order.id} key={order.id} />;
					})}
				</div>
			);
		}

		if (this.props.token === null) {
			//*verify  if is authenticated
			orders = <Redirect to='/' />;
		}

		return orders;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: (token) => dispatch(actions.fetchOrders(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
