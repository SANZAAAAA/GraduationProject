<template>
  <div>
    <el-page-header content="首页" icon="" title="占位" class="header"/>

    <el-card class="box-card1">
      <el-row>
        <el-col :span="1"> </el-col>
        <el-col :span="2">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="21" style="text-align: center">
          <h2 style="line-height: 100px">
            欢迎 {{ $store.state.userInfo.username }} 回来，{{ welcomeText }}
          </h2>
        </el-col>
      </el-row>
      <template #footer>
        <div class="custom-footer">
          <el-row>
            <el-col :span="1"> </el-col>
            <el-col :span="20" class="introduction-text">{{ dynamicFooterText }}</el-col>
            <el-col :span="1"> </el-col>
          </el-row>
        </div>
      </template>
    </el-card>

    <el-card class="box-card2">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const welcomeText = computed((daytime) => {
  daytime = new Date().getHours();
  if (daytime >= 6 && daytime < 12) {
    return "早上好，精神满满的一天又开始了。";
  } else if (daytime >= 12 && daytime < 18) {
    return "下午好，喝杯茶享受午后时光吧。";
  } else if (daytime >= 18 && daytime < 22) {
    return "傍晚到了，记得离开座位活动身体哦。";
  } else {
    return "夜深了，来杯咖啡提提神吧。";
  }
});

const dynamicFooterText = store.state.userInfo.introduction;

console.log(store.state);
// import axios from "axios";
</script>

<style lang="scss" scoped>
.header{
  margin-top:20px;
  margin-left:20px;
}
.box-card1 {
  margin-top: 20px;
  .custom-footer {
    width: 100%; /* 确保宽度填充父容器 */
    min-height: 40px; /* 最小高度（根据需求调整） */
    white-space: normal; /* 允许文本换行 */
    word-wrap: break-word; /* 长单词或URL换行 */
    overflow-wrap: break-word; /* 现代浏览器更推荐使用 */
    padding: 10px; /* 内边距（与 Element UI 默认风格一致） */
    box-sizing: border-box; /* 包含 padding 在宽度内 */

    .introduction-text {
      font-size: large;
      white-space: pre-line; /* 保留换行符，合并其他空白符 */
      word-wrap: break-word; /* 允许长单词换行 */
    }
  }
}
.box-card2 {
  margin-top: 50px;
  .custom-footer {
    width: 100%; /* 确保宽度填充父容器 */
    min-height: 40px; /* 最小高度（根据需求调整） */
    white-space: normal; /* 允许文本换行 */
    word-wrap: break-word; /* 长单词或URL换行 */
    overflow-wrap: break-word; /* 现代浏览器更推荐使用 */
    padding: 10px; /* 内边距（与 Element UI 默认风格一致） */
    box-sizing: border-box; /* 包含 padding 在宽度内 */

    .introduction-text {
      font-size: large;
      white-space: pre-line; /* 保留换行符，合并其他空白符 */
      word-wrap: break-word; /* 允许长单词换行 */
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
