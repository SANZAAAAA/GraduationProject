<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapse"><Menu /></el-icon>
      <span style="margin-left: 10px">问卷系统</span>
    </div>
    <div class="right">
      <span> 你好， {{$store.state.userInfo.username}} </span>&nbsp;&nbsp;&nbsp;
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="45" :src="avatarUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Menu } from "@element-plus/icons-vue";

const store = useStore();
const router = useRouter();

const handleCollapse = () => {
  store.commit("changeSideCollapse");
};

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);

const handleCenter = () => {
    router.push("/center")
}

const handleLogout = () => {
  localStorage.removeItem("token")
    store.commit("cleanUserInfo")
    router.push("/login")
}
</script>

<style lang="scss" scoped>
.el-header{
    background-color: #1f1e33;
    color:white;
    width:100%;
    height:60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,.right{
    display: flex;
}
.left{
    i{
        margin:auto;
    }
}
.right{
    .el-dropdown{
        margin:auto;
    }
    //去除icon的dropdown聚焦时边框
    :focus-visible{
        outline:none;
    }
    margin-right: 10px;
}
</style>
