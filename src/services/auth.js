import axios from "axios";

const baseURL = "https://impulsorintelectualhumanista.com/capacitacion/api/login"

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL,
     // withCredentials: true,
      headers:{plataforma:1}
    });
  }

  login(data) {
    return this.service.post("/",data);
  }
//   logout() {
//     return this.service.get("/auth/logout");
//   }

}

export default AuthService;