const UserService = require("../../service/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    // console.log(req.body);

    //req.body
    var result = await UserService.login(req.body);

    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "密码错误",
      });
    } else {
      // 生成token
      const token = JWT.generate(
        {
          _id: result[0]._id,
          account: result[0].account,
        },
        "1d"
      );
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          account: result[0].account, //账号
          username: result[0].username, //用户名
          gender: result[0].gender ? result[0].gender : 0, //性别, 0, 1, 2
          introduction: result[0].introduction,
          avatar: result[0].avatar, //头像
          role: result[0].role, //管理1,编辑2
        },
      });
    }
  },

  upload: async (req, res) => {
    // console.log(req.body, req.file);

    const { username, introduction, gender } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    var payload = JWT.verify(token);
    JWT.verify();

    // console.log(payload._id, payload.account);
    //调用service模块更新数据

    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender),
      avatar,
    });

    if (avatar) {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: "OK",
        data: {
          username,
          introduction,
          gender: Number(gender),
        },
      });
    }
  },

  changepassword: async (req, res) => {
    console.log(req.body);
    const { password } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    var payload = JWT.verify(token);
    JWT.verify();
    await UserService.changepassword({
      _id: payload._id,
      password,
    })
    res.send({
      ActionType:"OK",
    })
  }
};

module.exports = UserController;
