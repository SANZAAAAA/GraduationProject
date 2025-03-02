const UserService = require("../../service/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    console.log(req.body);

    //req.body
    const user = await UserService.login(req.body);

    if (!user) {
      res.send({
        ActionType: "Reject",
        Message: "账号或密码错误", // 模糊提示更安全
      });
    } else {
      const token = JWT.generate(
        {
          _id: user._id,
          account: user.account,
          role: user.role,
        },
        "1d"
      );

      // 4. 设置响应头并返回数据
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          account: user.account,
          username: user.username,
          gender: user.gender,
          introduction: user.introduction,
          avatar: user.avatar,
          role: user.role,
        },
      });
    }
  },

  signup: async (req, res) => {
    //req.body
    const isExist = await UserService.signup(req.body);
    if (isExist) {
      res.send({
        ActionType: "Reject",
        Message: "账号已存在",
      });
    } else {
      res.send({
        ActionType: "OK",
        Message: "注册成功",
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
    });
    res.send({
      ActionType: "OK",
    });
  },

  add: async (req, res) => {
    // console.log(req.body, req.file);

    const { account, password, role, gender } = req.body;

    const isExist = await UserService.add({
      account,
      password,
      role: Number(role),
      gender: Number(gender),
    });
    res.send({
      ActionType: isExist ? "Reject" : "OK", // 存在返回Reject，成功返回OK
      Message: isExist ? "账号已存在" : "创建成功",
    });
  },

  getList: async (req, res) => {
    const result = await UserService.getList();
    res.send({
      ActionType: "OK",
      data: result,
    });
  },

  delList: async (req, res) => {
    
    // console.log(req.params.id);

    await UserService.delList({_id: req.params.id});
    res.send({
      ActionType: "OK",
    });
  },

  updateList: async (req, res) => {

    // console.log(req.params.id, req.body);

    await UserService.updateList({
      _id: req.params.id,
      account: req.body.account,
      password: req.body.password,
      role: Number(req.body.role),
    });
    res.send({
      ActionType: "OK",
    });
  },

  getRole: async (req, res) => {
    const result = await UserService.getRole({ _id: req.params.id });
    console.log(result);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};

module.exports = UserController;
