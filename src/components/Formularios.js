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

  useEffect(
    () => {
      changePlace("quiz");
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
          const answers = questions.map(a => a.catalogo.respuestas);

          setQuiz(quiz);
          setSections(sections);
          setQuestions(questions);
          setAnswers(answers);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, id, changePlace, sectionIndex]
  );
  // console.log(answers[0].map(a => console.log(a["nombre"])));
  function handleSectionChange() {
    if (sectionIndex <= sections.length) {
      setSectionIndex(sectionIndex + 1);
    }
  }
  const displayAnswers = id => {
    const marks = answers[0].map(e => {
      return { value: Number(e["nombre"]), label: e["nombre"] };
    });

    switch (id) {
      case 1:
        <Typography>Something</Typography>;
        break;
      case 2:
        return (
          <Slider
            valueLabelDisplay="auto"
            aria-label="Custom marks"
            min={1}
            marks={marks}
            max={10}
            step={1}
          />
        );

      default:
        <Typography>Cargando respuestas</Typography>;
    }
  };
  if (!quiz) return <Typography>Cargando...</Typography>;
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {quiz.nombreFormulario}
      </Typography>

      <Typography variant="overline">Instrucciones:</Typography>
      <Typography variant="body1">
        {quiz.indicaciones}
      </Typography>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexFlow: "row-nowrap",
          justifyContent: "space-evenly"
        }}
      >
        {sections.length !== 0 &&
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

                  {displayAnswers(question.idTipoRespuesta)}
                </div>
              );
            })}
            <Button onClick={handleSectionChange}>Siguiente sección</Button>
          </Box>}
      </Box>
    </div>
  );
}

export default Formularios;
