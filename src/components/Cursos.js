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
  CardContent,
  CardActions,
  IconButton
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";
import {
  ExpandLess,
  ExpandMore,
  FolderOpen,
  FontDownload
} from "@material-ui/icons";
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

//¿dar opción de descargar archivos?

function Cursos(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const { state } = useContext(MyContext);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const [courses, setCourses] = useState({});
  const [files, setFiles] = useState([]);
  const [sections, setSections] = useState([]);
  const [media, setMedia] = useState({});
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };
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
              <List sx={{ ml: 3 }}>
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
    );
  }

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
                  <List
                    sx={{ margin: 10 }}
                    disablePadding
                    component="div"
                    subheader={<ListSubheader>Lecciones</ListSubheader>}
                  >
                    {sections[i].lecciones.map((lesson, i) => {
                      return (
                        <ListItemButton
                          key={i}
                          onClick={() => {
                            setMedia(lesson.url);
                          }}
                        >
                          <ListItemText primary={lesson.nombre} />
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
