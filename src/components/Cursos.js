import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
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
  //Divider,
  Drawer,
  Toolbar,
  ListItemIcon,
  Tooltip,
  CardActions,
  TextField,
  Tab,
  Tabs,
  ListItem,
  ListItemButton,
  CardHeader
} from "@mui/material"
import Divider from "@mui/material/Divider"
import {
  ExpandLess,
  ExpandMore,
  MenuTwoTone,
  MenuBookTwoTone,
  CloudDownload,
  SendRounded,
  SchoolRounded
} from "@material-ui/icons"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"
import { MyContext } from "../services/Context"
import useForm from "./useForm"
import AuthService from "../services/auth"
import { InputAdornment } from "@material-ui/core"
const drawerWidth = 300
const useStyles = makeStyles(theme => ({
  root: {
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
      height: theme.spacing(125)
    },
    [theme.breakpoints.up("xl")]: {
      height: theme.spacing(140)
    },
    "& h3": {
      marginLeft: drawerWidth,
      //reemplazar valores negativos
      marginTop: -20
    }
  },
  title: {
    //textAlign: "center",
    //backgroundColor: "#FF6347DA",
    //alignSelf: "center",
    color: "grey",
    padding: theme.spacing(1.5),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: ["1.5rem", "!important"],
      width: 700
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ["1.2rem", "!important"],
      marginLeft: 0,
      marginTop: 0,
      width: 190
    }
  },
  card: {
    marginTop: theme.spacing(1),
    backgroundColor: ["#F8F8FFb3", "!important"],
    width: "95%",
    "& .MuiCardMedia-root": {
      [theme.breakpoints.only("md")]: {
        marginLeft: 40
      },
      [theme.breakpoints.up("lg")]: {
        //marginLeft: 100
      }
    }
  },
  tabs: {
    //width:750,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.between("md", "lg")]: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(2)
    }
  },
  list: {
    backgroundColor: "#b5c6da",
    height: "100%"
  },
  permanetDrawer: {
    height: theme.spacing(80),
    backgroundColor: "#b5c6da",
    //backgroundColor: "#3979a078",
    overflow: "scroll",
    scrollBehavior: "smooth",
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
  }
}))

//PENDIENTES:

//Card y Tabs: Responsivo en móvil

