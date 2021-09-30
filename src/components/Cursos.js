import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Typography,
  List,
  ListItemText,
  ListSubheader,
  Collapse,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";
import { ExpandLess, ExpandMore, FolderOpen } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    padding: theme.spacing(1.5),
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#FF6347",
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },
  list: {
    backgroundColor: "#3979a078",
    // width: "100%",
    maxWidth: 360,
    marginRight: theme.spacing(1)
  }
}));

//PENDIENTES:
//-Archivos:descargar y desplegar en otra pantalla
//Estilos-responsive

function Cursos(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = props.match.params;
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const [courses, setCourses] = useState({});
  const [files, setFiles] = useState([]);
  const [sections, setSections] = useState([]);
  const [media, setMedia] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState([]);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  const handleClick = i => {
    if (i === index) {
      setIndex([]);
    } else {
      setIndex(i);
    }
  };

  useEffect(
    () => {
      axios
        .get(`${baseURL}/api/listadoLecciones/${id}`, {
          headers: { Authorization: token }
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
    [baseURL, id, token]
  );
  console.log(theme);
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {courses.nombreCurso}
      </Typography>
      <Box
        sx={{ display: "flex", flexFlow: "row wrap", justifyContent: "center" }}
      >
        <List
          className={classes.list}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list">
              {`Categoría ${courses.categoria}`}
            </ListSubheader>
          }
        >
          {sections.map((section, i) => {
            return (
              <div key={i}>
                <ListItemButton
                  onClick={() => {
                    handleClick(i);
                  }}
                >
                  <ListItemText primary={section.titulo} />
                  {i === index ? <ExpandLess /> : <ExpandMore />}
                  <Collapse in={i === index} timeout="auto" unmountOnExit>
                    <List disablePadding component="div">
                      {sections[i].lecciones.map((lesson, i) => {
                        return (
                          <ListItemButton
                            key={i}
                            onClick={() => {
                              setMedia(lesson.url);
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={lesson.nombre} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </ListItemButton>
                <Divider />
              </div>
            );
          })}
        </List>
        <div>
          <Card>
            <CardMedia
              height="400"
              component="iframe"
              src={`${baseURL}/${media}`}
            />
            <CardContent>
              <Typography variant="h6">
                En este curso {courses.descripcionGeneral}
              </Typography>
            </CardContent>
            <CardActions>
              <Typography variant="subtitle1">Archivos</Typography>
              <IconButton onClick={handleExpand}>
                <FolderOpen fontSize="large" color="primary" />
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <List>
                  {files.map(file => {
                    return (
                      <ListItemText
                        key={file.idArchivoModulo}
                        primary={file.idArchivoModulo}
                      />
                    );
                  })}
                </List>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </Box>
    </div>
  );
}
export default Cursos;
