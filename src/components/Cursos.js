import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import { Typography } from "@material-ui/core";
function Cursos(props) {
  const { id } = props.match.params;
  const [courses, setCourses] = useState({});
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/";
  const { state } = useContext(MyContext);

  useEffect(
    () => {
      axios
        .get(`${baseURL}/api/listadoLecciones/${id}`, {
          headers: { Authorization: state.user.token }
        })
        .then(({ data }) => {
          const courses = data.result;
          setCourses(courses);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [baseURL, id, state]
  );
  //console.log(courses);
  return (
    <Typography variant="h2">
      {courses.nombreCurso}
    </Typography>
  );
}
export default Cursos;
