import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import { Typography, Box, Button } from "@material-ui/core";
import Slider from "@mui/material/Slider";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(3),
    flexFlow: "column nowrap",
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "white",
    fontSize: "1.7rem",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem"
    }
  }
}));
function Formularios(props) {
  const { id } = props.match.params;
  const classes = useStyles();
  const { changePlace } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const [quiz, setQuiz] = useState({});
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const marks = answers.map(e => {
    return { value: Number(e.nombre), label: e.nombre };
  });

  useEffect(
    () => {
      changePlace("auth");
      axios
        .get(
          `https://impulsorintelectualhumanista.com/capacitacion/portafolio/obtenerFormulario/${id}`,
          {
            headers: { Authorization: token }
          }
        )
        .then(({ data }) => {
          const quiz = data.result;
          const sections = data.result.secciones;
          const questions = sections[sectionIndex].preguntas;
          const answers = questions[questionIndex].catalogo.respuestas;
          setQuiz(quiz);
          setSections(sections);
          setQuestions(questions);
          setAnswers(answers);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, id, changePlace, questionIndex, sectionIndex]
  );
  function handleSectionChange() {
    setSectionIndex(sectionIndex + 1);
  }

  if (!quiz) return <Typography>Cargando...</Typography>;
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {quiz.nombreFormulario}
      </Typography>
      <Box>
        <Typography variant="overline">Instrucciones:</Typography>
        <Typography variant="body1">
          {quiz.indicaciones}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexFlow: "row-nowrap",
          justifyContent: "space-evenly"
        }}
      >
        {sections &&
          <Box component="form">
            <Typography variant="h4">
              {`Sección ${sectionIndex + 1}: 
             ${sections[sectionIndex].nombreSeccion}`}
            </Typography>
            {questions.map((question, i) => {
              return (
                <div key={i}>
                  <Typography>
                    {question.pregunta}
                  </Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    marks={marks}
                    aria-label="respuestas"
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              );
            })}
            <Button>Siguiente sección</Button>
          </Box>}
      </Box>
    </div>
  );
}

export default Formularios;
