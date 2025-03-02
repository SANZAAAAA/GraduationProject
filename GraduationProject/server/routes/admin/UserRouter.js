var express = require("express");
const UserController = require("../../controller/admin/UserController");
var UserRouter = express.Router();

// 图片上传模块
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });

/* GET home page. */
// 登录
UserRouter.post("/adminapi/user/login", UserController.login);

// 注册
UserRouter.post("/adminapi/user/signup", UserController.signup);

// 修改密码
UserRouter.post("/adminapi/user/change-password", UserController.changepassword);

// 图片上传
UserRouter.post("/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);

// 实现用户列表的增删改查
UserRouter.post("/adminapi/user/add", UserController.add);
UserRouter.put("/adminapi/user/list/:id", UserController.updateList);
UserRouter.get("/adminapi/user/list", UserController.getList);
UserRouter.delete("/adminapi/user/list/:id", UserController.delList);

// 获取用户角色
UserRouter.get("/adminapi/user/role/:id", UserController.getRole);

module.exports = UserRouter;
