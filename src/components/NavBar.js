import React, { useContext } from "react"
import Swal from "sweetalert2"
import { MyContext } from "../services/Context"
import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material"
import {
  ExitToApp,
  NotificationsActiveTwoTone,
  InboxTwoTone,
  HomeTwoTone
} from "@material-ui/icons"
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
const useStyles = makeStyles(theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#b5c6da",
    padding: 1
  },
  backIcon: {
    marginRight: theme.spacing(10),
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
      marginRight: theme.spacing(250)
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
          <IconButton onClick={history.goBack} color="secondary">
            <ArrowBackRounded
              fontSize="large"
              sx={{ paddingRight: { xs: 9, sm: 65, md: 90, lg: 140, xl: 185 } }}
            />
          </IconButton>}
        {state.place !== "Dashboard" &&
          <Link to="/dashboard">
            <IconButton>
              <Tooltip title="dashboard">
                <HomeTwoTone fontSize="large" />
              </Tooltip>
            </IconButton>
          </Link>}
        <Tooltip title="bandeja de entrada">
          <IconButton>
            <InboxTwoTone fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="notificaciones">
          <IconButton>
            <NotificationsActiveTwoTone fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="cerrar sesión">
          <IconButton onClick={handleLogout}>
            <ExitToApp fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
