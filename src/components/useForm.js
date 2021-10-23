import { useState } from "react"

const useForm = () => {
  const [form, setForm] = useState({})

  const handleInputs = prop => event => {
    event.persist()
    setForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  return [form, handleInputs]
}

export default useForm
