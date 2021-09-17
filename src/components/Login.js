import React, {useContext, useEffect} from "react";
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
import useForm from "./useForm"
import { MyContext } from "../services/Context";
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
    [theme.breakpoints.between("md","lg")]: {
      height: theme.spacing(130),
     
    },
         [theme.breakpoints.up('lg')]: {
         height: theme.spacing(150)
        },
  },

  title: {
    fontSize:18,
    marginBottom: theme.spacing(7),
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
  },
  formControl: {
    margin:theme.spacing(1),
    minWidth: 140,
    maxHeight:320,
    padding: theme.spacing(6),
    backgroundColor: "Snow",
    borderRadius: 10,
    position: "relative",

    [theme.breakpoints.between("md", "lg")]: {
      marginLeft: theme.spacing(70),
      padding: theme.spacing(7),
    },
           [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(100),
         width: 340,
        },
  },
  textField: {
    marginBottom: theme.spacing(1),
   minWidth: "25ch",
    display: "flex",
    flexDirection: "row",
  },
      
}));


const Login = props => {
  const { changePlace, login } = useContext(MyContext);
  const classes = useStyles();
  const authService = new AuthService()
  const [form, handleInputs] = useForm();

    useEffect(() => {
    changePlace("api");
  }, [changePlace]);

  const handleLogin = () =>{
  authService.login(form).then(res =>{
   
    login(res.data.result)
          localStorage.setItem("USER", JSON.stringify(res.data.result));
         props.history.push("/dashboard");
  }).catch(err =>{
    console.log(err);
  })
  }

  return (
    <div className={classes.root}>
      <form className={classes.formControl}>
        <Card className={classes.title} variant="outlined">
          <Typography variant="h4">Login</Typography>
        </Card>
        <Grid item className={classes.textField}>
          <TextField
            className={classes.textField}
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
          />
        </Grid>

        <Grid item>
          <TextField
            className={classes.textField}
            id="2"
            label="Contraseña"
            name="contrasena"
            onChange={handleInputs}
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
          <Button size="large" onClick={handleLogin}>ENTRAR</Button>
          <Button size="small">¿Olvidaste tu contraseña?</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Login;
