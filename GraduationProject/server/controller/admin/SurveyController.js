const UserService = require("../../service/admin/SurveyService");
const JWT = require("../../util/JWT");

const SurveyController = {
  upload: async (req, res) => {
    // console.log(req.body, req.file);

    const { title, password, description, questions } = req.body;
    const cover = req.file ? `/coveruploads/${req.file.filename}` : "";
    const token = req.headers.authorization.split(" ")[1]; // 获取 token
    var payload = JWT.verify(token);
    JWT.verify();

    // console.log(payload._id, payload.account);
    //调用service模块更新数据
    // console.log("Received questions type:", typeof questions); // 应为 "string"
    // console.log("Received questions value:", questions); // 应为一个 JSON 字符串
    await UserService.upload({
      user_id: payload._id,
      title,
      password,
      description,
      questions: JSON.parse(questions),
      cover,
    });

    res.send({
      ActionType: "OK",
      data: {
        title,
        password,
        description,
        questions,
        cover,
      },
    });
  },
};

module.exports = SurveyController;
