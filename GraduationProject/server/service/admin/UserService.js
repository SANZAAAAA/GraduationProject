const UserModel = require("../../models/UserModel");
const { passwordHash } = require("../../util/PasswordHandler");

const UserService = {
  login: async ({ account, password }) => {
    const user = await UserModel.findOne({ account }).select("+password");

    // 用户不存在
    if (!user) return null;

    // 验证密码
    const isMatch = await user.comparePassword(password);

    // 移除敏感字段后返回
    if (isMatch) {
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    }
    return null;
  },
  signup: async ({ account, password }) => {
    const user = await UserModel.findOne({ account });

    // 用户存在
    if (user) return true;

    // 密码加密
    const hashedPassword = await passwordHash(password);

    await UserModel.create({
      account,
      username: account,
      password: hashedPassword,
    });
    return false;
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
        password: await passwordHash(password),
      }
    );
  },
  add: async ({ account, password, role, gender }) => {
    const existingUser = await UserModel.findOne({ account });
    if (existingUser) return true;
    await UserModel.create({
      account,
      username: account,
      password,
      role,
      gender,
    });
    return false;
  },
};

module.exports = UserService;
