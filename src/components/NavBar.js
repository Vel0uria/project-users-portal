import React, { useContext } from "react";
import Swal from "sweetalert2";
import { MyContext } from "../services/Context";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import {
  ExitToApp,
  NotificationsActiveTwoTone,
  InboxTwoTone
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#b5c6da"
  }
}));

//PENDIENTES:
//Estilos
const NavBar = props => {
  const classes = useStyles();
  const { logout } = useContext(MyContext);
  const history = useHistory();
  const handleLogout = e => {
    e.preventDefault();
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      //   text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        logout();
        history.push("/");
      }
    });
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Tooltip title="bandeja de entrada">
          <IconButton>
            <InboxTwoTone />
          </IconButton>
        </Tooltip>
        <Tooltip title="notificaciones">
          <IconButton>
            <NotificationsActiveTwoTone />
          </IconButton>
        </Tooltip>
        <Tooltip title="cerrar sesión">
          <IconButton onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
