import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Box, Menu, MenuItem, Button, Typography } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../services/Context";
function Dashboard() {

  const { state } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = state.user.datosPerfil
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Card>Dashboard</Card>
      <Box type="p">
        <Typography type="h1">Bienvenido {userData.nombreUsuario} </Typography>
       </Box>
    
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
