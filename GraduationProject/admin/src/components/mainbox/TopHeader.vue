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
            <el-icon :size="25" color="white"><UserFilled /></el-icon>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Menu, UserFilled } from "@element-plus/icons-vue";

const store = useStore();
const router = useRouter();

const handleCollapse = () => {
  store.commit("changeSideCollapse");
};

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
}
</style>
