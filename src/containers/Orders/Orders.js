import React, { Component } from "react";
import { connect } from "react-redux";

import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder();
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

		return orders;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: () => dispatch(actions.fetchOrders()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
