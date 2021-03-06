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
  const { show } = useState(false)
  //  const [helpNewPassword, setHelpNewPassword] = useState("")
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
        title: "Reestablecer constrase??a",
        input: "email",
        inputLabel: "Ingresa tu correo para reestablecer tu contrase??a",
        inputPlaceholder: "Correo electr??nico"
      })
      if (email) {
        authService
          .recoverPassword({ correoElectronico: email })
          .then(res => {
            if (res.data.status === 200) {
              Swal.fire(
                "En breve recibir??s un correo con instrucciones para reestablecer tu contrase??a"
              )
            } else if (res.data.status === 204) {
              Swal.fire({
                icon: "error",
                showCloseButton: "true",
                title: "El correo electr??nico no es v??lido"
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
    const user = JSON.parse(localStorage.getItem("USER"))
    const token = user.token
    const newPassword = form.contrasena
    authService
      .updatePassword({ contrasena: newPassword }, token)
      .then(res => {
        if (res.data.status === 200) {
          props.history.push("/dashboard")
        } else {
          setHelpText("las contrase??as no coinciden")
          setErrorState(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  function verifyPassword() {
    if (form.contrasena) {
      if (
        form.contrasena !== form.confirm ||
        form.contrasena.length < 6 ||
        form.contrasena.length > 10
      ) {
        return !show
      } else {
        return show
      }
    }
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
              label="Correo electr??nico"
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
              label="Contrase??a"
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
                ??Olvidaste tu contrase??a?
              </Button>
            </ButtonGroup>
          </FormControl>}
        {newPassword &&
          <FormControl>
            <Typography variant="h4" className={classes.title}>
              Nueva contrase??a
            </Typography>
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              variant="filled"
              label="Contrase??a"
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
              label="Confirma tu contrase??a"
              helperText={helpText}
              type="password"
              name="confirm"
              onChange={handleInputs}
              error={errorState}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
            />
            <Typography variant="subtitle1" mt={1}>
              La contrase??a debe tener 6 caracteres como m??nimo y 10 como m??ximo
            </Typography>
            <Button
              color="success"
              variant="outlined"
              size="large"
              sx={{ marginTop: 2 }}
              disabled={verifyPassword()}
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
