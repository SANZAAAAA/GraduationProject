import axios from "axios";

function addUser(path, userForm) {
  axios.post(path, userForm).then(res=>res.data);
}

export default addUser;
