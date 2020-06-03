import React, { Component } from "react";
import Order from "../../Component/Order/Order";
import Axios from "../../Axios";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: null,
    message: null,
  };

  componentDidMount() {
    Axios.get("/orders.json")
      .then((res) => {
        if (res.data === null) {
          this.setState({
            loading: false,
            message: "No Order Found :)",
          });
        } else {
          let fetchedData = [];
          for (const key in res.data) {
            fetchedData.push({
              ...res.data[key],
              id: key,
            });
          }
          this.setState({
            loading: false,
            orders: fetchedData,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: "Something Gone Wrong!!!",
        });
      });
  }

  render() {
    let orderData = <Spinner />;
    if (this.state.orders.length > 0 || this.state.message) {
      if (this.state.message) {
        orderData = (
          <h1
            style={{
              color: "red",
              marginTop: "150px",
              textAlign: "center",
            }}
          >
            {this.state.message}
          </h1>
        );
      } else {
        orderData = (
          <React.Fragment>
            {this.state.orders.map((order) => (
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
    if (this.state.error) {
      orderData = (
        <h1
          style={{
            textAlign: "center",
            margin: "2rem",
            color: "red",
          }}
        >
          {this.state.error}
        </h1>
      );
    }
    return <div>{orderData}</div>;
  }
}

export default WithErrorHandler(Orders, Axios);
