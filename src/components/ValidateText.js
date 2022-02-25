import { TextField } from "@mui/material"

import useForm from "./useForm"

function ValidateText({ id, assignAnswer, quest }) {
  const [form, handleInputs] = useForm()
  assignAnswer(quest, form)
  function phoneValidation(event) {
    const phoneno = new RegExp("^d{10}$/")
    //console.log(event.target.value, form)

    if (event.target.value.match(phoneno)) {
      return true
    } else return false
  }
  //console.log(phoneValidation())
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
          min="0"
          name={quest}
          onInput="this.value = Math.abs(this.value)"
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
          min="0"
        />
      )
    case 11:
      return (
        <TextField
          label="Ingresa tu número telefónico de 10 dígitos"
          onChange={e => {
            handleInputs(e)
            phoneValidation(e)
          }}
          variant="standard"
          fullWidth
          name={quest}
          type="number"
          min="0"
          // onInput={phoneValidation}
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
