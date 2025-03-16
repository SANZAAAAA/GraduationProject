var express = require("express");
const SurveyController = require("../../controller/admin/SurveyController");
var SurveyRouter = express.Router();


// 图片上传模块
const multer = require("multer");
const upload = multer({ dest: "public/coveruploads/" });







// 问卷创建
SurveyRouter.post("/adminapi/survey/upload",
    upload.single("file"),
    SurveyController.upload
);
  


module.exports = SurveyRouter;