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
  MenuTwoTone,
  BookTwoTone,
  MenuBookTwoTone
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
import { textAlign } from "@mui/system";
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
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  },
  title: {
    textAlign: "center",
    marginLeft: drawerWidth,
    marginTop: -30,
    backgroundColor: "#FF6347",
    alignSelf: "center",
    width: 700,
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "1.5rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginLeft: 0,
      marginTop: 0
    }
  },
  mediaCard: {
    maxWidth: 600,
    marginTop: theme.spacing(1)
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
  },
  files: {
    paddingLeft: theme.spacing(1)
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
        <ListItemIcon>
          <MenuBookTwoTone fontSize="large" color="error" />
        </ListItemIcon>
        <ListItemText
          primary="SECCIONES"
          primaryTypographyProps={{
            color: "textSecondary",
            letterSpacing: 10,
            fontWeight: "bolder",
            variant: "subtitle1"
          }}
        />
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
                <ListItemText
                  primary={section.titulo}
                  primaryTypographyProps={{
                    variant: "subtitle2",
                    color: "textPrimary"
                  }}
                />
                {i === index ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={i === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
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
              <Divider />
            </div>
          );
        })}
      </List>
      <Toolbar className={classes.files}>
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
        <Card className={classes.mediaCard}>
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
