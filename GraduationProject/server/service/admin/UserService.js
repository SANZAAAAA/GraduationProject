// const { updateList } = require("../../controller/admin/UserController");
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
      userObj._id = userObj._id.toString(); // 关键转换步骤, 将_id从Object转换为String
      delete userObj.password;
      return userObj;
    }
    return null;
  },
  signup: async ({ account, password }) => {
    const user = await UserModel.findOne({ account });

    // 用户存在
    if (user) return true;

    // 创建用户
    await UserModel.create({
      account,
      username: account,
      // 密码加密后存储
      password: await passwordHash(password),
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
    const hashedPassword = await passwordHash(password);
    await UserModel.create({
      account,
      username: account,
      password: hashedPassword,
      role,
      gender,
    });
    return false;
  },
  getList: async () => {
    return UserModel.find({}, [
      "account",
      "username",
      "role",
      "avatar",
      "gender",
    ]).sort({ role: 1 });
  },
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  updateList: async ({ _id, account, password, role }) => {
    if (password) {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          account,
          password: await passwordHash(password),
          role,
        }
      );
    } else {
      return UserModel.updateOne(
        {
          _id,
        },
        {
          account,
          role,
        }
      );
    }
  },
  getRole: async () => {
    const { role } = UserModel.findOne({ _id }).select("role");
    return role;
  },
};

module.exports = UserService;
