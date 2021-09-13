import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(16),
    minWidth: 120,
    marginRight: theme.spacing(2)
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  },
  textField: {
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
    <Box component="form" className={classes.formControl}>
      <Grid item>
        <TextField
          className={classes.textField}
          id="1"
          label="Correo electrónico"
        />
      </Grid>
      <Grid item>
        <TextField className={classes.textField} id="2" label="Contraseña" />
      </Grid>

      {/* <InputLabel htmlFor="age-native-simple">
          <Input id="1" placeholder="correo electrónico" />
        </InputLabel>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="password-native-simple">
          <Input id="2" placeholder="contraseña" />
        </InputLabel> */}
    </Box>
  );
}

export default Login;
