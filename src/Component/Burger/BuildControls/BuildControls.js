import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import Classes from "./BuildControls.module.css";

const controls = [
  { label: "SALAD", type: "salad" },
  { label: "CHEESE", type: "cheese" },
  { label: "KABAB", type: "kabab" },
  { label: "MEAT", type: "meat" },
];

const BuildControls = (props) => (
  <div className={Classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={Classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);
export default BuildControls;
