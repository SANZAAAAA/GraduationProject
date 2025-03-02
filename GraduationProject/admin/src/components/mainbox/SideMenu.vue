<template>
  <el-aside :width="$store.state.isSideCollapse?'65px':'300px'">
    <el-menu 
    :collapse="$store.state.isSideCollapse" 
    :collapse-transition="false"
    :router="true"
    :default-active="route.fullPath"
    >
      <el-menu-item index="/home">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><grid /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/survey-manage">
        <template #title>
          <el-icon><tools /></el-icon>
          <span>问卷管理</span>
        </template>
        <el-menu-item index="/survey-manage/addsurvey">添加问卷</el-menu-item>
        <el-menu-item index="/survey-manage/surveylist">问卷列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/surveys">
        <template #title>
          <el-icon><list /></el-icon>
          <span>问卷</span>
        </template>
        <el-menu-item index="/surveys/dosurvey">做问卷</el-menu-item>
        <el-menu-item index="/surveys/summary">问卷总结</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();

// console.log(route.fullPath)
import {
  HomeFilled,
  Avatar,
  Folder,
  List,
  Tools,
  Grid,
  MessageBox,
  Pointer,
} from "@element-plus/icons-vue";

const vAdmin = {
  mounted(el) {
    // console.log(el)
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu{
    height: 100vh;
  }
}
</style>
