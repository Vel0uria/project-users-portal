import { TextField } from "@mui/material"

import useForm from "./useForm"

function ValidateText({ id, assignAnswer, quest }) {
  const [form, handleInputs] = useForm()
  assignAnswer(quest, form)

  switch (id) {
    case 1:
      return (
        <TextField
          label="Este campo sólo admite letras"
          pattern="[A-Za-z]"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
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
          name={quest}
        />
      )
    case 3:
      return (
        <TextField
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="text"
        />
      )
    case 4:
      return (
        <TextField
          label="ingresa tu correo electrónico"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="email"
        />
      )

    case 5:
      return (
        <TextField
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="date"
        />
      )

    case 6:
      return (
        <TextField
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="time"
        />
      )
    case 7:
      return (
        <TextField
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="datetime-local"
        />
      )
    case 8:
      return (
        <TextField
          label="Ingresa tu CURP"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="text"
        />
      )
    case 9:
      return (
        <TextField
          label="Ingresa tu RFC"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="text"
        />
      )
    case 10:
      return (
        <TextField
          label="Ingresa tu código postal"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="number"
        />
      )
    case 11:
      return (
        <TextField
          label="Ingresa tu número telefónico"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
          type="number"
        />
      )

    case 12:
      return (
        <TextField
          label="Ingresa tu edad"
          onChange={handleInputs}
          variant="standard"
          fullWidth
          name={quest}
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
          name={quest}
          type="text"
        />
      )
  }
}

export default ValidateText
