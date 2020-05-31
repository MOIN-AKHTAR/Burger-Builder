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
  };

  componentDidMount() {
    Axios.get("/orders.json")
      .then((res) => {
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
    if (this.state.orders.length > 0) {
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
    if (this.state.error) {
      orderData = (
        <h4
          style={{
            textAlign: "center",
            margin: "2rem",
            color: "red",
          }}
        >
          {this.state.error}
        </h4>
      );
    }
    return <div>{orderData}</div>;
  }
}

export default WithErrorHandler(Orders, Axios);
