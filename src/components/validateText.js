import { TextField } from "@mui/material"

import useForm from "./useForm"

function ValidateText({ id, assignAnswer }) {
  const [form, handleInputs] = useForm()
  assignAnswer.respuesta = form.respuesta
  switch (id) {
    case 1:
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
