import axios from "axios"

const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/"

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL
    })
  }

  login(data) {
    return this.service.post("api/login", data, {
      headers: { plataforma: 1 }
    })
  }
  postComment(data, token) {
    return this.service.post("api/guardarComentarios", data, {
      headers: { Authorization: token }
    })
  }
  postForm(data, token) {
    return this.service.post("formularios/guardarEjecucion", data, {
      headers: { Authorization: token, plataforma: 1 }
    })
  }
  recoverPassword(data) {
    return this.service.post("usuarios/ReenviarCorreo", data)
  }
  updatePassword(data, token) {
    return this.service.post("usuarios/CambiaTuContrasena", data, {
      headers: { Authorization: token }
    })
  }
}
export default AuthService
