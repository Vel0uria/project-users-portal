import React, { useContext } from "react";
import { MyContext } from "../services/Context";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
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
    backgroundColor: "aliceblue"
  }
}));

//PENDIENTES:
//verificar logout
//que el componente no se despliegue en Login
function NavBar() {
  const classes = useStyles();
  const { logout } = useContext(MyContext);

  return (
    <AppBar position="static" color="default">
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
    </AppBar>
  );
}
export default NavBar;
