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
              <el-tooltip
                content="填写测试问卷需要输入该问卷的口令"
                placement="right-start"
              >
                <el-icon :size="30" style="color: darkgrey">&nbsp;<InfoFilled /></el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="问卷描述" prop="description">
              <el-input
                type="textarea"
                :rows="5"
                v-model="surveyForm.description"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item label="问卷封面" prop="cover">
              <Upload
                type="cover"
                :image="surveyForm.cover"
                @change="handleChangeCover"
              />
            </el-form-item>
            <br />
            <el-form-item class="center">
              <el-col :span="4"></el-col>
              <el-col :span="10">
                <el-button @click="saveSurvey()"> 保存问卷</el-button>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" @click="submitSurvey()"> 新建问卷</el-button>
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
                <el-button type="primary" @click="questionDialogVisible = true"
                  >添加问题</el-button
                >
              </div>
            </div>
          </template>
          <el-table
            :data="surveyForm.questions"
            stripe
            style="width: 100%; height: 37vw"
            row-key="id"
            :expand-row-keys="expandedRowKeys"
            @cell-click="expandChange"
          >
            <el-table-column type="expand">
              <template #default="props">
                <div class="expand-content">
                  <div class="text-section">
                    <h3 class="text-title">问题内容</h3>
                    <el-text class="text-text" size="large">{{ props.row.text }}</el-text>
                  </div>
                  <el-divider />
                  <div class="metadata-section">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="metadata-item">
                          <span class="metadata-label">权重：</span>
                          <el-tag type="info">{{ props.row.weight }}</el-tag>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="metadata-item">
                          <span class="metadata-label">必填：</span>
                          <el-tag :type="props.row.required ? 'success' : 'danger'">
                            {{ props.row.required ? "是" : "否" }}
                          </el-tag>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <template
                    v-if="
                      props.row.type === 'single-choice' ||
                      props.row.type === 'multiple-choice'
                    "
                  >
                    <el-divider />
                    <div class="options-section">
                      <h4 class="options-title">选项列表</h4>
                      <div class="options-list">
                        <el-tag
                          v-for="(option, index) in props.row.options"
                          :key="index"
                          class="option-item"
                          type="info"
                          effect="plain"
                          round
                        >
                          <span class="option-index">{{ index + 1 }}.</span>
                          {{ option }}
                        </el-tag>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="题号" prop="index" width="200" />
            <el-table-column label="类型" width="200">
              <template #default="scope">
                {{ typeMap[scope.row.type] || "未知类型" }}
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createdAt" width="300" />
            <el-table-column label="操作" prop="action">
              <template #default="scope">
                <el-button type="danger" @click="deleteSpecificQuestion(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="" prop="move">
              <template #default="scope">
                <div class="action-buttons">
                  <!-- 上移按钮 -->
                  <el-button
                    :disabled="scope.$index === 0"
                    @click="moveUp(scope.$index)"
                    class="action-btn"
                    link
                  >
                    <el-icon :size="20">
                      <ArrowUp />
                    </el-icon>
                  </el-button>

                  <!-- 下移按钮 -->
                  <el-button
                    :disabled="scope.$index === surveyForm.questions.length - 1"
                    @click="moveDown(scope.$index)"
                    class="action-btn"
                    link
                  >
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
            v-model="newQuestion.text"
            style="width: 1000px"
          />
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="权重">
              <el-input-number
                v-model="newQuestion.weight"
                :min="1"
                :max="10"
                controls-position="right"
                style="width: 300px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否必填"
              >&nbsp;&nbsp;&nbsp;
              <el-switch v-model="newQuestion.required" />
            </el-form-item>
          </el-col>
        </el-row>
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
          <el-col :span="16" style="height: ">
            <el-form-item
              v-if="
                newQuestion.type === 'single-choice' ||
                newQuestion.type === 'multiple-choice'
              "
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
            <el-form-item
              v-if="
                newQuestion.type === 'single-choice' ||
                newQuestion.type === 'multiple-choice'
              "
            >
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
      <template #footer>
        <div class="dialog-footer">
          <div class="button-group-center">
            <!-- 新增包裹容器 -->
            <el-button @click="questionDialogVisible = false" size="large"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="confirmAddQuestion"
              size="large"
              style="margin-left: 20px"
            >
              确 定
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import upload from "@/util/upload.js";
import Upload from "@/components/upload/Upload.vue";
import { ArrowUp, ArrowDown, InfoFilled } from "@element-plus/icons-vue";

const expandedRowKeys = ref([]);
const surveyFormRef = ref();
const surveyForm = reactive({
  title: "",
  cover: "",
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
  text: "",
  type: "",
  options: [],
  weight: 5,
  required: true,
  createdAt: new Date().toLocaleString(),
});

const typeMap = {
  "single-choice": "单选",
  "multiple-choice": "多选",
  text: "文本",
  rating: "评分",
};

const newOption = ref("");

