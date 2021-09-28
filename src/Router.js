import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Diagnosticos from "./components/Diagnosticos";
import Cursos from "./components/Cursos";
import NavBar from "./components/NavBar";
import { MyContext } from "./services/Context";

const Router = () => {
  const { login, changeisLogged } = useContext(MyContext);
  const { state } = useContext(MyContext);

  useEffect(
    () => {
      const getProfile = () => {
        login(state.user);
      };
      getProfile();
    },
    [changeisLogged, login, state.user]
  );
  return (
    <BrowserRouter>
      {state.place === "Login" ? null : <NavBar />}
      {console.log(state.place)}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/diagnosticos" component={Diagnosticos} />
        <Route exact path="/cursos/:id" component={Cursos} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
