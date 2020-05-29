import React from "react";
import Classes from "./BuildControl.module.css";

const BuildControl = (props) => (
  <div className={Classes.BuildControl}>
    <div className={Classes.Label}>{props.label}</div>
    <button
      onClick={props.remove}
      className={Classes.Less}
      disabled={props.disabled}
    >
      Less
    </button>
    <button onClick={props.added} className={Classes.More}>
      More
    </button>
  </div>
);
export default BuildControl;
