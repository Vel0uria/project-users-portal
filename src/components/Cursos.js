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
import placeholder from "../assets/courses-placeholder-white.jpg"
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
    height: window.innerHeight
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
    height: window.innerHeight
  },
  permanetDrawer: {
    // height: theme.spacing(80),
    backgroundColor: "#b5c6da",
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
//Card y Tabs: Responsivo en m??vil

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
  console.log(courses.idEnvioUnique)
  const handleNewComment = (id, e) => {
    form.idLeccion = id

    Swal.fire({
      title: "??Deseas guardar tu comentario?",
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
            Swal.fire("Comentario guardado", "success")
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
  const onMediaFallBack = event => {
    event.target.src = placeholder
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
            color: "slateblue",
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
        {courses.idEnvioUnique &&
          <Link to={`/formulario/${courses.idEnvioUnique}`}>
            <ListItemButton>
              <ListItemIcon>
                <SchoolRounded fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Presentar examen"
                primaryTypographyProps={{ variant: "h6", color: "textPrimary" }}
              />
            </ListItemButton>
          </Link>}
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
            titleTypographyProps={{
              fontSize: { xs: 20, sm: 24, md: 28, lg: 32, xl: 36 },
              color: "SlateBlue"
            }}
          />
          <CardMedia
            className={classes.media}
            height="450"
            component={mediaType}
            src={`${baseURL}/${media}`}
            allowFullScreen
            onError={onMediaFallBack}
          />
          {lessonId !== null &&
            <CardActions>
              <TextField
                fullWidth
                variant="outlined"
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
              <Tab label="Descripci??n" />
              <Tab label="Comentarios" />
              <Tab label="Recursos" />
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
                  Elige una lecci??n para mostrar los comentarios
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
