import axios from "axios";
import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Menu,
  MenuItem,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";

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
      height: theme.spacing(120),
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: theme.spacing(130),
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(150),
    },
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
  },
  userData: {
    display: "flex",
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF80",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const { state } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourse] = useState([]);
  const userData = state.user.datosPerfil;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getCourses = () => {
    axios
      .get(
        "https://impulsorintelectualhumanista.com/capacitacion/api/listadoModulosCursos/1",
        { headers: { Authorization: state.user.token } }
      )
      .then(({ data }) => {
        const courses = data.result;
        setCourse(courses);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        Mis Cursos
      </Button>
      <Menu
        id="simple-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        onClick={getCourses()}
      >
        {courses.map(course => {
          return (
            <MenuItem key={course.idCategoria}>
              {course.categoria}
            </MenuItem>
          );
        })}
      </Menu>
      <Button color="primary" variant="contained" size="small">
        Mis evaluaciones
      </Button>
    </div>
  );
}

export default Dashboard;
