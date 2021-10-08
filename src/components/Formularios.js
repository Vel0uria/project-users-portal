import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import { Typography, Box } from "@material-ui/core";
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
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
    fontSize: "1.7rem",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  }
}));
function Formularios(props) {
  const { id } = props.match.params;
  const classes = useStyles();
  const { changePlace } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({});
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
          const sections = data.result.secciones;
          setSections(sections);
          setFormData(data.result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, id, changePlace]
  );

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {formData.nombreFormulario}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="overline">Instrucciones:</Typography>
        <Typography variant="body1">
          {formData.indicaciones}
        </Typography>
      </Box>
    </div>
  );
}

export default Formularios;
