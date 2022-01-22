import { TextField } from "@mui/material"

import useForm from "./useForm"

function ValidateText({ id, assignAnswer }) {
  const [form, handleInputs] = useForm()
  //console.log(assignAnswer)
  switch (id) {
    case 1:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label="Este campo sólo admite letras"
          pattern="[A-Za-z]"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="text"
        />
      )

    case 2:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label="Este campo sólo admite números"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          type="number"
          name="respuesta"
        />
      )
    case 3:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="text"
        />
      )
    case 4:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="email"
        />
      )

    case 5:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={() => handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="date"
        />
      )

    case 6:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={() => handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="time"
        />
      )

    case 7:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={() => handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="datetime-local"
        />
      )
    case 8:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="text"
        />
      )
    case 9:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="text"
        />
      )
    case 10:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label="Este campo sólo admite números"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="number"
        />
      )
    case 11:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label="Este campo sólo admite números"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="number"
        />
      )

    case 12:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="number"
        />
      )
    default:
      assignAnswer.respuesta = form.respuesta
      return (
        <TextField
          label=""
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name="respuesta"
          type="text"
        />
      )
  }
}

export default ValidateText
