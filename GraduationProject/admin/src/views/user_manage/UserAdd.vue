<template>
  <div>
    <el-card>
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
          <el-input
            v-model="userForm.account"
            placeholder="请输入账号"
            style="width: 500px"
          />
          <el-tooltip content="初始用户名默认为账号" placement="right-start">
            <el-icon :size="30" style="color: darkgrey">&nbsp;<InfoFilled /></el-icon>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            style="width: 500px"
          />
          <el-tooltip content="密码不低于6位" placement="right-start">
            <el-icon :size="30" style="color: darkgrey">&nbsp;<InfoFilled /></el-icon>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="选择角色" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.value === 1 && userRole === 1"
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
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { InfoFilled } from "@element-plus/icons-vue";
import addUser from "@/util/addUser";

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
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      validator: (_, value, callback) => {
        if (!/^[a-zA-Z0-9]*$/.test(value)) {
          callback(new Error("只能包含英文或数字"));
        } else {
          callback();
        }
      },
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
});

const store = useStore();
const userRole = computed(() => store.state.userInfo.role);

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (!valid) return; // 验证不通过直接返回

    const res = await addUser("/adminapi/user/add", userForm);

    if (res.ActionType === "OK") {
      ElMessage.success(res.Message);
    } else if (res.ActionType === "Reject") {
      ElMessageBox.alert(res.Message, "添加用户", {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "确认",
      });
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
  // /* 更改tip背景色 */
  //.el-tooltip__popper.is-dark {
  //  background: rgba(70, 76, 91, 0.9) !important;
  //  color: #fff;
  //  max-width: 18%;
  //  line-height: 24px;
  //}
}

</style>
