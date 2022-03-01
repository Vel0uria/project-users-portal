import { TextField } from "@mui/material"
import useForm from "./useForm"
import React, { useState } from "react"
function ValidateText({ id, assignAnswer, quest }) {
  const [form, handleInputs] = useForm()
  const [helperText, setHelpText] = useState("")
  const [curpState, setCurpState] = useState("")
  const [rfcState, setRfcState] = useState("")
  const [errorState, setErrorState] = useState(false)
  assignAnswer(quest, form)
  function CurpValidation(event) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      validado = event.target.value.match(re)
    if (!validado) {
      setCurpState("CURP no válido")
      setErrorState(true)
    } else {
      setErrorState(false)
      setCurpState("CURP válido")
    }
  }
  function phoneValidation(event) {
    if (event.target.value.length === 10) {
      setErrorState(false)
      setHelpText("")
    } else {
      setHelpText("teléfono no válido")
      setErrorState(true)
    }
  }

  function rfcValidation(event) {
    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
    const validado = event.target.value.match(re)
    if (!validado) {
      setRfcState("RFC no válido")
      setErrorState(true)
    } else {
      setErrorState(false)
      setRfcState("RFC válido")
    }
  }

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
          onKeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
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
          onChange={e => {
            handleInputs(e)
            CurpValidation(e)
          }}
          variant="standard"
          fullWidth
          name={quest}
          type="text"
          helperText={curpState}
          error={errorState}
        />
      )
    case 9:
      return (
        <TextField
          label="Ingresa tu RFC"
          onChange={e => {
            handleInputs(e)
            rfcValidation(e)
          }}
          variant="standard"
          fullWidth
          name={quest}
          type="text"
          helperText={rfcState}
          error={errorState}
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
          label="Ingresa un número telefónico de 10 dígitos"
          onChange={e => {
            handleInputs(e)
            phoneValidation(e)
          }}
          variant="standard"
          fullWidth
          name={quest}
          type="number"
          min="0"
          error={errorState}
          helperText={helperText}
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
