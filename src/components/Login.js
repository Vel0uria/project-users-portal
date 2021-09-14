import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    padding: theme.spacing(0.5),
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(20),
    minWidth: 120,
    marginRight: theme.spacing(200),
    padding: theme.spacing(2),
    backgroundColor: "aliceblue",

    "& > *": {
      margin: theme.spacing(1)
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  },
  textField: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    display: "flex",
    flexDirection: "row"
  }
}));
function Login() {
  const classes = useStyles();
  return (
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
      >
        <Button>¿Olvidaste tu contraseña?</Button>
        <Button>ENTRAR</Button>
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
  );
}

export default Login;
