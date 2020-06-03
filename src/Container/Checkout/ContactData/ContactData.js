import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import Classes from "./ContactData.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import Axios from "../../../Axios";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import Input from "../../../UI/Input/Input";
import { connect } from "react-redux";
import { purchaseBurger } from "../../../Redux/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          required: true,
        },
        value: "",
        isValid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          required: true,
        },
        value: "",
        isValid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        value: "",
        isValid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          required: true,
        },
        value: "",
        isValid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        value: "",
        isValid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastest",
        isValid: true,
      },
    },
    formValid: false,
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      isValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        value
      );
    }
    return isValid;
  };

  orderHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    for (const key in this.state.orderForm) {
      orderData[key] = this.state.orderForm[key].value;
    }
    let order = {
      ingredients: this.props.ings,
      totalPrice: this.props.totalPrice.toFixed(2),
      orderData: orderData,
    };
    // Ordering Burger
    this.props.onOrderBurger(order, this.props.history);
  };

  inputChangeHandler = (event, elementId) => {
    const updateOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updateOrderForm[elementId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updateOrderForm[elementId] = updatedFormElement;
    let formIsValid = true;
    for (const inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].isValid && formIsValid;
    }
    this.setState({
      orderForm: updateOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    let inputElementArray = [];
    for (const key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let formData = (
      <React.Fragment>
        <h4>Your Information Please</h4>

        <form>
          {inputElementArray.map((element) => {
            return (
              <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                inValid={!element.config.isValid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                change={(event) => this.inputChangeHandler(event, element.id)}
              />
            );
          })}
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formIsValid}
          >
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.props.loading) {
      formData = <Spinner />;
    }
    return <div className={Classes.ContactData}>{formData}</div>;
  }
}

const mapStateToProps = (State) => ({
  ings: State.burger.ingredients,
  totalPrice: State.burger.totalPrice,
  loading: State.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, history) =>
    dispatch(purchaseBurger(orderData, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, Axios));
