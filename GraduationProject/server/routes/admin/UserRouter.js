var express = require('express');
const UserController = require('../../controller/admin/UserController');
var UserRouter = express.Router();

/* GET home page. */
UserRouter.post("/adminapi/user/login", UserController.login)


module.exports = UserRouter;
