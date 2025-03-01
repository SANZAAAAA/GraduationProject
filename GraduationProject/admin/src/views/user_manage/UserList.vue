<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理" />

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="account" label="账号" width="180" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="180">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1"> 管理员 </el-tag>
            <el-tag v-else class="ml-2" type="info"> 用户 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="
                drawer = true;
                onClickModify(scope.row);
              "
            >
              编辑
            </el-button>
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              title="确认删除?"
              @confirm="handleDelete(scope.row)"
              @cancel="console.log('取消删除')"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer
      v-model="drawer"
      title="编辑用户"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        style="max-width: 600px"
        ref="modifyFormRef"
        :model="modifyForm"
        :rules="modifyFormRules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="modifyForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="modifyForm.password"
            type="password"
            autocomplete="off"
            placeholder = "不修改密码请留空"
            show-password
          />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select
            v-model="modifyForm.role"
            placeholder="选择权限"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-col :span="4"></el-col>
          <el-col :span="7">
            <el-button type="primary" @click="handleUpdate(rowptr)"> 确认修改 </el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="closeDrawer"> 取消 </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import axios from "axios";

var rowptr = "";
const drawer = ref(false);
const modifyFormRef = ref();
const modifyForm = reactive({
  account: "",
  password: "",
  role: "",
});
const options = [
  {
    value: 1,
    label: "管理员",
  },
  {
    value: 2,
    label: "用户",
  },
];

const modifyFormRules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 1, max: 15, message: "长度应为1到15个字符", trigger: "blur" },
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
    { required: false, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择权限", trigger: "change" }],
};

const tableData = ref([]);

onMounted(() => {
  getTableData(true);
});

const getTableData = async (init) => {
  const loading = ElLoading.service({
    lock: true,
    text: "获取用户列表中...",
  });

  const res = await axios.get("/adminapi/user/list");
  // console.log(res.data);

  // 模拟延迟
  setTimeout(() => {
    if (res.data.ActionType === "OK") {
      // 存储用户信息
      tableData.value = res.data.data;
      if (init) ElMessage.success("获取用户列表成功");
    } else {
      ElMessage.error("获取用户列表失败");
    }
  }, 250);
  // 关闭加载状态
  setTimeout(loading?.close, 250);
};

const onClickModify = (data) => {
  rowptr = data;
  modifyForm.account = data.account;
  modifyForm.role = data.role;
};

const handleUpdate = async (data) => {
  const res = await axios.put(`/adminapi/user/list/${data._id}`, modifyForm);

  if (res.data.ActionType === "OK") {
    ElMessage.success("修改成功");
    getTableData(false);
    closeDrawer();
  } else {
    ElMessage.error("修改失败");
  }
};

const handleDelete = async (data) => {
  const res = await axios.delete(`/adminapi/user/list/${data._id}`);
  if (res.data.ActionType === "OK") {
    ElMessage.success("删除成功");
    getTableData(false);
  } else {
    ElMessage.error("删除失败");
  }
};

const handleClose = (done) => {
  modifyForm.account = "";
  modifyForm.password = "";
  modifyForm.role = "";
  modifyFormRef.value?.resetFields();
  done();
};

const closeDrawer = () => {
  drawer.value = false; // 直接修改状态
  modifyFormRef.value?.resetFields();
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>
