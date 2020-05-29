import React from "react";
import Layout from "./Component/Layout/Layout";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </React.Fragment>
  );
}

export default App;
