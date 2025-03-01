<template>
  <div>
    <el-page-header content="个人中心" icon="" title="占位" class="header" />

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>
            {{ store.state.userInfo.username }}
          </h3>
          <h5>
            {{ store.state.userInfo.role == 1 ? "管理员" : "编辑" }}
          </h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <!--
          ref帮助校验表单
          model双向绑定模型字段
          rules绑定规则
          -->
          <el-form
            style="max-width: 600px"
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="account">
              <el-input v-model="userForm.account" disabled />
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                placeholder="选择性别"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction" class="modify-intro">
              <el-input type="textarea" rows="15" v-model="userForm.introduction" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @avatarChange="handleChangeAvatar" />
            </el-form-item>
            <el-form-item class="center">
              <el-col :span="3"> </el-col>
              <el-col :span="5">
                <el-button type="primary" @click="submitForm()"> 更新</el-button>
              </el-col>
              <el-col :span="1">
                <el-button style="margin-left: 16px" @click="drawer = true">
                  修改密码
                </el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer
      v-model="drawer"
      title="修改密码"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        style="max-width: 600px"
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordFormRules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="passwordForm.password"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="check">
          <el-input
            v-model="passwordForm.check"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-col :span="4"></el-col>
          <el-col :span="7">
            <el-button type="primary" @click="submitPassword()"> 确认修改 </el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="closeDrawer"> 取消 </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import upload from "@/util/upload.js";
import changePassword from "@/util/changePassword.js";
import { fileToImage, resizeImageFile } from "@/util/imgSmoothing.js";
import Upload from "@/components/upload/Upload.vue";
import { useRouter } from "vue-router";

const drawer = ref(false);
const router = useRouter();

const store = useStore();
const { account, username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const passwordFormRef = ref();

const userForm = reactive({
  account,
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

const passwordForm = reactive({
  password: "",
  check: "",
});
// 性别选择
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

const userFormRules = reactive({
  account: [{ required: true }],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 1, max: 15, message: "长度应为1到15个字符", trigger: "blur" },
  ],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
    { min: 0, max: 500, message: "个人简介长度不超过500", trigger: "blur" },
  ],
  avatar: [{ required: false }],
});

const passwordFormRules = reactive({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  check: [
    { required: true, message: "请再次确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);

// 选择完头像的回调
const handleChangeAvatar = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

// canvas提高avatar清晰度
// const img = new Image();
// img.src = avatarUrl;
// img.onload = async () => {
//   const resizedBlob = await highQualityResize(img, 800);
//   const url = URL.createObjectURL(resizedBlob);
//   document.getElementById('preview').src = url;
// };

const handleClose = (done) => {
  passwordForm.password = "";
  passwordForm.check = "";
  passwordFormRef.value?.resetFields();
  done();
};

const closeDrawer = () => {
  drawer.value = false; // 直接修改状态
};

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //   console.log("submit", userForm);
      const res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType === "OK") {
        store.commit("changeUserInfo", res.data);
        ElMessage.success("更新成功!");
      }
    }
  });
};

const submitPassword = () => {
  passwordFormRef.value.validate(async (valid) => {
    console.log(passwordForm);
    if (valid) {
      const res = await changePassword("/adminapi/user/change-password", passwordForm);
      // console.log(res.ActionType);
      if (res.ActionType === "OK") {
        ElMessage.success("修改成功！请重新登陆");
        store.commit("cleanUserInfo");
        router.push("/login");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.header{
  margin-top:20px;
  margin-left:20px;
}
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
.modify-intro {
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    position: absolute;
  }

  ::-webkit-scrollbar-thumb {
    background: #756666;
  }

  ::-webkit-scrollbar-track {
    background: #ddd;
  }
}
</style>
