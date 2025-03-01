<template>
  <div>
    <div class="particles-container">
      <vue-particles
        id="tsparticles"
        :particlesLoaded="particlesLoaded"
        :options="style"
      />

      <div class="formContainer">
        <h3>占位</h3>
        <el-form
          ref="loginFormRef"
          style="max-width: 600px"
          :model="loginForm"
          status-icon
          :rules="loginRules"
          label-width="auto"
          class="loginform"
          @keyup.native.enter="submitForm()"
        >
          <el-form-item label="账号" prop="account" class="item">
            <el-input
              style="width: 330px"
              v-model="loginForm.account"
              autocomplete="off"
            />
          </el-form-item>
          <br />
          <el-form-item label="密码" prop="password" class="item">
            <el-input
              style="width: 330px"
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
              show-password
            />
          </el-form-item>
          <br />
          <el-form-item class="center">
            <el-button type="primary" @click="submitForm()"> 登录 </el-button>
          </el-form-item>
          <br />
          <el-form-item class="center">
            <router-link to="/Signup" class="text-link">
              Have no account? Click here to create a new account
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";
import { useStore } from "vuex";
import login from "@/util/login";

const store = useStore();
const router = useRouter();

const loginFormRef = ref(); //表单引用对象
const loginForm = reactive({
  account: "",
  password: "",
}); //表单绑定响应式対象
const loginRules = reactive({
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
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
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const submitForm = async () => {
  // 1. 执行表单验证
  const isValid = await new Promise((resolve) => {
    loginFormRef.value.validate(resolve);
  });

  if (!isValid) return;
  // 2. 显示加载状态
  // 3. 发起登录请求

  const loading = ElLoading.service({
    lock: true,
    text: "登录中...",
  });

  const res = await login("/adminapi/user/login", loginForm);
  // 4. 处理响应

  // 模拟延迟
  setTimeout(() => {
    if (res.ActionType === "OK") {
      // 存储用户信息
      store.commit("changeUserInfo", res.data);
      ElMessage.success("登录成功");
      // 路由跳转
      router.push("/home");
    } else {
      ElMessage.error("账号或密码错误");
    }
  }, 500);
  // 关闭加载状态
  setTimeout(loading?.close, 500);
  console.log("当前登录用户: ", res.data);
};

// //提交表单函数
// const submitForm = async () => {
//   loginFormRef.value.validate((valid) => {
//     if (valid) {
//       // localStorage.setItem("token", "login successs");
//       axios.post("/adminapi/user/login", loginForm).then((res) => {
//         console.log(res.data);
//         if (res.data.ActionType === "OK") {
//           // console.log(res.data.data)
//           store.commit("changeUserInfo", res.data.data);
//           console.log(res.data.data);
//           router.push("/home");
//           // axios拦截器设置token// localStorage.setItem("token", "login successs");
//         } else {
//           ElMessage.error("密码错误");
//         }
//       });
//       // router.push("/home");
//     }
//   });
// };

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

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
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "grab",
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
  .loginform {
    margin-top: 20px;
  }
  .item {
    margin-left: 28px;
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
  background-image: url("../assets/bground03.jpg"); /* 替换为您的背景图片路径 */
  overflow: hidden; /* 防止粒子超出边界 */
}
</style>
