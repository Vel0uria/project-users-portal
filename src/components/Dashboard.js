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
  videoCards: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexFlow: "column noWrap",
    backgroundColor: "#FFFFF190"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategory] = useState([]);
  const [course, setCourse] = useState({});

  const userData = state.user.datosPerfil;
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/api";
  useEffect(
    () => {
      axios
        .get(`${baseURL}/listadoModulosCursos/1`, {
          headers: { Authorization: state.user.token }
        })
        .then(({ data }) => {
          const category = data.result;
          setCategory(category);
        })
        .catch(err => {
          console.log(err);
        });

      getFirstCourse();
    },
    [baseURL, userData]
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getCategories = () => {
    axios
      .get(`${baseURL}/listadoModulosCursos/1`, {
        headers: { Authorization: state.user.token }
      })
      .then(({ data }) => {
        const category = data.result;
        setCategory(category);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getFirstCourse = () => {
    if (categories.length !== 0) {
      const id = categories[0].idCategoria;
      axios
        .get(`${baseURL}/listadoUsuariosCursos/${id}`, {
          headers: { Authorization: state.user.token }
        })
        .then(({ data }) => {
          const course = data.result[0];

          setCourse(course);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  if (!state.user) return <p>Cargando</p>;
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Dashboard</Typography>
      <Card variant="outlined" className={classes.userData}>
        <CardContent>
          <Avatar
            alt="user-image"
            src={userData.avatar}
            sx={{ width: 56, height: 56 }}
          />
        </CardContent>
        <CardContent>
          <Typography>
            Bienvenido {userData.nombreUsuario}{" "}
          </Typography>
          <Typography>
            {userData.nombreCompania}
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
        onClick={getCategories()}
      >
        {categories.map(category => {
          return (
            <MenuItem key={category.idCategoria}>
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
      <Paper elevation={8} className={classes.videoCards}>
        <Typography variant="h2">Cursos principales</Typography>
        <Card sx={{ maxWidth: 345 }} variant="outlined">
          <CardMedia
            component="img"
            height="140"
            image={course.urlImagen}
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
      </Paper>
    </div>
  );
}

export default Dashboard;
