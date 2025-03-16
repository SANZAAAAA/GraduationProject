<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="props.image"
         :src="imageUrl"
          class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { defineEmits, defineProps, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  // 通用图片地址prop
  image: {
    type: String,
    default: ""
  },
  // 图片类型标识
  type: {
    type: String,
    default: "avatar" // 可选 'avatar' 或 'cover'
  }
});

const emit = defineEmits(["change"])



const imageUrl = computed(
  () => {
    if (props.image) {
      if (props.image.includes("blob")) {
        return props.image;
      } else {
        return "http://localhost:3000" + props.image;
      }
    } else {
      return type==="avatar" ?
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" :
        "https://bpic.588ku.com/element_origin_min_pic/23/04/24/d70b412699853353eede8e9d5aa57300.jpg";
    }
  }
  // props.avatar.includes("blob")
  // ? props.avatar
  // : "http://localhost:3000" + props.avatar
);

// 选择完头像的回调
const handleChange = (file) => {
    emit("change", file.raw);
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