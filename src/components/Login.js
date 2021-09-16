import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Button,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  ButtonGroup
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import bgImage from "../assets/login5.jpg";
import AuthService from "../services/auth";
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
    height: theme.spacing(106),
    padding: theme.spacing(1),

    [theme.breakpoints.between("sm", "md")]: {
      height: theme.spacing(130)
    },
    [theme.breakpoints.between("lg")]: {
      height: theme.spacing(140)
    }
  },
  background: {
    backgroundImage: `url(${bgImage})`
  },
  title: {
    fontSize: 18,
    marginBottom: theme.spacing(8),
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white"
  },
  formControl: {
    minWidth: 140,
    padding: theme.spacing(8),
    backgroundColor: "Snow",
    borderRadius: 10,
    position: "relative",
    [theme.breakpoints.between("sm", "md")]: {
      width: 480,
      marginRight: theme.spacing(35),
      padding: theme.spacing(10)
    },
    [theme.breakpoints.between("md", "lg")]: {
      marginLeft: theme.spacing(90)
    }
  },

  textField: {
    marginBottom: theme.spacing(1),
    minWidth: "25ch",
    display: "flex",
    flexDirection: "row"
  }
}));


function Login(props) {

  const classes = useStyles();
  const authService = new AuthService()
  const handleLogin = () =>{
  authService.login( {usuario:"jsantillan@test.com", contrasena:"Admin123"})
  .then(res =>{
    console.log(res.data.result);
          localStorage.setItem("USER", JSON.stringify(res.data.result));
         props.history.push("/dashboard");
  }).catch(err =>{
    console.log(err);
  })
  }

  handleLogin()
  return (
    <div className={classes.root}>
      {/* <Paper className={classes.background}> */}
      <form className={classes.formControl}>
        <Card className={classes.title} variant="outlined">
          <Typography variant="h3">Login</Typography>
        </Card>

        <Grid item className={classes.textField}>
          <TextField
            className={classes.textField}
            id="1"
            label="Correo electrónico"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            className={classes.textField}
            id="2"
            label="Contraseña"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
          fullWidth
        >
          <Button size="large">ENTRAR</Button>
          <Button size="small">¿Olvidaste tu contraseña?</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Login;
