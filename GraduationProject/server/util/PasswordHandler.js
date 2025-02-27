// utils/passwordHash.js
const bcrypt = require('bcryptjs');

/**
 * 密码哈希处理
 * @param {string} plainPassword 明文密码
 * @returns {Promise<string>} 哈希后的密码
 */
const passwordHash = async (plainPassword) => {
  try {
    const saltRounds = 10;  // 盐值成本为10
    const salt = await bcrypt.genSalt(saltRounds);  //加盐
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new Error(`密码加密失败: ${error.message}`);
  }
};

/**
 * 密码验证方法
 * @param {string} plainPassword 待验证密码
 * @param {string} hashedPassword 已存储的哈希密码
 * @returns {Promise<boolean>} 是否匹配
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error(`密码验证失败: ${error.message}`);
  }
};

module.exports = {
  passwordHash,
  comparePassword
};