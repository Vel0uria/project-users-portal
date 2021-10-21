import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
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
import QuizIcon from "@mui/icons-material/Quiz";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
import { MyContext } from "../services/Context";
import placeholder from "../assets/placeholder.png";
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
      height: theme.spacing(140)
    }
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
    fontSize: "1.7rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  },
  userData: {
    display: "flex",
    margin: theme.spacing(0.5),
    backgroundColor: "#FFFFFF9E",
    [theme.breakpoints.down("sm")]: {
      flexFlow: "column"
    }
  },

  courses: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    marginTop: 40,
    minWidth: 200,
    maxWidth: 300
  },
  tabs: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF78"
  }
}));

// PENDIENTES DASHBOARD:

//-MediaCard: corregir warning
//-Categorías: deshabilitar Tab si la categoría viene vacía
// - Estilos:
// 1. Responsivo

function Dashboard() {
  const classes = useStyles();
  const [categories, setCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const [value, setValue] = useState(0);
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const { changePlace } = useContext(MyContext);

  function handleMedia(img) {
    const imageArr = [];
    imageArr.push(img);
    // eslint-disable-next-line array-callback-return
    const newArr = imageArr.map(i => {
   
      if (i !== "") return `${baseURL}/${i}`;
    });
    const index = newArr.indexOf(undefined);
    if (index !== -1) {
      newArr[index] = placeholder;
    }
    return newArr;
  }

  useEffect(
    () => {
      changePlace("Dashboard");

      axios
        .get(`${baseURL}/api/listadoModulosCursos/1`, {
          headers: { Authorization: token }
        })
        .then(({ data }) => {
          const category = data.result;
          setCategory(category);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [baseURL, token, changePlace]
  );

  useEffect(
    () => {
      if (categories.length !== 0) {
        const id = categories[value].idCategoria;

        axios
          .get(`${baseURL}/api/listadoUsuariosCursos/${id}`, {
            headers: {
              Authorization: token
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
    [categories, token, value]
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
              flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" }
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
                      image={handleMedia(course.urlImagen)}
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

  if (!user) return <p>Cargando</p>;
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Dashboard
      </Typography>
      <Card className={classes.userData}>
        <CardContent>
          <Avatar alt="user-image" src={user.datosPerfil.avatar} />
        </CardContent>
        <CardContent>
          <Typography>
            {user.datosPerfil.nombreUsuario}{" "}
          </Typography>
          <Typography>
            {user.datosPerfil.nombreCompania}
          </Typography>
        </CardContent>
        <CardContent>
          <Link to="/diagnosticos">
            <Button
              color="primary"
              variant="contained"
              disableElevation
              endIcon={<QuizIcon />}
            >
              Mis diagnósticos
            </Button>
          </Link>
        </CardContent>
      </Card>
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
      <TabPanel value={value} index={0} />
    </div>
  );
}

export default Dashboard;
