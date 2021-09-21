import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Button,
  Typography,
  Avatar,
  Paper
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../services/Context";
import bgImage from "../assets/dashboard.jpg";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",

    height: theme.spacing(76),
    padding: theme.spacing(1),
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
    backgroundColor: "#FFFFFF80"
  },
  cardsTitle: {
    margin: theme.spacing(1),
    //  textAlign: "center",
    display: "flex",
    flexFlow: "row noWrap",
    justifyContent: "center"
  },
  cardSection: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexFlow: "row noWrap",
    backgroundColor: "#FFFFF190"
  },
  courses: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    width: 350,
    flexDirection: "row"
    // flexFlow: "row noWrap"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const firstCourses = courses.splice(0, 2);
  const [user, setUser] = useState({});
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  useEffect(
    () => {
      const userData = state.user.datosPerfil;
      setUser(userData);
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
    [state.user.datosPerfil, state.user.token]
  );

  useEffect(() => {
    if (categories.length !== 0) {
      const id = categories[0].idCategoria;
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
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) return <p>Cargando</p>;
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Dashboard</Typography>
      <Card variant="outlined" className={classes.userData}>
        <CardContent>
          <Avatar
            alt="user-image"
            src={user.avatar}
            sx={{ width: 56, height: 56 }}
          />
        </CardContent>
        <CardContent>
          <Typography>
            Bienvenido {user.nombreUsuario}{" "}
          </Typography>
          <Typography>
            {user.nombreCompania}
          </Typography>
        </CardContent>
      </Card>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Categorías de cursos
      </Button>
      <Menu
        id="simple-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {categories.map((category, i) => {
          return (
            <MenuItem key={i}>
              {category.categoria}
            </MenuItem>
          );
        })}
      </Menu>
      <Link to="/diagnosticos">
        <Button color="primary" variant="contained" size="large">
          Mis evaluaciones
        </Button>
      </Link>
      <Paper elevation={8} className={classes.cardSection}>
        <div className={classes.cardsTitle}>
          <Typography variant="h2">Cursos principales</Typography>
        </div>

        {firstCourses.map((course, i) => {
          return (
            <Card
              className={classes.courses}
              sx={{ maxWidth: 345 }}
              variant="outlined"
              key={i}
            >
              <CardMedia
                component="img"
                image={`${baseURL //  width="5" //  sx={{ maxWidth: 45, maxHeight: 35 }}
                }/${course.urlImagen}`}
                alt="urlImagen"
              />
              <CardContent>
                <Typography variant="h4" component="div">
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
            </Card>
          );
        })}
      </Paper>
    </div>
  );
}

export default Dashboard;
