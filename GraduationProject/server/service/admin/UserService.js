const { changepassword } = require("../../controller/admin/UserController");
const UserModel = require("../../models/UserModel");

const UserService = {
  login: async (account, password) => {
    return UserModel.find(account, password);
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          username,
          introduction,
          gender,
        }
      );
    }
  },
  changepassword: async ({ _id, password }) => {
    return UserModel.updateOne(
      {
        _id,
      },
      {
        password,
      }
    );
  },
};

module.exports = UserService;
