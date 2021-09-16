import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Box, Menu, MenuItem, Button } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles";
function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userData = { usuario: "jsantillan@test.com", contrasena: "Admin123" };

  const getCourses = id => {
    // axios.get(
    //   "https://impulsorintelectualhumanista.com/capacitacion/api/listadoModulosCursos/1"
    // );
    console.log(
      axios.post(
        "https://impulsorintelectualhumanista.com/capacitacion/api/login",
        userData
      )
    );
    axios
      .post(
        "https://impulsorintelectualhumanista.com/capacitacion/api/login",
        JSON.stringify(userData)
      )
      .then(({ data }) => {
        // localStorage.setItem("USER", JSON.stringify(data));
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getCourses();
  return (
    <div>
      <Box type="h1">Bienvenidx</Box>
      <Card>Dashboard</Card>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Mis Cursos
      </Button>
      <Menu
        id="simple-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem>Finanzas y contabilidad</MenuItem>
        <MenuItem>Negocios</MenuItem>
      </Menu>
    </div>
  );
}

export default Dashboard;
