import axios from "axios";

const baseURL = "https://impulsorintelectualhumanista.com/capacitacion";

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL,
      headers: { plataforma: 1 }
    });
  }

  login(data) {
    return this.service.post("/api/login", data);
  }
}

export default AuthService;
