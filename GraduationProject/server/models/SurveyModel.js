const mongoose = require("mongoose");

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
  cover: {
    // 封面
    type: String,
    defalut: "",
  },
  isReleased: {
    type: Boolean,
    default: false,
  },
  isTemplate: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    // 问题数组（支持动态添加）
    {
      qid: { type: Number, required: true }, // 问题序号
      text: { type: String, required: true }, // 问题文本
      type: {
        // 问题类型
        type: String,
        enum: ["single-choice", "multiple-choice", "text", "rating"],
        required: true,
      },
      options: [{ type: String }], // 选项（仅单选/多选需要）
      weight: { type: Number, default: 1 }, // 问题权重
      required: { type: Boolean, default: false }, // 是否必填
      createdAt: { type: Date, default: Date.now }, // 问题添加时间
    },
  ],
});

const SurveyModel = mongoose.model("survey", surveySchema);

module.exports = SurveyModel;
