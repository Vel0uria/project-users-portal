import React, { useEffect, useState, useContext } from "react";
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
  ListItemIcon,
  Tooltip,
  Button,
  CardActions,
  TextField,
  Tab,
  Tabs
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
import { MyContext } from "../services/Context";

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
    width: "fullWidth",
    height: "windowHeigth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    [theme.breakpoints.between("md", "lg")]: {
      height: theme.spacing(80),
      marginTop: 0
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(135)
    }
  },
  title: {
    textAlign: "center",
    marginLeft: drawerWidth,
    marginTop: -30,
    backgroundColor: "#FF6347DA",
    alignSelf: "center",
    width: 900,
    color: "white",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "1.5rem",
      width: 700
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginLeft: 0,
      marginTop: 0,
      width: 190
    }
  },
  mediaCard: {
    maxWidth: 1000,
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF9E"
  },
  list: {
    backgroundColor: "#b5c6da"
  },
  permanetDrawer: {
    height: "windowHeight",
    backgroundColor: "#3979a078",
    [theme.breakpoints.between("md", "lg")]: {
      backgroundColor: "#FFFFFF9E"
    },
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
  expandIcon: {
    justifyContent: "flex-end"
  },
  filesList: {
    //marginLeft: 50,
    paddingRight: 1
    // alignSelf: "flex-end"
  }
}));

//PENDIENTES:
//Lista: Scroll automático para lista de archivos
//Video: Opción para mostrar en pantalla completa

function Cursos(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const { changePlace } = useContext(MyContext);
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
  const [value, setValue] = useState(0);

  useEffect(
    () => {
      changePlace("auth");
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
    [baseURL, id, token, changePlace]
  );

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

  const handleMedia = video => {
    setMedia(video);
    if (mobile === true) {
      setMobile(!mobile);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                    variant: "h6",
                    color: "textPrimary"
                  }}
                />
                <ListItemIcon className={classes.expandIcon}>
                  {i === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              </ListItemButton>
              <Collapse in={i === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {sections[i].lecciones.map((lesson, i) => {
                    return (
                      <ListItemButton
                        key={i}
                        onClick={() => {
                          handleMedia(lesson.url);
                        }}
                      >
                        <ListItemText
                          primary={lesson.nombre}
                          primaryTypographyProps={{
                            variant: "subtitle2",
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
              variant: "subtitle1",
              color: "textPrimary"
            }}
          />
          <ListItemIcon className={classes.expandIcon}>
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
                    setMedia(file.urlArchivo);
                    //  displayFile(`${baseURL}/${file.urlArchivo}`);
                  }}
                  primary={file.idArchivoModulo}
                  primaryTypographyProps={{ variant: "button" }}
                />
                {/* </ListItemButton> */}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
  function TabPanel(props) {
    const { value, index } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        <TextField fullWidth label="Escribe tus comentarios" />{" "}
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Toolbar>
        <Tooltip title="Secciones">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuTwoTone fontSize="large" />
          </IconButton>
        </Tooltip>
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
          />
          <Divider />
          <CardContent>
            <Typography align="justify" variant="h6">
              En este curso {courses.descripcionGeneral}
            </Typography>
          </CardContent>
          <CardActions>
            <Tabs value={value}>
              <Tab label="Comentarios" />
              <Tab label="Recursos" />
              <Tab label="Cuestionario" />
            </Tabs>
          </CardActions>
          <CardContent>
            <TabPanel value={value} index={0} />
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
