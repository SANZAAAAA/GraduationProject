<template>
  <div>
    <div class="particles-container">
      <vue-particles
        id="tsparticles"
        :particlesLoaded="particlesLoaded"
        :options="style"
      />

      <div class="formContainer">
        <h3>问卷系统</h3>
        <el-form
          ref="signupFormRef"
          style="max-width: 600px"
          :model="signupForm"
          status-icon
          :rules="signupRules"
          label-width="auto"
          class="signupform"
          @keyup.native.enter="submitForm()"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              style="width: 330px"
              v-model="signupForm.account"
              autocomplete="off"
            />
          </el-form-item>
          <br />
          <el-form-item label="密码" prop="password">
            <el-input
              style="width: 330px"
              v-model="signupForm.password"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <br />
          <el-form-item label="确认密码" prop="reconfirm">
            <el-input
              style="width: 330px"
              v-model="signupForm.reconfirm"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <br />

          <!-- <el-form-item class="center">
            <el-row :gutter="20">
              <el-col :span="5"></el-col>
              <el-col :span="5">
                <el-button type="primary" @click="submitForm()"> 注册 </el-button>
              </el-col>
              <el-col :span="5">
                <router-link to="/login" class="text-link">Go Back</router-link>
              </el-col>
            </el-row>
          </el-form-item> -->

          <el-form-item class="center">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button
              type="primary"
              @click="submitForm()"
            >
              注册
            </el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link
              to="/Login"
              class="text-link"
              >Go Back</router-link
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import signup from "@/util/signup";

const router = useRouter();

const signupForm = reactive({
  account: "",
  password: "",
  reconfirm: "",
}); //表单绑定响应式対象
const signupFormRef = ref(); //表单引用对象

//提交表单函数
const submitForm = async () => {
  // 1. 将表单验证转换为 Promise
  const isValid = await new Promise((resolve) => {
    signupFormRef.value.validate(resolve);
  });

  if (!isValid) return;

  // 2. 验证密码一致性
  if (signupForm.password !== signupForm.reconfirm) {
    ElMessage.error("两次密码不匹配");
    return;
  }

  // 3. 发起注册请求（正确使用 await）
  const res = await signup("/adminapi/user/signup", signupForm);

  // 4. 处理响应
  if (res.ActionType === "OK") {
    ElMessage.success(res.Message);
    // 跳转到登录页
    router.push("/login");
  } else {
    ElMessage.error(res.Message);
  }

  //
  // signupFormRef.value.validate((valid) => {
  //   if (valid) {
  //     if (signupForm.password === signupForm.reconfirm) {
  //       signup("/adminapi/user/signup", password).then((res) => {
  //         if(res.ActionType === "OK") {
  //           ElMessage.success(res.Message);
  //         } else if (res.ActionType === "Reject") {
  //           ElMessage.error(res.Message);
  //         }
  //       });
  //     } else {
  //       ElMessage.error("两次密码不匹配");
  //     }
  //   }
  // });
};

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

const signupRules = reactive({
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
    { min: 6, message: "密码不少于6位", trigger: "blur" },
  ],
  reconfirm: [
    { required: true, message: "请再次确认密码", trigger: "blur" },
    { min: 6, message: "", trigger: "blur" },
  ],
});
// 配置particles的样式
const style = {
  background: {
    color: {
      value: "#transparent",
    },
    image: "../assets/bground03.jpg",
  },
  fpsLimit: 144,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "grab",
      },
      onHover: {
        enable: true,
        mode: "repulse",
        Parallax: {
          enable: true,
          force: 60,
          smooth: 10,
        },
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 10,
      },
      grab: {
        distance: 100,
        links: {
          blink: false,
          consent: false,
          opacity: 1,
        },
      },
      push: {
        quantity: 3,
      },
      repulse: {
        distance: 100,
        duration: 1,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 150,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #20202079, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }
  .signupform {
    margin-top: 20px;
  }
}

.center :deep(.el-form-item__content) {
  display: flex;
  justify-content: center; /* 水平居中 */
}
.text-link {
  color: grey;
  cursor: pointer;
  text-decoration: underline;
}
::v-deep .el-form-item__label {
  color: white;
}
.particles-container {
  position: relative; /* 确保背景图片和粒子效果正确叠加 */
  height: 100vh; /* 根据需要调整高度 */
  width: 100vw; /* 根据需要调整宽度 */
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/bground04.jpg"); /* 替换为您的背景图片路径 */
  overflow: hidden; /* 防止粒子超出边界 */
}
</style>
