import axios from "axios";
function signup(path, signupForm) {
  return axios.post(path, signupForm).then((res) => res.data);
}

export default signup;
