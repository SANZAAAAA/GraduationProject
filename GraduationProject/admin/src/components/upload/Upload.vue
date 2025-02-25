<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChangeAvatar"
  >
    <img v-if="props.avatar"
         :src="uploadAvatar"
          class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { defineEmits, defineProps, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  avatar: String,
});

const emit = defineEmits(["avatarChange"])

const uploadAvatar = computed(
  () => {
    if (props.avatar) {
      if (props.avatar.includes("blob")) {
        return props.avatar;
      } else {
        return "http://localhost:3000" + props.avatar;
      }
    } else {
      return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    }
  }
  // props.avatar.includes("blob")
  // ? props.avatar
  // : "http://localhost:3000" + props.avatar
);

// 选择完头像的回调
const handleChangeAvatar = (file) => {
    emit("avatarChange", file.raw);
};
</script>

<style lang="scss" scoped>

::v-deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  ::v-deep .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  ::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 250px;
    object-fit: cover;
    object-position: center;
  }
</style>