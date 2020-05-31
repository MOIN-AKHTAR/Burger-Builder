import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import Classes from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import Axios from "../../../Axios";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    let order = {
      name: "Moin Akhter",
      email: "moinakhter179@gmail.com",
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      delivery: "fastest",
    };
    Axios.post("/orders.json", order)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    let formData = (
      <React.Fragment>
        <h4>Your Information Please</h4>
        <form>
          <input
            className={Classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={Classes.Input}
            type="text"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={Classes.Input}
            type="text"
            name="street"
            placeholder="Your Street"
          />
          <input
            className={Classes.Input}
            type="text"
            name="postalCode"
            placeholder="Your PostalCode"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) {
      formData = <Spinner />;
    }
    return <div className={Classes.ContactData}>{formData}</div>;
  }
}

export default WithErrorHandler(ContactData, Axios);
