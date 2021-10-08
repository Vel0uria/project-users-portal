import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Diagnosticos from "./components/Diagnosticos";
import Cursos from "./components/Cursos";
import NavBar from "./components/NavBar";
import Formularios from "./components/Formularios";
import { MyContext } from "./services/Context";

const Router = () => {
  const { state } = useContext(MyContext);

  return (
    <BrowserRouter>
      {state.place === "Login" ? null : <NavBar />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/diagnosticos" component={Diagnosticos} />
        <Route exact path="/formulario/:id" component={Formularios} />
        <Route exact path="/cursos/:id" component={Cursos} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
