import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		componentDidMount() {
			axios.interceptors.request.use(
				(request) => {
					this.setState({ error: null });
					return request;
				},
				(error) => {
					this.setState({ error: error });
					console.log(error.message);
				}
			);

			axios.interceptors.response.use(null, (error) => {
				this.setState({ error: error });
				console.log(error.message);
			});
		}

		render() {
			return (
				<React.Fragment>
					<Modal show={this.state.error} closeModalFunc={() => this.setState({ error: null })}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default withErrorHandler;
