import React from "react";
import LogoImage from "../../Assets/27.1 burger-logo.png.png";
import Classes from "./Logo.module.css";

const Logo = () => (
  <div className={Classes.Logo}>
    <img src={LogoImage} alt="Burger Logo" />
  </div>
);
export default Logo;
