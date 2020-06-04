import React, { Component } from "react";
import Order from "../../Component/Order/Order";
import Axios from "../../Axios";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { loadOrders } from "../../Redux/index";

class Orders extends Component {
  componentDidMount() {
    this.props.loadOrders(this.props.token, this.props.userId);
  }

  render() {
    let orderData = <Spinner />;
    if (this.props.orders.length > 0 || this.props.message) {
      if (this.props.message) {
        orderData = (
          <h1
            style={{
              color: "red",
              marginTop: "150px",
              textAlign: "center",
            }}
          >
            {this.props.message}
          </h1>
        );
      } else {
        orderData = (
          <React.Fragment>
            {this.props.orders.map((order) => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                totalPrice={order.totalPrice}
              />
            ))}
          </React.Fragment>
        );
      }
    }
    if (this.props.error) {
      orderData = (
        <h1
          style={{
            textAlign: "center",
            margin: "2rem",
            color: "red",
          }}
        >
          {this.props.error}
        </h1>
      );
    }
    return <div>{orderData}</div>;
  }
}

const mapStateToProps = (State) => ({
  orders: State.order.orders,
  loading: State.order.loading,
  message: State.order.message,
  error: State.order.error,
  token: State.auth.token,
  userId: State.auth.userId,
});

const mapDispatchToProps = (Dispatch) => ({
  loadOrders: (token, userId) => Dispatch(loadOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, Axios));
