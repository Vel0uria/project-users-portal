import React, { useEffect, useContext, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { MyContext } from "../services/Context"
import {
  Box,
  Slider,
  Typography,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox,
  Card,
  CardActions,
  CardContent,
  ImageList,
  ImageListItem,
  RadioGroup,
  Radio,
  FormControl,
  ImageListItemBar,
  Divider
} from "@mui/material"

import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"
import { CheckBox } from "@mui/icons-material"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: "windowWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    overflow: "hidden",
    height: theme.spacing(120),
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

    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      fontSize: [24, "!important"]
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: [16, "!important"]
    }
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "justify",

    [theme.breakpoints.between("md", "lg")]: {
      fontSize: [16, "!important"]
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: [12, "!important"]
    }
  }
}))

//PENDIENTES: mapear questions.catalogo.nombre para saber el tipo de respuesta

function Formularios(props) {
  const { id } = props.match.params
  const classes = useStyles()
  const { changePlace } = useContext(MyContext)
  const user = JSON.parse(localStorage.getItem("USER"))
  const token = user.token
  const [start, setStart] = useState(false)
  const [quiz, setQuiz] = useState({})
  const [sections, setSections] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [sectionIndex, setSectionIndex] = useState(0)
  //const [mobile, setMobile] = useState(false);
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion"
  useEffect(
    () => {
      changePlace("quiz")
      axios
        .get(`${baseURL}/portafolio/obtenerFormulario/${id}`, {
          headers: { Authorization: token }
        })
        .then(({ data }) => {
          const quiz = data.result
          const sections = data.result.secciones
          const questions = sections[sectionIndex].preguntas
          const answers = questions.map(a => a.catalogo.respuestas)
          //console.log(questions)
          setQuiz(quiz)
          setSections(sections)
          setQuestions(questions)
          setAnswers(answers)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [token, id, changePlace, sectionIndex]
  )
  function handlePrevious() {
    setSectionIndex(sectionIndex - 1)
  }
  function handleNext() {
    if (sectionIndex <= sections.length) {
      setSectionIndex(sectionIndex + 1)
    }
  }

  const displayAnswers = index => {
    if (answers.length !== 0) {
      const newArr = questions.map(name => name.catalogo.nombre)

      switch (newArr[index]) {
        case "Si /No":
          return (
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Sí" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
          )
        case "Respuestas del 1-10":
          const marks = answers[0].map(e => {
            return { value: Number(e["nombre"]), label: e["nombre"] }
          })
          return (
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom marks"
              min={1}
              marks={marks}
              max={10}
              step={1}
            />
          )
        case "Texto":
          return (
            <TextField
              label="Introduce tu respuesta"
              variant="standard"
              fullWidth
            />
          )
        case "Sexo":
          return (
            <FormControl component="fieldset">
              <RadioGroup row>
                <FormControlLabel
                  value="Masculino"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="Femenino"
                  control={<Radio />}
                  label="Femenino"
                />
              </RadioGroup>
            </FormControl>
          )
        case "Autos":
          const imageArr = answers.map(i => i.map(pic => pic.nombre))

          return (
            <ImageList>
              {imageArr[index].map(pics => {
                return (
                  <ImageListItem key={pics} loading="cargando imagen">
                    <img alt="imagen" src={`${baseURL}${pics}`} />
                    <ImageListItemBar
                      sx={{
                        pl: 2,
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                      }}
                      title="Elegir"
                      position="top"
                      actionIcon={<CheckBox size="large" color="primary" />}
                      actionPosition="left"
                    />
                  </ImageListItem>
                )
              })}
            </ImageList>
          )
        default:
          ;<Typography>Cargando respuestas</Typography>
      }
    } else return <Typography>Cargando</Typography>
  }
  const sendAnswers = e => {
    e.preventDefault()
    Swal.fire({
      title: "¿Deseas enviar tus respuestas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {quiz.nombreFormulario}
      </Typography>
      <Box
        sx={{
          mt: 4,
          fontSize: 14,
          "& button": { ml: { lg: 75, md: 55, sm: 35, xs: 3 } }
        }}
      >
        {!start &&
          <Card className={classes.card}>
            <Typography variant="h6" component="div">
              Instrucciones:
            </Typography>
            <CardContent>
              <Typography variant="body1">
                {quiz.indicaciones}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="info"
                variant="outlined"
                onClick={() => {
                  // size="large"
                  setStart(!start)
                }}
              >
                Iniciar cuestionario
              </Button>
            </CardActions>
          </Card>}
      </Box>
      <Divider />
      {start &&
        <Box
          component={Paper}
          sx={{
            mt: 3,
            display: "flex",
            alignSelf: "center",
            width: "80%",
            overflow: "scroll"
          }}
        >
          {sections.length !== 0 &&
            <Box
              component="form"
              m={2}
              p={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                "& button": {
                  fontSize: { xs: 12, lg: 14, xl: 14 },
                  m: 2,
                  mt: 4,
                  ml: { s: 4, md: 12, lg: 14, xl: 18 }
                },
                "& p": {
                  fontSize: { xs: 14, sm: 18, md: 18, lg: 20, xl: 22 },
                  pt: 3
                },
                "& h4": {
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: { xs: 16, lg: 22, xl: 26 },
                  fontWeight: "bold",
                  width: 350,
                  color: "white",
                  borderRadius: 4,
                  backgroundColor: "darkviolet",
                  p: 2
                }
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
                    {displayAnswers(i)}
                  </div>
                )
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
                  <Button variant="contained" onClick={sendAnswers}>
                    Enviar respuestas
                  </Button>}
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
  )
}

export default Formularios
