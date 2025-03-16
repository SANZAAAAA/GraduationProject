// const { updateList } = require("../../controller/admin/SurveyController");
const SurveyModel = require("../../models/SurveyModel");

const SurveyService = {
    upload: async ({ user_id, title, password, description, questions, cover }) => {
        return SurveyModel.create({
              creator: user_id,
              title,
              password,
              description,
              questions: questions.map((q, index) => ({
                qid: index + 1, // 自动生成 qid
                text: q.text,
                type: q.type,
                options: q.options || [],
                weight: q.weight || 1,
                required: q.required || false,
              })),
              cover
          });
    },
};

module.exports = SurveyService;