import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import bgImage from "../assets/login5.jpg";
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
      // marginTop: theme.spacing(3),
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
    //margin: theme.spacing(50),
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
function Login() {
  const classes = useStyles();
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
        {/* <InputLabel htmlFor="age-native-simple">
          <Input id="1" placeholder="correo electrónico" />
        </InputLabel>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="password-native-simple">
          <Input id="2" placeholder="contraseña" />
        </InputLabel> */}
      </form>
    </div>
  );
}

export default Login;
