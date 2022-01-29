import React, { useEffect, useContext, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { MyContext } from "../services/Context"
import AuthService from "../services/auth"
import useForm from "./useForm"
import {
  Box,
  Slider,
  Typography,
  Button,
  Paper,
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
  RadioGroup,
  Radio,
  FormControl,
  FormGroup,
  Divider, 
  Checkbox
} from "@mui/material"

import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"


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

//PENDIENTES: 
//reescribir envío de formulario
//traer función ValidateText
//Reparar Sliders
//Enviar fecha inicio-término

function Formularios(props) {
  const { id } = props.match.params
  const classes = useStyles()
  const { changePlace } = useContext(MyContext)
  const user = JSON.parse(localStorage.getItem("USER"))
  const token = user.token
  const authService = new AuthService()
  const [start, setStart] = useState(false)
  const [quiz, setQuiz] = useState({})
  const [sections, setSections] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [sectionIndex, setSectionIndex] = useState(0)
  const [multiple, setMultiple] = useState([])
  const [unique, setUnique] = useState("")
  const [form, handleInputs] = useForm()
  const [answerTest, setAnswerTest] = useState({})
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
          setQuiz(quiz)
          setSections(sections)
          setQuestions(questions)
          setAnswers(answers)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [token, id, changePlace, sectionIndex, ])

  function handleAnswerTest(){
    function questionsSections(val) {
      const getQuestions = val.map(e => e = { respuesta: "", pregunta: e.pregunta, puntuacion: e.puntuacion, idTipoRespuesta: e.idTipoRespuesta, idTipoValidacion: e.idTipoValidacion, urlimagenAyuda: "", comentarios: "", textoAyuda: "", urlVideoRespuesta: "" })
      return getQuestions
    }
  setAnswerTest({
  idEnvio: quiz.idEnvioUnique,
  tipoEnvio:2, 
  fechaHoraInicio:getCurrentDate(),  
  nombreFormulario: quiz.nombreFormulario,
  latitud:"",
  longitud:"",
  comentariosGenerales:"",
  puntuacionInicial:"",
  resultadoFinal:"",
  tipoResultado:"",
  secciones:sections.map(e => e = {nombreSeccion: e.nombreSeccion, comentariosGenerales:"", puntuacionInicial:0, puntuacionFinal:"", preguntas:questionsSections(e.preguntas)})
    })
  }
  const  getCurrentDate =() =>{
  const currentDate = new Date()
  const currentDayOfMonth = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const timestamp = currentDate.toLocaleTimeString()
    const dateString =
    currentYear +
    "-" +
    (currentMonth + 1) +
    "-" +
    currentDayOfMonth +
    " " +
    timestamp
    return dateString
  }

  function handlePrevious() {
    setSectionIndex(sectionIndex - 1)
  }
  function handleNext() {
    if (sectionIndex <= sections.length) {
      setSectionIndex(sectionIndex + 1)
    }
  }

  function setRequiredAnswer(question, required) {

    if (required === 1) {
      return (
        <>
      <Typography variant="body1" style={{ display: "inline-block" }}>
          {question}
        </Typography>
        <Typography style={{ display: "inline-block", color:"crimson"}}>
          *
        </Typography>
        </>)
    } else {
      return (
        <Typography variant="body1">
          {question} (opcional)
        </Typography>
      )
    }
  }
   const handleMultipleAnswers = (event) => {
    setMultiple(multiple.concat(event.target.value)) 
    if(event.target.checked === false) {
    setMultiple(multiple.filter(e => e !== event.target.value))
   } 
}

  const handleUniqueAnswer = (event) => {
    setUnique(event.target.value)
  }

  function validateText(id){
    console.log(id)
  }

  const displayAnswers = index => {
    if (answers.length !== 0) {

        function assignAnswer(questionName, answer){        
        const q = sections.map(s => s.preguntas.find(p =>  p.pregunta === questionName))
        const finalIndex = q.findIndex(e => e !== undefined)
          let assignAnswer
          if(answerTest.secciones !== undefined) {
          assignAnswer = answerTest.secciones[finalIndex].preguntas[index].respuesta = answer
          }
         return assignAnswer
        }
      const newArr = questions.map(id => id.idTipoRespuesta)
      const id = questions[index].idTipoValidacion

  function sliderOrRadio (answers){
      if(questions[index].catalogo.respuestas.length === 2){
      assignAnswer(questions[index].pregunta, form.respuesta)
        return ( 
      <FormControl component="fieldset" style={{ display: "block" }}>
      <RadioGroup  row > 
      {answers.map((answer, i) => {
          return (
     <FormControlLabel key={i}
          value={answer.nombre}
          label={answer.nombre}
         control={<Radio />}
         onChange={handleInputs}
         name="respuesta"
        />) 
})}
    </RadioGroup>
    </FormControl>)
      } else if(questions[index].catalogo.respuestas.length > 12) {
           const marks = answers.map(e => {
             return {
             value: Number(e["nombre"]),
            label: e["nombre"]
          }})
          return (
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom marks"
              defaultValue={1}
              min={1}
              marks={marks}
              max={marks.length}
             step={1}
            // onChange={(e)=>{assignQuestion(questions[index].pregunta, e.target.value)}}
            />
          )}}
 switch (newArr[index]) {
        case 1: 
        return validateText(id)
        case 2:   
        return   sliderOrRadio(questions[index].catalogo.respuestas)
        case 3:
          const getAnswers=questions[index].catalogo.respuestas
          const result = multiple.map(e => e.concat(" | "))
         assignAnswer(questions[index].pregunta, result.join(""))
          return(
             <FormGroup>
            {getAnswers.map((answer, i) => {
            return( 
            <FormControlLabel key={i} 
            onChange={handleMultipleAnswers}
            control={<Checkbox/>}
            label={answer.nombre}
            value={answer.nombre}
          />
          )}) }
          </FormGroup>
        )
        default:
          ;<Typography>Cargando respuestas</Typography>
      }
    } else return <Typography>Cargando</Typography>
  }

 function sendAnswers(){

console.log(answerTest);
// e.preventDefault()
    // Swal.fire({
    //   title: "¿Deseas enviar tus respuestas?",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Confirmar",
    //   cancelButtonText: "Cancelar"
    // }).then(result => {
    //   if (result.isConfirmed) {
    //formData.fechaHoraTermino = getCurrentDate()
   // console.log(formData);
    //  authService.postForm(formData, token)
    //        .then(res => {
    //          if(res.data.status === 427){
    //            Swal.fire("¡Acción cancelada!", "No tienes permiso para realizar esta acción", "error")
    //          } else{
    //        Swal.fire("La información se envió de manera correcta", "success")
    //            console.log(res.data)
    //          }
    //      })
    //     .catch(err => {
    //       Swal.fire("Hubo un error al enviar la información.", "Comunícate con el administrador", "error")
    //         console.log(err)
    //       })
    //     }
    // })
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
                onClick= {() => {
                  // size="large" 
                 setStart(!start)
                handleAnswerTest()
                }
                }
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
                  p: 2,
                  mb: 6
                }
              }}
            >
              <Typography variant="h4">
                {`Sección ${sectionIndex + 1}: 
             ${sections[sectionIndex].nombreSeccion}`}
              </Typography>
              <Typography variant="h6" color="royalblue">
                Las preguntas marcadas con asterisco (*) son obligatorias
              </Typography>
              {questions.map((question, i) => {
                return (
                  <div key={i}>
                    {setRequiredAnswer(question.pregunta, question.obligatorio)}
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
