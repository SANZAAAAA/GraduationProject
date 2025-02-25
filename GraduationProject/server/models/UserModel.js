const mongoose = require("mongoose")
const Schema = mongoose.Schema

// user模型 ==> 对应users集合/表

const UserType = {
    username: String,   //昵称
    account: String,    //账号
    password: String,   //密码
    gender: Number,     //性别, 0, 1, 2
    introduction: String,//简介
    avatar: String,     //头像
    role: Number        //管理1,编辑2
}

const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel


// todo:
//     1. 首页读取introduction
//     2. 个人中心修改密码  √