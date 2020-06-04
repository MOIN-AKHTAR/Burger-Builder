import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import Classes from "./Auth.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { auth } from "../../Redux/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    authForm: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: "",
        isValid: false,
        touched: false,
      },
    },
    isSignup: true,
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

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = (e) => {
    this.setState((prevState) => ({
      isSignup: !prevState.isSignup,
    }));
  };

  inputChangeHandler = (event, elementId) => {
    const updateAuthForm = {
      ...this.state.authForm,
      [elementId]: {
        ...this.state.authForm[elementId],
        value: event.target.value,
        isValid: this.checkValidation(
          event.target.value,
          this.state.authForm[elementId].validation
        ),
        touched: true,
      },
    };

    this.setState({
      authForm: updateAuthForm,
    });
  };

  render() {
    let inputElementArray = [];
    for (const key in this.state.authForm) {
      inputElementArray.push({
        id: key,
        config: this.state.authForm[key],
      });
    }

    let formData = (
      <React.Fragment>
        <h3>Authenticate Your Self</h3>

        <form noValidate onSubmit={this.submitHandler}>
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
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch To {this.state.isSignup ? "SignIn" : "SignUp"}
        </Button>
      </React.Fragment>
    );
    if (this.props.loading) {
      formData = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to="/" />;
    }
    return (
      <div className={Classes.AuthData}>
        {redirect}
        {errorMessage}
        {formData}
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  loading: State.auth.loading,
  error: State.auth.error,
  isAuthenticated: State.auth.token !== null,
});

const mapDispatchToProps = (Dispatch) => ({
  onAuth: (email, password, isSignup) =>
    Dispatch(auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
