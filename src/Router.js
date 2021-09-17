import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Diagnosticos from "./components/Diagnosticos";

const Router = () => {
 
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/diagnosticos" component={Diagnosticos} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
