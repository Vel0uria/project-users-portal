import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  Tab,
  Tabs,
  Paper,
  Box
} from "@material-ui/core";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
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
    [theme.breakpoints.between("sm", "md")]: {
      height: theme.spacing(120)
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: theme.spacing(130)
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(150)
    }
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white"
  },
  userData: {
    display: "flex",
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF80",
    minHeight: 100
  },

  courses: {
    maxWidth: 400,
    //  maxHeight: 370,
    display: "flex"
    // height: 10
  },

  tabs: {
    padding: theme.spacing(1)
  },
  courseImg: {
    width: "148 !important"
  }
}));

// PENDIENTES DASHBOARD:

// - Corregir refresh de página: Los datos de usuario se pierden
//-Tabs: Ordenar cursos en la Tab correspondiente según la categoría
//-Cursos: función que despliegue un background si en la respuesta no hay imagen
// - Estilos:
// 1. Responsivo
// 2. Tamaño tipografías

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
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              backgroundColor: "#FFFFFF80"
            }}
          >
            <ImageList sx={{ maxWidth: 900, maxHeight: 500 }}>
              {courses.map((course, i) => {
                if (!courses) return <Typography>Cargando</Typography>;
                else {
                  return (
                    <ImageListItem key={i} variant="woven">
                      <img
                        src={`${baseURL}/${course.urlImagen}?w=248&fit=crop&auto=format`}
                        alt={course.nombre}
                        loading="cargando"
                      />
                      <ImageListItemBar
                        title={course.nombre}
                        subtitle={
                          <span>
                            Módulo {course.idModulo}
                          </span>
                        }
                      />
                    </ImageListItem>
                  );
                }
              })}
            </ImageList>
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
            Bienvenido {userData.nombreUsuario}{" "}
          </Typography>
          <Typography>
            {userData.nombreCompania}
          </Typography>
        </CardContent>
        <CardContent>
          <Button color="primary" variant="contained">
            Mis evaluaciones
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

      {/* <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", "& > :not(style)": { m: 1, minWidth: 250, minHeight: 428 } }}>
        {courses.map((course, i) => {
          if (!courses) return <Typography>Cargando</Typography>;
          else {
            return <Card className={classes.courses} variant="outlined" key={i}>
                <CardMedia component="img" height="194" image={`${baseURL}/${course.urlImagen}`} alt="urlImagen" />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {course.nombre}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Módulo {course.idModulo}
                  </Typography>
                  <Typography variant="subtitle2">
                    Categoría {course.categoria}
                  </Typography>

                  <Typography variant="body1">
                    {course.descripcion}
                  </Typography>
                </CardContent>
              </Card>;
          }
        })}
      </Box> */}
    </div>
  );
}

export default Dashboard;
