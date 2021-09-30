import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Typography,
  List,
  ListItemText,
  Collapse,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  Drawer,
  Toolbar,
  ListItemIcon
} from "@material-ui/core";
import ListItemButton from "@mui/material/ListItemButton";
import {
  ExpandLess,
  ExpandMore,
  FolderOpen,
  MenuTwoTone
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
const drawerWidth = 240;
//const windowHeight = useRef()
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
    // margin: theme.spacing(2),
    // marginTop: theme.spacing(2),
    marginLeft: drawerWidth,
    backgroundColor: "#FF6347",
    alignSelf: "center",
    width: "55%",
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "1.5rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginLeft: 0
    }
  },
  list: {
    backgroundColor: "#b5c6da"
  },
  permanetDrawer: {
    height: "windowHeight",
    backgroundColor: "#3979a078",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    [theme.breakpoints.only("sm")]: {
      display: "block"
    },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth
    }
  },
  drawer: {
    backgroundColor: "#3979a078",
    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
    [theme.breakpoints.down("sm")]: {
      display: "block"
    },
    [theme.breakpoints.only("sm")]: {
      display: "none"
    }
  }
}));

//PENDIENTES:
//-Archivos:descargar y desplegar en otra pantalla
//Estilos-responsive

function Cursos(props) {
  const classes = useStyles();
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
  const [mobile, setMobile] = useState(false);

  const handleExpand = props => {
    setExpanded(!expanded);
  };
  const handleClick = i => {
    if (i === index) {
      setIndex([]);
    } else {
      setIndex(i);
    }
  };
  const handleDrawer = () => {
    setMobile(!mobile);
  };

  const drawer = (
    <div className={classes.list}>
      <Toolbar>
        <Typography variant="overline">Secciones</Typography>
      </Toolbar>
      <Divider />
      <List>
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
      <Toolbar>
        <ListItemButton onClick={handleExpand}>
          <ListItemIcon>
            <FolderOpen fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Archivos" />
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Toolbar>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {files.map(file => {
            return (
              <div key={file.idArchivoModulo}>
                <ListItemText primary={file.idArchivoModulo} />
                <Divider />
              </div>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
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

  return (
    <div className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuTwoTone />
        </IconButton>
      </Toolbar>
      <Typography variant="h3" className={classes.title}>
        {courses.nombreCurso}
      </Typography>
      <Box
        component="main"
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          ml: { sm: `calc(10px + ${drawerWidth}px)` }
        }}
      >
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
        </Card>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="drawers"
      >
        <Drawer variant="permanent" className={classes.permanetDrawer} open>
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobile}
          onClose={handleDrawer}
          ModalProps={{ keepMounted: true }}
          className={classes.drawer}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}
export default Cursos;
