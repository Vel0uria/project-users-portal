import React, { useContext } from "react"
import Swal from "sweetalert2"
import { MyContext } from "../services/Context"
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core"
import {
  ExitToApp,
  NotificationsActiveTwoTone,
  InboxTwoTone,
  HomeTwoTone
} from "@material-ui/icons"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
const useStyles = makeStyles(theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#b5c6da"
  },
  backIcon: {
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(10)
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginRight: theme.spacing(60)
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginRight: theme.spacing(100)
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginRight: theme.spacing(120)
    },
    [theme.breakpoints.up("xl")]: {
      marginRight: theme.spacing(200)
    }
  }
}))

//PENDIENTES:
//Navegación: dashboard, atrás, ¿diagnósticos y cursos?
const NavBar = props => {
  const classes = useStyles()
  const { logout, state } = useContext(MyContext)
  const history = useHistory()
  const handleLogout = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        logout()
        history.push("/")
      }
    })
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        {state.place !== "Dashboard" &&
          <IconButton className={classes.backIcon} onClick={history.goBack}>
            <ArrowBackIcon fontSize="large" color="primary" />
          </IconButton>}
        {state.place !== "Dashboard" &&
          <Link to="/dashboard">
            <IconButton>
              <Tooltip title="dashboard">
                <HomeTwoTone />
              </Tooltip>
            </IconButton>
          </Link>}
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
  )
}
export default NavBar