const deleteSpecificQuestion = (index) => {
  const deletedId = surveyForm.questions[index].id;
  surveyForm.questions.splice(index, 1);
  // 移除被删除问题的展开状态
  expandedRowKeys.value = expandedRowKeys.value.filter((id) => id !== deletedId);
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
  if (!newQuestion.text || !newQuestion.type) {
    ElMessage.warning("请填写完整问题信息");
    return;
  }
  if (
    (newQuestion.type === "single-choice" || newQuestion.type === "multiple-choice") &&
    newQuestion.options.length < 2
  ) {
    ElMessage.warning("请至少添加两个选项");
    return;
  }
  // console.log(newQuestion);
  surveyForm.questions.push({
    ...newQuestion,
    id: Date.now() + Math.random(), // 添加唯一标识
    index: surveyForm.questions.length + 1, // 添加唯一索引
  });

  newQuestion.text = "";
  newQuestion.type = "";
  newQuestion.options = [];
  newQuestion.createdAt = new Date().toLocaleString();
  questionDialogVisible.value = false;
};

const expandChange = (row, col) => {
  if (col.type === "expand" || col.property === "action" || col.property === "move") {
    console.log("forbidden");
    return;
  }
  if (expandedRowKeys.value.includes(row.id)) {
    expandedRowKeys.value = expandedRowKeys.value.filter((id) => id !== row.id);
  } else {
    expandedRowKeys.value.push(row.id);
  }
};

// // 用于测试点击表格单元格时的事件处理
// const handle = (row, column, event, cell) => {
//   console.log("Row is:\n", row);
//   console.log("\nColum is:\n", column);
//   console.log("\nEvent is:\n", event);
//   console.log("\nCell is:\n", cell);
// };

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

// // 用于测试上移下移按钮
// const moveUp = (index) => {
//   // 创建新数组触发响应式更新
//   const newQuestions = [...surveyForm.questions];
//   [newQuestions[index], newQuestions[index - 1]] =
//     [newQuestions[index - 1], newQuestions[index]];
//   surveyForm.questions = newQuestions; // 必须赋值新数组
//   updateQuestionIndexes();
// };

// const moveDown = (index) => {
//   const newQuestions = [...surveyForm.questions];
//   [newQuestions[index], newQuestions[index + 1]] =
//     [newQuestions[index + 1], newQuestions[index]];
//   surveyForm.questions = newQuestions;
//   updateQuestionIndexes();
// };

const updateQuestionIndexes = () => {
  surveyForm.questions.forEach((text, index) => {
    text.index = index + 1;
  });
};

const handleChangeCover = (file) => {
  surveyForm.cover = URL.createObjectURL(file);
  surveyForm.file = file;
};

const saveSurvey = () => {
  console.log(surveyForm);
  ElMessage.success("问卷保存成功");
};

const submitSurvey = async () => {
  try {
    // 第一步：验证标题和口令
    await validateBasicInfo();

    // 第二步：检查问题列表
    if (surveyForm.questions.length === 0) {
      await showQuestionWarning();
      return;
    }

    // 第三步：提交表单
    console.log(surveyForm);
    const res = await upload("/adminapi/survey/upload", {
      ...surveyForm,
      questions: JSON.stringify(surveyForm.questions), // 确保此处转换为字符串
    });
    if (res.ActionType === "OK") {
      ElMessage.success("问卷创建成功");
    } else {
      ElMessage.error("问卷创建失败");
    }
  } catch (error) {
    // 基础信息验证失败会自动显示错误
    console.log("验证失败");
  }
};

// 新增验证方法
const validateBasicInfo = () => {
  return new Promise((resolve, reject) => {
    surveyFormRef.value.validateField(["title", "password"], (valid) => {
      valid ? resolve() : reject();
    });
  });
};

// 新增弹窗提示
const showQuestionWarning = async () => {
  try {
    await ElMessageBox.confirm("请至少添加一个问题后再提交", "提示", {
      confirmButtonText: "去添加问题",
      cancelButtonText: "取消提交",
      type: "warning",
    });
    // 自动滚动到问题区域
    document.querySelector(".el-col:last-child .el-card").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } catch {
    ElMessage.info("已取消提交");
  }
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
  margin-top: 0px;
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

.expand-content {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 8px 0;

  .text-section {
    margin-bottom: 12px;

    .text-title {
      color: #606266;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
    }

    .text-text {
      color: #303133;
      line-height: 1.6;
    }
  }

  .options-section {
    .options-title {
      color: #606266;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 500;
    }

    .options-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .option-item {
      padding: 8px 12px;
      font-size: 14px;

      .option-index {
        color: #909399;
        margin-right: 4px;
      }
    }
  }

  .el-divider {
    margin: 16px 0;
  }
}
.metadata-section {
  margin: 12px 0;

  .metadata-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .metadata-label {
      color: #606266;
      font-size: 14px;
      margin-right: 8px;
      min-width: 50px;
    }
  }
}
/* 修改样式部分 */
.dialog-footer {
  padding: 16px 0;
  background: #fff;

  :deep(.el-dialog__footer) {
    /* 穿透组件样式 */
    display: flex;
    justify-content: center;
  }

  .button-group-center {
    display: flex;
    justify-content: center;
    gap: 40px; /* 合理间距 */
    width: 100%;
  }

  .action-btn {
    min-width: 120px;
    padding: 12px 24px;
    margin: 0 10px; /* 添加边距 */
  }
}
.el-dialog {
  :deep(.el-dialog__body) {
    max-height: 60vh;
    overflow-y: auto;
  }

  :deep(.el-dialog__footer) {
    position: sticky;
    bottom: 0;
    background: white;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  }
}
  // /* 更改tip背景色 */
  //.el-tooltip__popper.is-dark {
  //  background: rgba(70, 76, 91, 0.9) !important;
  //  color: #fff;
  //  max-width: 18%;
  //  line-height: 24px;
  //}
</style>
