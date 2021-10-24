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
    //pendiente: ajustar
    height: theme.spacing(76),
    padding: theme.spacing(1),

    [theme.breakpoints.between("sm", "md")]: {
      height: theme.spacing(120)
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: theme.spacing(130)
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(150)
    }
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
          login(res.data.result)
          localStorage.setItem("USER", JSON.stringify(res.data.result))
          props.history.push("/dashboard")
        } else {
          setHelpText("datos incorrectos")
          setErrorState(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const passwordChange = () => {
    Swal.fire({
      title: "Introduce tu correo electrónico",
      icon: "success",
      html: `<input type="text" id="mail" class="swal2-input" placeholder="E-mail">`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.formControl}>
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
            onChange={handleInputs} // helperText={helpText}
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
              size="small"
              onClick={() => {
                passwordChange()
              }}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </ButtonGroup>
        </FormControl>
      </Paper>
    </div>
  )
}

export default Login
