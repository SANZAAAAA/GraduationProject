<template>
  <div>
    <el-page-header content="添加用户" icon="" title="用户管理" />
    <el-form
      style="max-width: 600px"
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="选择角色" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-col :span="2"> </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="submitForm()"> 添加用户</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import addUser from "@/util/addUser";
const router = useRouter();

const options = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "用户",
    value: 2,
  },
];
const userFormRef = ref();
const userForm = reactive({
  account: "",
  password: "",
  role: 2, //1是管理员 2是普通用户
  gender: 0,
});

const userFormRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
});

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(userForm);

        const res = await addUser("/adminapi/user/add", userForm);
        if (res.ActionType === "OK") {
            ElMessage.success(res.Message);
        } else if (res.ActionType === "Reject") {
            ElMessageBox.alert(res.Message, '添加用户', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: '确认'
            })
        }

      router.push("/user-manage/userlist");
    }
  });
};
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
