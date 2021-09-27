import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
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
} from "@material-ui/core";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../services/Context";
import bgImage from "../assets/dashboard.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    flexFlow: "column nowrap",
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

    // [theme.breakpoints.between("sm", "md")]: {
    //   height: theme.spacing(120)
    // },
    // [theme.breakpoints.between("md", "lg")]: {
    //   height: theme.spacing(130)
    // },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(110)
    }
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white"
  },
  userData: {
    display: "flex",
    margin: theme.spacing(0.5),
    backgroundColor: "#FFFFFF80",
    [theme.breakpoints.down("sm")]: {
      flexFlow: "column nowrap"
    }
  },

  courses: {
    margin: theme.spacing(1),
    marginTop: 40,
    minWidth: 200,
    maxWidth: 300
  },
  tabs: {
    padding: theme.spacing(1)
  }
}));

// PENDIENTES DASHBOARD:

// - Corregir refresh de página: Los datos de usuario se pierden
//-Tabs: Ordenar cursos en la Tab correspondiente según la categoría
//-Cursos: función que despliegue un background si en la respuesta no hay imagen
//-Categorías: deshabilitar Tab si la categoría viene vacía
//-Card de perfil: que se despliegue en todas las vistas (pasarlo a router)
// - Estilos:
// 1. Responsivo

function Dashboard() {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [categories, setCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const userData = state.user.datosPerfil;
  const [value, setValue] = useState(0);
  useEffect(
    () => {
      axios
        .get(`${baseURL}/api/listadoModulosCursos/1`, {
          headers: { Authorization: state.user.token }
        })
        .then(({ data }) => {
          const category = data.result;
          setCategory(category);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [baseURL, state.user.token]
  );

  useEffect(
    () => {
      if (categories.length !== 0) {
        const id = categories[value].idCategoria;

        axios
          .get(`${baseURL}/api/listadoUsuariosCursos/${id}`, {
            headers: {
              Authorization: state.user.token
            }
          })
          .then(({ data }) => {
            const courses = data.result;
            setCourses(courses);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    [categories, state.user.token, value]
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
        {value === index &&
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#FFFFFF80",
              flexWrap: {
                xs: "wrap",
                md: "nowrap",
                lg: "nowrap"
              }
            }}
          >
            {courses.map((course, i) => {
              if (!courses) return <Typography>Cargando</Typography>;
              else {
                return (
                  <Card className={classes.courses} variant="outlined" key={i}>
                    <CardHeader
                      sx={{ padding: 10 }}
                      title={course.nombre}
                      subheader={`Módulo ${course.idModulo}`}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={`${baseURL}/${course.urlImagen}`}
                      alt="urlImagen"
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
                    {/* <CardContent>
                      <Typography variant="body1">
                        {course.descripcion}
                      </Typography>
                    </CardContent> */}
                  </Card>
                );
              }
            })}
          </Box>}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!state.user) return <p>Cargando</p>;
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Dashboard</Typography>
      <Card variant="outlined" className={classes.userData}>
        <CardContent>
          <Avatar alt="user-image" src={userData.avatar} />
        </CardContent>
        <CardContent>
          <Typography>
            {userData.nombreUsuario}{" "}
          </Typography>
          <Typography>
            {userData.nombreCompania}
          </Typography>
        </CardContent>
        <CardContent>
          <Button color="primary" variant="contained">
            Mis diagnósticos
          </Button>
        </CardContent>
      </Card>
      <Link to="/diagnosticos" />
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
            if (!categories) return <Typography>Cargando</Typography>;
            else {
              return (
                <Tab
                  key={i}
                  id={category.idCategoria}
                  label={category.categoria}
                />
              );
            }
          })}
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        Item one
      </TabPanel>
    </div>
  );
}

export default Dashboard;
