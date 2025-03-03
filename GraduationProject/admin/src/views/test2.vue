<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card>
          <el-page-header content="新建问卷" icon="" title="问卷管理" />
          <el-form
            style="max-width: 600px"
            ref="surveyFormRef"
            :model="surveyForm"
            :rules="surveyFormRules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item label="问卷标题" prop="title">
              <el-input v-model="surveyForm.title" style="width: 300px" />
            </el-form-item>
            <el-form-item label="口令" prop="password">
              <el-input v-model="surveyForm.password" style="width: 300px" />
            </el-form-item>
            <el-form-item label="问卷描述" prop="description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="surveyForm.description"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item label="问卷封面" prop="avatar">
              <Upload :avatar="surveyForm.img" @imgChange="handleChangeImg" />
            </el-form-item>
            <br />
            <el-form-item class="center">
              <el-col :span="4"></el-col>
              <el-col :span="10">
                <el-button type="primary" @click="submitForm()"> 新建问卷</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span class="header-title">问题列表</span>
              <div class="button-group">
                <el-button type="primary" @click="questionDialogVisible = true">添加问题</el-button>
              </div>
            </div>
          </template>
          <el-table :data="surveyForm.questions" stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div>
                  <p><strong>问题:</strong> {{ props.row.question }}</p>
                  <p v-if="props.row.type === 'single-choice' || props.row.type === 'multiple-choice'"><strong>选项:</strong></p>
                  <ul v-if="props.row.type === 'single-choice' || props.row.type === 'multiple-choice'">
                    <li v-for="(option, index) in props.row.options" :key="index">
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="题号" prop="index" width="200" />
            <el-table-column label="类型" prop="type" width="200" />
            <el-table-column label="创建时间" prop="createdAt" width="300" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="danger" @click="deleteSpecificQuestion(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="">
              <template #default="scope">
                <div class="action-buttons">
                  <!-- 上移按钮 -->
                  <el-button :disabled="scope.$index === 0" @click="moveUp(scope.$index)" class="action-btn" link>
                    <el-icon :size="20">
                      <ArrowUp />
                    </el-icon>
                  </el-button>

                  <!-- 下移按钮 -->
                  <el-button :disabled="scope.$index === surveyForm.questions.length - 1" @click="moveDown(scope.$index)" class="action-btn" link>
                    <el-icon :size="20">
                      <ArrowDown />
                    </el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="questionDialogVisible" title="添加问题" style="width: 1200px">
      <el-form :model="newQuestion" label-width="100px">
        <el-form-item label="问题">
          <el-input
            type="textarea"
            :rows="3"
            v-model="newQuestion.question"
            style="width: 1000px"
          />
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="类型">
              <el-select
                v-model="newQuestion.type"
                placeholder="请选择类型"
                style="width: 300px"
              >
                <el-option label="单选" value="single-choice"></el-option>
                <el-option label="多选" value="multiple-choice"></el-option>
                <el-option label="文本" value="text"></el-option>
                <el-option label="评分" value="rating"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              v-if="newQuestion.type !== 'text' && newQuestion.type !== 'rating'"
              label="选项"
            >
              <el-col :span="18">
                <el-input
                  v-model="newOption"
                  placeholder="请输入选项"
                  style="width: 500px"
                />
              </el-col>
              <el-col :span="2">
                <el-button @click="addOption">添加选项</el-button>
              </el-col>
            </el-form-item>
            <el-form-item lable="">
              <el-tag
                v-for="(option, index) in newQuestion.options"
                :key="index"
                closable
                @close="removeOption(index)"
                style="margin-left: 12px; margin-bottom: 12px"
              >
                {{ option }}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="questionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddQuestion">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";

const surveyFormRef = ref();
const surveyForm = reactive({
  title: "",
  img: "",
  password: "",
  description: "",
  questions: [],
});
const surveyFormRules = reactive({
  title: [{ required: true, message: "请输入问卷标题", trigger: "blur" }],
  description: [{ required: false }],
  password: [{ required: true, message: "请输入口令", trigger: "blur" }],
  questions: [{ required: true, message: "请添加问题", trigger: "blur" }],
});

const questionDialogVisible = ref(false);
const newQuestion = reactive({
  index: "",
  question: "",
  type: "",
  options: [],
  createdAt: new Date().toLocaleString(),
});
const newOption = ref("");

const deleteSpecificQuestion = (index) => {
  surveyForm.questions.splice(index, 1);
  updateQuestionIndexes();
};

const addOption = () => {
  if (newOption.value) {
    if (newQuestion.options.includes(newOption.value)) {
      ElMessage.warning("选项不能重复");
    } else {
      newQuestion.options.push(newOption.value);
      newOption.value = "";
    }
  } else {
    ElMessage.warning("选项不能为空");
  }
};

const removeOption = (index) => {
  newQuestion.options.splice(index, 1);
};

const confirmAddQuestion = () => {
  if (!newQuestion.question || !newQuestion.type) {
    ElMessage.warning("请填写完整问题信息");
    return;
  }
  console.log(newQuestion);
  surveyForm.questions.push({
    ...newQuestion,
    id: Date.now() + Math.random(), // 添加唯一标识
    index: surveyForm.questions.length + 1, // 添加唯一索引
  });

  newQuestion.question = "";
  newQuestion.type = "";
  newQuestion.options = [];
  newQuestion.createdAt = new Date().toLocaleString();
  questionDialogVisible.value = false;
};

const moveUp = (index) => {
  const currentQuestion = surveyForm.questions[index];
  surveyForm.questions[index] = surveyForm.questions[index - 1];
  surveyForm.questions[index - 1] = currentQuestion;
  updateQuestionIndexes();
};

const moveDown = (index) => {
  const currentQuestion = surveyForm.questions[index];
  surveyForm.questions[index] = surveyForm.questions[index + 1];
  surveyForm.questions[index + 1] = currentQuestion;
  updateQuestionIndexes();
};

const updateQuestionIndexes = () => {
  surveyForm.questions.forEach((question, index) => {
    question.index = index + 1;
  });
};

const submitForm = () => {
  surveyFormRef.value.validate(async (valid) => {
    if (!valid) return; // 验证不通过直接返回

    // 模拟提交表单
    ElMessage.success("问卷创建成功");
  });
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.button-group {
  display: flex;
  gap: 25px; /* 按钮间距 */
}
.demo-ruleForm {
  margin-top: 50px;
  .el-row {
    margin-top: 20px;
  }
}
.el-table {
  margin-top: 50px;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 添加间距控制 */
  height: 100%;
  justify-content: center;
}

/* 关键修复样式 */
.action-btn {
  padding: 0 !important; /* 清除按钮内边距 */
  margin: 0 !important; /* 清除按钮外边距 */
  min-width: 25px !important; /* 固定按钮宽度 */
  height: 25px !important; /* 固定按钮高度 */
  display: flex !important;
  align-items: center;
  justify-content: center;
}

/* 处理禁用状态 */
.is-disbled .el-icon {
  opacity: 0.5; /* 保持图标位置一致性 */
}
</style>
