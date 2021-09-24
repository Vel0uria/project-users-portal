import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import {
  Typography,
  List,
  ListItemText,
  ListSubheader,
  Collapse,
  Box
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  }
}));

function Cursos(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const { state } = useContext(MyContext);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const [courses, setCourses] = useState({});
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(
    () => {
      axios
        .get(`${baseURL}/api/listadoLecciones/${id}`, {
          headers: { Authorization: state.user.token }
        })
        .then(({ data }) => {
          const courses = data.result;
          setCourses(courses);
          // const sections = courses.listaContenido;
          setSections(courses.listaContenido);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [baseURL, id, state]
  );
  // console.log(sections);
  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h2">
          {courses.nombreCurso}
        </Typography>
      </Box>
      <Box>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader>
              {`categoría ${courses.categoria}`}
            </ListSubheader>
          }
        >
          {sections.map(section => {
            return (
              <ListItemButton key={section.idCurso} onClick={handleClick}>
                <ListItemText primary={section.titulo} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              //        <Collapse in={open} timeout="auto" unmountOnExit>
              //   <List component="div">
              //     <ListItemText primary="holoo" />
              //   </List>
              // </Collapse>
            );
          })}
        </List>
      </Box>
    </div>
  );
}
export default Cursos;
