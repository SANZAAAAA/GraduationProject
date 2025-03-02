<template>
  <div>
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
          <el-input v-model="surveyForm.title" />
        </el-form-item>
        <el-form-item label="问卷描述" prop="description">
          <el-input type="textarea" :rows="5" v-model="surveyForm.description" />
        </el-form-item>
        <el-form-item label="口令" prop="password">
          <el-input v-model="surveyForm.password" />
        </el-form-item>
        <el-form-item label="问题" prop="questions">
          <el-button type="primary" @click="addQuestion">添加问题</el-button>
          <el-button type="danger" @click="deleteQuestion">删除问题</el-button>
          <el-table :data="surveyForm.questions" style="width: 100%">
            <el-table-column prop="question" label="问题" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="options" label="选项" width="180"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item class="center">
          <el-col :span="2"> </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="submitForm()"> 新建问卷</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const surveyFormRef = ref();
const surveyForm = reactive({
  title: "",
  description: "",
  password: "",
  questions: [],
});
const surveyFormRules = reactive({
  title: [{ required: true, message: "请输入问卷标题", trigger: "blur" }],
  description: [{ required: false }],
  password: [{ required: true, message: "请输入口令", trigger: "blur" }],
  questions: [{ required: true, message: "请添加问题", trigger: "blur" }],
});
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
  .el-row {
    margin-top: 20px;
    .box-card {
      text-align: center;
    }
  }
}
</style>
