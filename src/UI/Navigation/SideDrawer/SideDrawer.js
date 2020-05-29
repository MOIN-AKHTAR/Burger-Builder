import React from "react";
import Classes from "./SideDrawer.module.css";
import Logo from "../../../Component/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Backdrop/Backdrop";
import Wrapper from "../../../hoc/Wrapper/Wrapper";

const SideDrawer = (props) => {
  let attchedClass = [Classes.SideDrawer, Classes.Close];
  if (props.open) {
    attchedClass = [Classes.SideDrawer, Classes.Open];
  }
  return (
    <Wrapper>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attchedClass.join(" ")}>
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Wrapper>
  );
};
export default SideDrawer;
