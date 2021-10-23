import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
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
  Divider,
  Drawer,
  Toolbar,
  ListItemIcon,
  Tooltip,
  CardActions,
  TextField,
  Tab,
  Tabs,
  ListItem,
  ListItemButton
} from "@mui/material"
import {
  ExpandLess,
  ExpandMore,
  FolderOpen,
  CommentTwoTone,
  QuestionAnswerTwoTone,
  MenuTwoTone,
  MenuBookTwoTone,
  CloudDownload,
  SendRounded
} from "@material-ui/icons"
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
      height: theme.spacing(175)
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
    backgroundColor: "#FFFFFF9E",
    width: "100%",
    "& .MuiCardMedia-root": {
      [theme.breakpoints.only("md")]: {
        marginLeft: 40
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: 110
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
  }
}))

//PENDIENTES:
//Card y Tabs: Responsivo en móvil

function Cursos(props) {
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
  const [value, setValue] = useState(0)
  const [lessonId, setLessonId] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, updateComment] = useState({})
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

  function getComments(id) {
    //   if (lessonId !== null) {
    setLessonId(id)
    form.idLeccion = lessonId
    axios
      .get(`${baseURL}/api/obtenerComentarios/${id}`, {
        headers: { Authorization: token }
      })
      .then(({ data }) => {
        setComments(data.result)
      })
      .catch(err => console.log(err))
    //  }
    // },
    // [lessonId, token]
  }

  function DisplayComments() {
    return (
      <List sx={{ width: "100%", maxWidth: 1200, bgcolor: "background.paper" }}>
        {/* <ListItem alignItems="center"> */}
        {lessonId !== null &&
          <TextField
            fullWidth
            label="Agrega un comentario"
            id="1"
            variant="filled"
            name="comentario"
            onChange={handleInputs}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleNewComment}>
                    <SendRounded fontSize="large" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />}
        {/* </ListItem> */}
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
    )
  }

  const handleNewComment = () => {
    authService
      .postComment(form, token)
      .then(({ res }) => {
        updateComment(prevState => {
          console.log(res.data)
          return { ...prevState, ...res.data }
        })
      })
      .catch(err => {
        console.log(err)
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
                          handleMedia(lesson.url)
                          getComments(lesson.idleccion)
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
      </List>
    </div>
  )
  function TabPanel(props) {
    const { value, index, children } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index &&
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
        <Card variant="outlined" className={classes.card}>
          <CardMedia
            className={classes.media}
            height="350"
            component={mediaType}
            src={`${baseURL}/${media}`}
            allowFullScreen
          />
          <CardContent>
            <Typography align="justify" variant="h6">
              En este curso {courses.descripcionGeneral}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Comentarios" icon={<CommentTwoTone />} />
              <Tab label="Recursos" icon={<FolderOpen />} />
              <Tab label="Cuestionario" icon={<QuestionAnswerTwoTone />} />
            </Tabs>
          </CardActions>
          <CardContent>
            <TabPanel value={value} index={0}>
              {lessonId === null &&
                <Typography>
                  Elige una lección para mostrar los comentarios
                </Typography>}
              <DisplayComments />
            </TabPanel>
            <TabPanel value={value} index={1}>
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
