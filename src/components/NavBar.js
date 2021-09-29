import React, { useContext } from "react";
import { MyContext } from "../services/Context";
import { AppBar, Toolbar, IconButton, Divider } from "@material-ui/core";
import {
  ExitToApp,
  NotificationsActiveTwoTone,
  InboxTwoTone
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#b5c6da"
  }
}));

//PENDIENTES:
//Estilos
function NavBar() {
  const classes = useStyles();
  const { logout } = useContext(MyContext);

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <IconButton>
          <InboxTwoTone />
        </IconButton>
        <IconButton>
          <NotificationsActiveTwoTone />
        </IconButton>
        <Link to="/">
          <IconButton onClick={logout}>
            <ExitToApp />
          </IconButton>
        </Link>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
export default NavBar;
