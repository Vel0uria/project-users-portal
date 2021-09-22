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
  Box
} from "@material-ui/core";
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
    backgroundColor: "#FFFFFF80"
  },
  cardsTitle: {
    // position: "absolute",
    // marginLeft: theme.spacing(40),
    textAlign: "center"
  },
  cardSection: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFF190"
  },
  courses: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    marginTop: 40
  }
  // [theme.breakpoints.between("sm", "md")]: {
  //   flexShrink: 3
  // }
}));

// PENDIENTES DASHBOARD:

// - Corregir refresh de página: Los datos de usuario se pierden
// - Estilos:
// 1. Cards responsivas en móvil
// 2. Tamaño tipografías
// 3. Tamaño cards
//Menú categorías

function Dashboard() {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategory] = useState([]);
  const [courses, setCourses] = useState([]);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const userData = state.user.datosPerfil;

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
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          if (!categories) return <Typography>Cargando</Typography>;
          else {
            return (
              <div key={i}>
                {!category
                  ? <Typography>Loading</Typography>
                  : <MenuItem key={category.idCategoria}>
                      {category.categoria}
                    </MenuItem>}
              </div>
            );
          }
        })}
      </Menu>
      <Link to="/diagnosticos">
        <Button color="primary" variant="contained" size="large">
          Mis evaluaciones
        </Button>
      </Link>
      <Typography variant="h2" className={classes.cardsTitle}>
        Cursos principales
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          "& > :not(style)": { m: 1, minWidth: 250, minHeight: 428 }
        }}
      >
        {courses.map((course, i) => {
          if (!courses) return <Typography>Cargando</Typography>;
          else {
            return (
              <Card className={classes.courses} variant="outlined" key={i}>
                <CardMedia
                  component="img"
                  height="194"
                  image={`${baseURL}/${course.urlImagen}`}
                  alt="urlImagen"
                />
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
              </Card>
            );
          }
        })}
      </Box>
    </div>
  );
}

export default Dashboard;
