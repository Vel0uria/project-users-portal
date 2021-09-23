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
    maxWidth: 400,
    display: "flex"
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
              mt: 1,
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-evenly",
              backgroundColor: "#FFFFFF80"
            }}
          >
            <ImageList
              rowHeight={200}
              gap={6}
              sx={{ maxWidth: 900, maxHeight: 400, overflow: "hidden" }}
            >
              {courses.map((course, i) => {
                if (!courses) return <Typography>Cargando</Typography>;
                else {
                  return (
                    <ImageListItem
                      key={course.urlImagen}
                      sx={{ maxWidth: 300, maxHeight: 200 }}
                    >
                      <img
                        src={`${baseURL}/${course.urlImagen}`}
                        alt={course.nombre}
                        loading="cargando"
                        sizes="height:190px"
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
