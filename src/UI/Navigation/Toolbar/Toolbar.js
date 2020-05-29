import React from "react";
import Classes from "./Toolbar.module.css";
import Logo from "../../../Component/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = (props) => (
  <header className={Classes.Toolbar}>
    <DrawerToggle clicked={props.drawToggleClicked} />
    <div className={Classes.Logo}>
      <Logo />
    </div>
    <nav className={Classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default Toolbar;
