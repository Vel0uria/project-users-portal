import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Avatar,
  Tab,
  Tabs,
  Paper,
  Box,
  IconButton
} from "@mui/material"
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined"
import QuizIcon from "@mui/icons-material/Quiz"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"
import { MyContext } from "../services/Context"
import placeholder from "../assets/placeholder.png"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    flexFlow: "column nowrap",
    height: window.innerHeight,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
    fontSize: "1.7rem",
    borderRadius: 6,
    padding: 7,
    [theme.breakpoints.up("lg")]: {
      // fontSize: "2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },

  courses: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    //  marginTop: 40,
    minWidth: 200,
    maxWidth: 300
  },
  tabs: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF78"
  }
}))

// PENDIENTES DASHBOARD:

//-MediaCard: corregir warning
//-Categorías: deshabilitar Tab si la categoría viene vacía
// - Estilos:

function Dashboard() {
  const classes = useStyles()
  const [categories, setCategory] = useState([])
  const [courses, setCourses] = useState([])
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion"
  const [value, setValue] = useState(0)
  const user = JSON.parse(localStorage.getItem("USER"))
  const token = user.token
  const { changePlace } = useContext(MyContext)

  useEffect(
    () => {
      changePlace("Dashboard")

      axios
        .get(`${baseURL}/api/listadoModulosCursos/1`, {
          headers: { Authorization: token }
        })
        .then(({ data }) => {
          const category = data.result
          setCategory(category)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [baseURL, token, changePlace]
  )

  useEffect(
    () => {
      if (categories.length !== 0) {
        const id = categories[value].idCategoria

        axios
          .get(`${baseURL}/api/listadoUsuariosCursos/${id}`, {
            headers: {
              Authorization: token
            }
          })
          .then(({ data }) => {
            const courses = data.result
            setCourses(courses)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    [categories, token, value]
  )
  const onMediaFallBack = event => {
    event.target.src = placeholder
  }

  function TabPanel(props) {
    const { value, index } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index &&
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#FFFFFF80",
              flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" }
            }}
          >
            {courses.map((course, i) => {
              if (!courses) return <Typography>Cargando</Typography>
              else {
                return (
                  <Card className={classes.courses} variant="outlined" key={i}>
                    <CardHeader
                      title={course.nombre}
                      subheader={`Módulo ${course.idModulo}`}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={`${baseURL}${course.urlImagen}`}
                      onError={onMediaFallBack}
                      alt="URLimagen"
                      className={classes.coursesImg}
                    />
                    <CardActions disableSpacing>
                      <Typography variant="overline" color="primary">
                        Ir a lecciones
                      </Typography>
                      <Link to={`cursos/${course.idModulo}`}>
                        <IconButton aria-label="play">
                          <PlayCircleOutlineOutlinedIcon
                            fontSize="large"
                            color="secondary"
                          />
                        </IconButton>
                      </Link>
                    </CardActions>
                  </Card>
                )
              }
            })}
          </Box>}
      </div>
    )
  }

  const handleChange = newValue => {
    setValue(newValue)
  }

  if (!user) return <p>Cargando</p>
  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        className={classes.title}
        sx={{
          fontSize: { xs: 18, sm: 22, md: 26, lg: 32, xl: 38 },
          fontWeight: "bold"
        }}
      >
        Dashboard
      </Typography>
      <Box m={1} component="div">
        <Card>
          <CardActions sx={{ m: 1 }}>
            <Avatar alt="user-image" src={user.datosPerfil.avatar} />
            <Typography variant="h5" sx={{ pl: 1 }}>
              {user.datosPerfil.nombreUsuario}
            </Typography>
          </CardActions>

          <Typography variant="subtitle1" sx={{ pl: 8, mt: -2 }}>
            {user.datosPerfil.nombreCompania}
          </Typography>
          <CardContent>
            <Link to="/diagnosticos">
              <Button
                variant="contained"
                disableElevation
                size="large"
                startIcon={<QuizIcon />}
                sx={{ ml: { xs: 6.5 } }}
              >
                Mis diagnósticos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
      <Paper className={classes.tabs}>
        <Typography variant="overline">Cursos por categoría</Typography>
        <Tabs
          onChange={handleChange}
          value={value}
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, i) => {
            if (!categories) return <Typography>Cargando</Typography>
            else {
              return (
                <Tab
                  key={i}
                  id={category.idCategoria}
                  label={category.categoria}
                />
              )
            }
          })}
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0} />
    </div>
  )
}

export default Dashboard
