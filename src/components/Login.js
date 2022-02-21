import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Swal from "sweetalert2"
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
  ButtonGroup,
  FormControl,
  Paper
} from "@mui/material"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import bgImage from "../assets/login5.jpg"
import AuthService from "../services/auth"
import useForm from "./useForm"
import { MyContext } from "../services/Context"
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: window.innerHeight,
    padding: theme.spacing(1)
  },

  title: {
    fontSize: 18,
    marginBottom: theme.spacing(7),
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    maxHeight: 320,
    padding: theme.spacing(6),
    backgroundColor: "Snow",
    borderRadius: 10,
    // position: "relative",
    [theme.breakpoints.between("md", "lg")]: {
      marginLeft: theme.spacing(70),
      padding: theme.spacing(7)
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(100),
      padding: theme.spacing(8)
      //width: 340,
    }
  },
  passwordbtn: {
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(8)
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginLeft: theme.spacing(10)
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(14)
    }
  }
}))

const Login = props => {
  const { changePlace, login } = useContext(MyContext)
  const classes = useStyles()
  const authService = new AuthService()
  // const [passwordStatus, setPassword] = useState(1);
  const [form, handleInputs] = useForm()
  const [errorState, setErrorState] = useState(false)
  const [helpText, setHelpText] = useState("")
  const [newPassword, setNewPassword] = useState(false)
  const [helpNewPassword, setHelpNewPassword] = useState(false)
  useEffect(
    () => {
      changePlace("Login")
    },
    [changePlace]
  )

  const handleLogin = () => {
    authService
      .login(form)
      .then(res => {
        if (res.data.status === 200) {
          if (res.data.result.restablecerContrasena === 1) {
            login(res.data.result)
            localStorage.setItem("USER", JSON.stringify(res.data.result))
            props.history.push("/dashboard")
          } else {
            setNewPassword(true)
            localStorage.setItem("USER", JSON.stringify(res.data.result))
          }
        } else {
          setHelpText("datos incorrectos")
          setErrorState(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const passwordRecover = () => {
    ;(async () => {
      const { value: email } = await Swal.fire({
        icon: "info",
        showCloseButton: true,
        title: "Reestablecer constraseña",
        input: "email",
        inputLabel: "Ingresa tu correo para reestablecer tu contraseña",
        inputPlaceholder: "Correo electrónico"
      })
      if (email) {
        console.log(email)
        authService
          .recoverPassword({ correoElectronico: email })
          .then(res => {
            if (res.data.status === 200) {
              console.log(res)
              Swal.fire(
                "En breve recibirás un correo con instrucciones para reestablecer tu contraseña"
              )
            } else if (res.data.status === 204) {
              Swal.fire({
                icon: "error",
                showCloseButton: "true",
                title: "El correo electrónico no es válido"
              })
              console.log(res)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    })()
  }
  const handleNewPassword = () => {
    authService
      .updatePassword(form)
      .then(res => {
        if (res.data.status === 200) {
          props.history.push("/dashboard")
        } else {
          setHelpText("las contraseñas no coinciden")
          setErrorState("true")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.formControl}>
        {!newPassword &&
          <FormControl>
            <Typography variant="h4" className={classes.title}>
              Login
            </Typography>
            <TextField
              error={errorState}
              fullWidth
              variant="outlined"
              id="1"
              label="Correo electrónico"
              name="usuario"
              onChange={handleInputs}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
            <TextField
              fullWidth
              error={errorState}
              variant="outlined"
              id="2"
              label="Contraseña"
              name="contrasena"
              onChange={handleInputs}
              helperText={helpText}
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="text"
              fullWidth
            >
              <Button size="large" onClick={handleLogin}>
                ENTRAR
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  passwordRecover()
                }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </ButtonGroup>
          </FormControl>}
        {newPassword &&
          <FormControl>
            <Typography variant="h4" className={classes.title}>
              Nueva contraseña
            </Typography>
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              variant="filled"
              label="Contraseña"
              name="contrasena"
              onChange={handleInputs}
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
            <TextField
              fullWidth
              variant="filled"
              label="Confirma tu contraseña"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
            <Button
              color="success"
              variant="outlined"
              size="large"
              sx={{ marginTop: 1 }}
              onClick={handleNewPassword}
            >
              GUARDAR
            </Button>
          </FormControl>}
      </Paper>
    </div>
  )
}

export default Login
