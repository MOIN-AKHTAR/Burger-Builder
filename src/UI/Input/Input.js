import React from "react";
import Classes from "./Input.module.css";

export default function Input(props) {
  let inputElement = null;
  const inputClasses = [Classes.Input];
  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(Classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.change}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.change}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.change}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(" ")} />;
  }
  return (
    <div className={Classes.inputElement}>
      <label className={Classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}
