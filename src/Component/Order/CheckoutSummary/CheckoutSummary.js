import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../UI/Button/Button";
import Classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={Classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelOrderHandler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueOrderHandler}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
