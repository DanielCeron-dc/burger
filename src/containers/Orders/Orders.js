import React, { Component } from "react";

import withErrorHandler from "../../hoc/withErrorHandler";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};

	componentDidMount() {
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

				console.log(fetchedOrders);
				this.setState({ orders: fetchedOrders, loading: false });
			})
			.catch((e) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => {
					return <Order ingredients={order.ingredients} price={order.price} key={order.id} />;
				})}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
