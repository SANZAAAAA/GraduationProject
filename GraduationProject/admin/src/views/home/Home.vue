<template>
  <div>
    <el-page-header content="首页" :icon="ArrowLeft" title="占位" />

    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h2 style="line-height: 100px">
            欢迎 {{ $store.state.userInfo.username }} 回来，{{ welcomeText }}
          </h2>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
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
import { ArrowLeft } from "@element-plus/icons-vue";
import { computed } from "vue";

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const welcomeText = computed((daytime) => {
    daytime = new Date().getHours()
    if (daytime > 6 && daytime < 12) {
        return '早上好，精神满满的一天又开始了。'
    } else if (daytime > 12 && daytime < 21) {
        return '下午好，喝杯茶享受午后时光吧。'
    } else {
        return '夜深了，来杯咖啡提提神吧。'
    }
});

const store = useStore();
console.log(store.state);
// import axios from "axios";
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
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
