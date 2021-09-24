import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import {
  Typography,
  List,
  ListItemText,
  ListSubheader,
  Collapse,
  Box,
  Card,
  CardMedia,
  CardContent
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

//FIXES:
//-La función collapse se abre en todos los items de la lista

//PENDIENTES:
//-Función que despliegue el archivo correspondiente a la lección
//-Desplegar archivos
//¿dar opción de descarga?

function Cursos(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const { state } = useContext(MyContext);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const [courses, setCourses] = useState({});
  const [files, setFiles] = useState([]);
  const [sections, setSections] = useState([]);
  const [media, setMedia] = useState({});
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
          setSections(courses.listaContenido);
          setFiles(courses.listaArchivos);
          setMedia(courses.urlImagen);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [baseURL, id, state]
  );
  function mediaDisplay() {
    return (
      <div>
        <Card>
          <CardMedia component="img" image={`${baseURL}/${media}`} />
        </Card>
      </div>
    );
  }
  // console.log(media);
  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h2">
          {courses.nombreCurso}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
        {mediaDisplay(media)}
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
          {sections.map((section, i) => {
            return (
              <ListItemButton key={i} onClick={handleClick}>
                <ListItemText primary={section.titulo} />
                {open ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div">
                    {sections[i].lecciones.map((lesson, i) => {
                      // console.log(lesson);
                      return (
                        <ListItemButton
                          key={i}
                          sx={{ pl: 4 }}
                          onClick={() => {
                            setMedia(lesson.url);
                            //    setMedia(prevState => ({
                            //   prevState,
                            //   lesson.url
                            // }));
                          }}
                        >
                          <ListItemText secondary={lesson.nombre} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </div>
  );
}
export default Cursos;
