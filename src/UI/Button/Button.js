import React from "react";
import Classes from "./Button.module.css";

const Button = (props) => (
  <button
    onClick={props.clicked}
    disabled={props.disabled}
    className={[Classes.Button, Classes[props.btnType]].join(" ")}
  >
    {props.children}
  </button>
);

export default Button;
