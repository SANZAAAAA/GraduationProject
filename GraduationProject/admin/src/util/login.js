import axios from "axios";
function login(path, loginForm) {
  return axios.post(path, loginForm).then((res) => res.data);
}

export default login;
