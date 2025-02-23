const UserService = require("../../service/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    console.log(req.body);

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
          username: result[0].username, //昵称
          gender: result[0].gender ? result[0].gender : 0, //性别, 0, 1, 2
          introduction: result[0].introduction,
          avatar: result[0].avatar, //头像
          role: result[0].role, //管理1,编辑2
        },
      });
    }
  },
};

module.exports = UserController;
