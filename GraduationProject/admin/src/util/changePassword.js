import axios from "axios";

function changePassword(path, passwordForm) {
  return axios.post(path, passwordForm).then((res) => res.data);
}

export default changePassword;
