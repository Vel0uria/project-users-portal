import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
  TextField,
  Checkbox,
  Card,
  CardActions,
  CardContent,
  ImageList,
  ImageListItem
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: "windowWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexFlow: "column nowrap",
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
    fontSize: "1.7rem",
    borderRadius: 4,
    padding: theme.spacing(1),
    [theme.breakpoints.up("lg")]: {
      fontSize: [20, "!important"]
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: [16, "!important"]
    }
  },
  card: {
    padding: theme.spacing(1),
    textAlign: "justify"
  },

  questions: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3)
  }
}));

//PENDIENTES: mapear questions.catalogo.nombre para saber el tipo de respuesta

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
  const baseURL = "https://impulsorintelectualhumanista.com/capacitacion";
  useEffect(
    () => {
      changePlace("quiz");
      axios
        .get(
          `${baseURL}/portafolio/obtenerFormulario/${id}`,
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

  const displayAnswers = (index) => {
    
    // if (answers.length !== 0) {
    const newArr = questions.map(name => name.catalogo.nombre);

    switch (newArr[0]) {
      case "Si /No":
        return (
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={newArr[0][0]} />
            <FormControlLabel control={<Checkbox />} label={newArr[0][1]} />
          </FormGroup>
        );
      case "Respuestas del 1-10":
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
      case "Texto":
        return (
          <TextField
            label="Introduce tu respuesta"
            variant="standard"
            fullWidth
          />
        );
      case "Autos":
        const imageArr = answers.map(i => i.map(pic => pic.nombre))
       return( 
         <ImageList>
        { imageArr[index].map(pics => {
          
          return(
     <ImageListItem key={pics}>
         <img alt="imagen" src={`${baseURL}${pics}`}/>
         </ImageListItem>
          )}
         
)}
         </ImageList>
       )
       //console.log(imageArr);
       // return  imageArr.map(images => images.map(image => {<img src={´${baseURL}/{image}´}/>}))
        
        //imageArr.map((car => <p>{`${baseURL}/${car}`}</p>)
          // <ImageList>
    // {
      
      //{
     //  return(
    //<ImageListItem key={i}  >
             //   <img alt="carro" src={`${baseURL}/${car}`}/>
             // </ImageListItem>
     //  )
   // })}
 //</ImageList>
 //)
      default:
        <Typography>Cargando respuestas</Typography>;
    }
    // } else return <Typography>Cargando</Typography>
  };
  const sendAnswers = e => {
    e.preventDefault();
    Swal.fire({
      title: "¿Deseas enviar tus respuestas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
  };

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
            {!start &&
              <Button
                size="large"
                color="info"
                variant="outlined"
                onClick={() => {
                  // variant="contained"
                  setStart(!start);
                }}
              >
                Iniciar cuestionario
              </Button>}
          </CardActions>
        </Card>
      </Box>
      <Divider />
      {start &&
        <Box
          component={Paper}
          sx={{
            mt: 3,
            display: "flex",

            alignSelf: "center"
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
                maxHeight: 650,
                overflow: "scroll",
                "& button": { mt: 4, ml: 12 },
                "& p": {
                  fontSize: { xs: 14, sm: 18, md: 18, lg: 20, xl: 22 },
                  pt: 3
                },
                "& h4": {
                  textAlign: "center",
                  fontSize: { xs: 16, lg: 22 },
                  fontWeight: "bold"
                }
              }}
            >
              <Typography variant="h4">
                {`Sección ${sectionIndex + 1}: 
             ${sections[sectionIndex].nombreSeccion}`}
              </Typography>
              <Divider />
              {questions.map((question, i) => {
                
                return (
                  <div key={i}>
                    <Typography variant="body1">
                      {question.pregunta}
                    </Typography>
                    {displayAnswers(i)}
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
  );
}

export default Formularios;
