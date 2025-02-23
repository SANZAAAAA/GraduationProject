<template>
  <el-container>
    <side-menu />

    <el-container direction="vertical">
      <top-header />
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TopHeader from "@/components/mainbox/TopHeader.vue";
import SideMenu from "@/components/mainbox/SideMenu.vue";
</script>
