import React, { useEffect, useContext, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { MyContext } from "../services/Context"
import AuthService from "../services/auth"
import useForm from "./useForm"
import ValidateText from "./ValidateText"
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
  Checkbox, 
} from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height:window.innerHeight,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
    overflow: "hidden",

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

//reparar función ValidateText
//Enviar fecha inicio-término
//Probar envío con todas las respuestas
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
  const [form, handleInputs] = useForm()
  const [sliderAnswer, setSlider] = useState({})
  const [answerTest, setAnswerTest] = useState({})
 // const [inputLabel, setInputLabel] = useState("")

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
    [token, id, changePlace, sectionIndex])


  const  getCurrentDate =() =>{
  const currentDate = new Date()
  const currentDayOfMonth = ((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate())
  const currentMonth = ((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
  const currentYear = currentDate.getFullYear()
  const timestamp = currentDate.toLocaleTimeString()
    const dateString =
    currentYear +
    "-" +
    currentMonth +
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
    console.log(answerTest.secciones[0].preguntas);
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

const handleSlider = event =>{
setSlider({
  [event.target.name] : event.target.value
})
}

  function handleFormObject(){
    function questionsSections(val) {
      const getQuestions = val.map(e => e = { respuesta: "", pregunta: e.pregunta, puntuacion: e.puntuacion, idTipoRespuesta: e.idTipoRespuesta, idTipoValidacion: e.idTipoValidacion, urlimagenAyuda: "", comentarios: "", textoAyuda: "", urlVideoRespuesta: "" })
      return getQuestions
    }
          setAnswerTest({  
  idEnvio: quiz.idEnvioUnique,
  tipoEnvio:2, 
  //fechaHoraInicio:getCurrentDate(),  
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
  

  const displayAnswers = index => {
    if (answers.length !== 0) {
      const newArr = questions.map(id => id.idTipoRespuesta)
      if(sectionIndex === 0){
    answerTest.fechaHoraInicio = getCurrentDate()
      }

  function assignAnswer(questionName, answer){   
   
        const q = sections.map(s => s.preguntas.find(p =>  p.pregunta === questionName))
        const quests = Object.keys(answer)
        const section = q.findIndex(e => e !== undefined)
        if(answerTest.secciones !== undefined){
        const assignAnswer = answerTest.secciones[section].preguntas[index]
        for (let question of quests){
          if(question === assignAnswer.pregunta){
          return assignAnswer.respuesta = answer[questionName]}
        }}}

  function sliderOrRadio (answers){
      if(questions[index].catalogo.respuestas.length === 2){
      
      assignAnswer(questions[index].pregunta, form)
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
         name={questions[index].pregunta}
        />) 
})}
    </RadioGroup>
    </FormControl>)
      } else if(questions[index].catalogo.respuestas.length > 2) {
           const marks = answers.map(e => {
             return {
             value: Number(e["nombre"]),
            label: e["nombre"]
          }})
          assignAnswer(questions[index].pregunta, sliderAnswer)  
          return (
            <Slider
              valueLabelDisplay="auto"
              aria-label="Custom marks"
              defaultValue={1}
              min={1}
              marks={marks}
              max={marks.length}
             step={1}
            onChange={handleSlider}
            name={questions[index].pregunta}
            />
          )}}
 switch (newArr[index]) {
        case 1: 
        return <ValidateText id={questions[index].idTipoValidacion} assignAnswer={assignAnswer} quest={questions[index].pregunta}/>
        case 2:   
        return sliderOrRadio(questions[index].catalogo.respuestas)
        case 3:
          const getAnswers=questions[index].catalogo.respuestas
          const result = multiple.map(e => e.concat(" | "))
          const sendObj = {[questions[index].pregunta]: result.join("")}
        
         assignAnswer(questions[index].pregunta, sendObj)
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

// e.preventDefault()
    Swal.fire({
      title: "¿Deseas enviar tus respuestas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
    answerTest.fechaHoraTermino = getCurrentDate()
    console.log(answerTest);
     authService.postForm(answerTest, token)
           .then(res => {
             if(res.data.status === 427){
               Swal.fire("¡Acción cancelada!", "No tienes permiso para realizar esta acción", "error")
             } else{
              Swal.fire("La información se envió de manera correcta", "", "success").then(
              props.history.push("/dashboard")
              )
               
             }
         })
        .catch(err => {
          Swal.fire("Hubo un error al enviar la información.", "Comunícate con el administrador", "error")
            console.log(err)
          })
        }
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
          "& button": { 
            ml: {xl:110, lg: 75, md: 55, sm: 35, xs: 3 } }
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
                handleFormObject()
                 setStart(!start) 
              
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
            display: "flex",
            alignSelf: "center",
          overflow:"scroll"
          }}
        >
          {sections.length !== 0 &&
            <Box
              component="form"
             // m={2}
              p={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexShrink:3,
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
                  fontSize: { xs: 16, sm:18, md:20, lg: 22, xl: 26 },
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 4,
                  backgroundColor: "slateblue",
                  p: 2,
                 mb: 4
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
                  <Button variant="contained" color="success" onClick={sendAnswers}>
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
