import axios from "axios";

const addUser = async(path, userForm) => {
  const res = await axios.post(path, userForm);
  return res.data;
}



export default addUser;
