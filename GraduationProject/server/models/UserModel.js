const mongoose = require("mongoose");

// user模型 ==> 对应users集合/表

const userSchema = new mongoose.Schema({
  username: String, //昵称
  account: {
    //账号
    // 覆盖 account 字段配置
    type: String,
    required: true, // 必填约束
    unique: true, // 关键：添加唯一索引
    trim: true, // 自动去除首尾空格
  },
  password: {
    //密码
    type: String,
    required: true, // 必填约束
    select: false, // 隐藏敏感字段password
  },
  gender: {
    //性别, 保密0, 男1, 女2
    type: Number,
    default: 0,
  },
  introduction: {
    //简介
    type: String,
    default: "很高冷，不爱自我介绍~",
  },
  avatar: {
    //头像
    type: String,
    defalut: "",
  },
  role: {
    // 超级管理0, 管理1, 用户2
    type: Number,
    default: 2,
  },
});

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    // 问题数组（支持动态添加）
    {
      questionId: { type: String, required: true }, // 问题唯一标识（例如UUID）
      questionText: { type: String, required: true }, // 问题文本
      questionType: {
        // 问题类型
        type: String,
        enum: ["single-choice", "multiple-choice", "text"],
        required: true,
      },
      options: [{ type: String }], // 选项（仅单选/多选需要）
      required: { type: Boolean, default: false }, // 是否必填
      createdAt: { type: Date, default: Date.now }, // 问题添加时间
    },
  ],
});

// 检查明文密码和哈希后密码是否相等
userSchema.methods.comparePassword = async function (plainPassword) {
  const { comparePassword } = require("../util/PasswordHandler");
  return await comparePassword(plainPassword, this.password);
};

// 添加根据账号查询的静态方法
userSchema.statics.findByAccount = function (account) {
  return this.findOne({ account }).select("+password");
};

const UserModel = mongoose.model("user", userSchema);
const SurveyModel = mongoose.model("survey", surveySchema);

module.exports =  UserModel, SurveyModel ;

// todo:
//     1. 首页读取introduction
//     2. 个人中心修改密码  √
