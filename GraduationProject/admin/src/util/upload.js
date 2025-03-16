import axios from "axios";

function upload(path, Form) {
    const params = new FormData();
      for (let i in Form) {
        params.append(i, Form[i]);
      }

      //   console.log(params);

      //   不能用此方法，userForm是有文件的不普通post请求
      //   anxios.post("/adminapi/user/upload", userForm);

      // 应该用formData
      return axios.post(path, params, {
          headers: {
            //分包传数据（图片较大）
            "Content-Type": "multipart/form-data",
          },
        }).then(res=>res.data)
}

export default upload