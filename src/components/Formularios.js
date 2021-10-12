import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "../services/Context";
import {
  Box,
  Slider,
  Typography,
  Button,
  Divider,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "windowWidth",

    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    [theme.breakpoints.between("md", "lg")]: {
      height: theme.spacing(80),
      marginTop: 0
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(145)
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
  },
  questions: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3)
  }
}));
function Formularios(props) {
  const { id } = props.match.params;
  const classes = useStyles();
  const { changePlace } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const [start, setStart] = useState(false);
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
  function handlePrevious() {
    setSectionIndex(sectionIndex - 1);
  }
  function handleNext() {
    if (sectionIndex <= sections.length) {
      setSectionIndex(sectionIndex + 1);
    }
  }

  const displayAnswers = id => {
    if (answers.length !== 0) {
      const newArr = answers.map(t => t.map(a => a.nombre));
      const answerLength = newArr[0].length;
      //console.log(newArr[0].length);
      switch (answerLength) {
        case 2:
          return (
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label={newArr[0][0]} />
              <FormControlLabel control={<Checkbox />} label={newArr[0][1]} />
            </FormGroup>
          );
        case 10:
          const marks = answers[0].map(e => {
            return { value: Number(e["nombre"]), label: e["nombre"] };
          });
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
          return <Typography>Cargando respuestas</Typography>;
      }
    } else return <Typography>Cargando</Typography>;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {quiz.nombreFormulario}
      </Typography>
      <Box sx={{ mt: 6, "& button": { m: 4, ml: 100 } }}>
        <Typography variant="h6">Instrucciones:</Typography>
        <Typography variant="h6">
          {quiz.indicaciones}
        </Typography>
        {!start &&
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              setStart(!start);
            }}
          >
            Iniciar cuestionario
          </Button>}
      </Box>
      <Divider />
      {start &&
        <Box
          component={Paper}
          sx={{ mt: 3, display: "flex", alignSelf: "center" }}
        >
          {sections.length !== 0 &&
            <Box
              component="form"
              m={2}
              p={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: 800,
                overflow: "scroll",
                "& button": { mt: 4, ml: 12 },
                "& p": { fontSize: "x-large", p: 1, pt: 3 },
                "& h4": { textAlign: "center" }
              }}
            >
              <Typography variant="h4">
                {`Sección ${sectionIndex + 1}: 
             ${sections[sectionIndex].nombreSeccion}`}
              </Typography>
              {questions.map((question, i) => {
                return (
                  <div key={i}>
                    <Typography variant="body1">
                      {question.pregunta}
                    </Typography>

                    {displayAnswers(question.idTipoRespuesta)}
                  </div>
                );
              })}
              <div>
                {sectionIndex !== 0 &&
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePrevious}
                  >
                    Sección anterior
                  </Button>}
                {sectionIndex === sections.length - 1 &&
                  <Button variant="contained">Enviar respuestas</Button>}
                {sectionIndex < sections.length - 1 &&
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                  >
                    Siguiente sección
                  </Button>}
              </div>
            </Box>}
        </Box>}
    </div>
  );
}

export default Formularios;