const Cursos = props => {
  const classes = useStyles()
  const { id } = props.match.params
  const { changePlace } = useContext(MyContext)
  const user = JSON.parse(localStorage.getItem("USER"))
  const token = user.token
  const authService = new AuthService()
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/"
  const [courses, setCourses] = useState({})
  const [files, setFiles] = useState([])
  const [sections, setSections] = useState([])
  const [media, setMedia] = useState({})
  const [mediaType, setMediaType] = useState("img")
  const [index, setIndex] = useState([])
  const [mobile, setMobile] = useState(false)
  const [val, setValue] = useState(0)
  const [lessonId, setLessonId] = useState(null)
  const [comments, setComments] = useState([])
  const [form, handleInputs] = useForm()

  useEffect(
    () => {
      changePlace("Cursos")
      axios
        .get(`${baseURL}/api/listadoLecciones/${id}`, {
          headers: { Authorization: token }
        })
        .then(({ data }) => {
          console.log(data)
          const courses = data.result
          setCourses(courses)
          setSections(courses.listaContenido)
          setFiles(courses.listaArchivos)
          setMedia(courses.urlImagen)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [baseURL, id, token, changePlace]
  )

  function getComments(id, mediaId) {
    setLessonId(id)
    handleMedia(mediaId)
    axios
      .get(`${baseURL}/api/obtenerComentarios/${id}`, {
        headers: { Authorization: token }
      })
      .then(({ data }) => {
        setComments(data.result)
      })
      .catch(err => console.log(err))
  }

  const handleNewComment = (id, e) => {
    form.idLeccion = id

    Swal.fire({
      title: "¿Deseas guardar tu comentario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        authService
          .postComment(form, token)
          .then(res => {
            Swal.fire("Comentario guardado", res.data.message, "success")
            getComments(id, media)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }

  const handleClick = i => {
    if (i === index) {
      setIndex([])
    } else {
      setIndex(i)
    }
  }
  const handleDrawer = () => {
    setMobile(!mobile)
  }

  const handleMedia = video => {
    setMedia(video)
    setMediaType("iframe")
    if (mobile === true) {
      setMobile(!mobile)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
            letterSpacing: 1.5,
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
                  handleClick(i)
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
                          getComments(lesson.idleccion, lesson.url)
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
                    )
                  })}
                </List>
              </Collapse>
              <Divider />
            </div>
          )
        })}
        <ListItemButton>
          <ListItemIcon>
            <SchoolRounded fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Presentar examen"
            primaryTypographyProps={{ variant: "h6", color: "textPrimary" }}
          />
        </ListItemButton>
        <Divider />
      </List>
    </div>
  )
  function TabPanel(props) {
    const { v, index, children } = props

    return (
      <div
        role="tabpanel"
        hidden={v !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {v === index &&
          <Box sx={{ p: 3 }}>
            {children}
          </Box>}
      </div>
    )
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
      {/* <Box> */}
      {/* <Typography variant="h3" className={classes.title}>
        {courses.nombreCurso}
      </Typography>
      <Divider flexItem orientation="vertical" /> */}
      {/* </Box> */}
      {/* <IconButton>
          <LibraryBooksIcon fontSize="large" />
        </IconButton> */}

      <Box
        component="main"
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          ml: { sm: `calc(10px + ${drawerWidth}px)` }
        }}
      >
        <Card variant="outlined" className={classes.card}>
          <CardHeader
            sx={{
              alignSelf: "center",
              background:
                "linear-gradient(to bottom, rgba(181,198,218) 0%, " +
                "rgba(191,208,228) 70%, rgba(0,0,0,0) 100%)"
            }}
            title={courses.nombreCurso}
            avatar={<LibraryBooksIcon color="warning" fontSize="large" />}
            titleTypographyProps={{ fontSize: "2.5rem", color: "SlateGrey" }}
          />
          <CardMedia
            className={classes.media}
            height="450"
            component={mediaType}
            src={`${baseURL}/${media}`}
            allowFullScreen
          />
          {lessonId !== null &&
            <CardActions>
              <TextField
                fullWidth
                variant="filled"
                id="1"
                label="Agrega un comentario"
                name="comentario"
                onChange={handleInputs}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={e => handleNewComment(lessonId, e)}>
                        <SendRounded fontSize="large" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CardActions>}
          <Divider />
          <CardActions sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className={classes.tabs}
              value={val}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Descripción" />
              <Tab label="Comentarios" />
              <Tab label="Recursos" />
              <Tab label="Evaluación" />
            </Tabs>
          </CardActions>
          <CardContent>
            <TabPanel v={val} index={0}>
              <Typography align="justify" variant="h6">
                En este curso {courses.descripcionGeneral}
              </Typography>
            </TabPanel>
            <TabPanel v={val} index={1}>
              {lessonId === null &&
                <Typography>
                  Elige una lección para mostrar los comentarios
                </Typography>}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 1200,
                  bgcolor: "background.paper"
                }}
              >
                {comments.length !== 0 &&
                  comments.map((comment, i) => {
                    return (
                      <div key={i}>
                        <ListItem>
                          <ListItemText
                            primary={comment.comentario}
                            secondary={comment.fecha}
                            primaryTypographyProps={{ variant: "h6" }}
                          />
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                      </div>
                    )
                  })}
              </List>
            </TabPanel>
            <TabPanel v={val} index={2}>
              {files.map((file, i) => {
                return (
                  <List key={i}>
                    <ListItem
                      disablePadding
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
                      <ListItemButton
                        onClick={() => {
                          setMedia(file.urlArchivo)
                          setMediaType("iframe")
                        }}
                      >
                        <ListItemText primary={file.idArchivoModulo} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )
              })}
            </TabPanel>
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
  )
}
export default Cursos
