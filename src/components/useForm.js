import { useState } from "react"

const useForm = () => {
  const [form, setForm] = useState({})

  const handleInputs = event => {
    event.preventDefault()
    setForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  return [form, handleInputs]
}

export default useForm
