import axios from "axios"

const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/api"

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL,
    })
  }

  login(data) {
    return this.service.post("/login", data, { headers: { plataforma: 1 } })
  }
  postComment(data, token) {
    return this.service.post("/guardarComentarios", data, {
      headers: { Authorization: token },
    })
  }
}

export default AuthService
