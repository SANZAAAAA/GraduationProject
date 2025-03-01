var express = require("express");
const UserController = require("../../controller/admin/UserController");
var UserRouter = express.Router();

// 图片上传模块
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });

/* GET home page. */
UserRouter.post("/adminapi/user/login", UserController.login);
UserRouter.post("/adminapi/user/signup", UserController.signup);
UserRouter.post("/adminapi/user/change-password", UserController.changepassword);
UserRouter.post("/adminapi/user/upload",
  upload.single("file"),
  UserController.upload
);
UserRouter.post("/adminapi/user/add", UserController.add);
UserRouter.put("/adminapi/user/list/:id", UserController.updateList);

// 实现用户列表的增删改查
UserRouter.get("/adminapi/user/list", UserController.getList);
UserRouter.delete("/adminapi/user/list/:id", UserController.delList);

module.exports = UserRouter;
