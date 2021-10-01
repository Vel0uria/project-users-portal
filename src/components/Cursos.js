import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {
  ExpandLess,
  ExpandMore,
  FolderOpen,
  MenuTwoTone,
  MenuBookTwoTone,
  CloudDownload
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
const drawerWidth = 240;
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
    backgroundColor: "#FF6347DA",
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
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF9E"
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
  filesList: {
    //marginLeft: 50,
    paddingRight: 1
  }
}));

//PENDIENTES:
//-Archivos:descargar y desplegar en otra pantalla
//Estilos-responsive
//-NOTAS:

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
  const [mediaType, setMediaType] = useState("video");

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
  const displayFile = file => {
    window.open(file);
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
                {/* <ListItemIcon> */}
                {i === index ? <ExpandLess /> : <ExpandMore />}
                {/* </ListItemIcon> */}
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
                        <ListItemText
                          primary={lesson.nombre}
                          primaryTypographyProps={{
                            variant: "caption",
                            color: "textPrimary"
                          }}
                        />
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
      <Toolbar className={classes.filesList}>
        <ListItemButton onClick={handleExpand}>
          <ListItemIcon>
            <FolderOpen fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Archivos"
            primaryTypographyProps={{
              variant: "subtitle2",
              color: "textPrimary"
            }}
          />
          <ListItemIcon>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
      </Toolbar>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List>
          {files.map((file, i) => {
            return (
              <ListItem
                key={i}
                secondaryAction={
                  <Link
                    to={`${baseURL}/${file.urlArchivo}`}
                    target="_blank"
                    download
                  >
                    <ListItemIcon>
                      <CloudDownload />
                    </ListItemIcon>
                  </Link>
                }
              >
                {/* <ListItemButton onClick={() => {
                    displayFile(`${baseURL}/${file.urlArchivo}`);
                  }}> */}
                <ListItemText
                  onClick={() => {
                    displayFile(`${baseURL}/${file.urlArchivo}`);
                  }}
                  primary={file.idArchivoModulo}
                  primaryTypographyProps={{ variant: "button" }}
                />
                {/* </ListItemButton> */}
              </ListItem>
            );
            // <div key={i}>

            //   <Link
            //     to={`${baseURL}/${file.urlArchivo}`}
            //     target="_blank"
            //     download
            //   >
            //     <ListItemIcon>
            //       <CloudDownload />
            //     </ListItemIcon>
            //   </Link>
            // </div>
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
        <Card variant="outlined" className={classes.mediaCard}>
          <CardMedia
            height="400"
            component="iframe"
            src={`${baseURL}/${media}`}
            type="video"
          />
          <Divider />
          <CardContent>
            <Typography variant="subtitle1" sx={{ textAlign: "justified" }}>
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
