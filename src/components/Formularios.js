import React, { useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(3),
    flexFlow: "column nowrap",
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  }
}));
function Formularios(props) {
  const { id } = props.match.params;
  const classes = useStyles();
  const { changePlace } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;

  useEffect(
    () => {
      changePlace("auth");
      axios
        .get(
          `https://impulsorintelectualhumanista.com/capacitacion/portafolio/obtenerFormulario/${id}`,
          {
            headers: { Authorization: token }
          }
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, id, changePlace]
  );

  return (
    <div className={classes.root}>
      <p>HOOOLIIIII</p>
    </div>
  );
}

export default Formularios;
