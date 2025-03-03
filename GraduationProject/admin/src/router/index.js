import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainBox from "../views/MainBox.vue";

import routescfg from "./config";
import store from "@/store";
import Signup from "@/views/Signup.vue";
import Test from "@/views/test.vue";
import Test2 from "@/views/test2.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
    //DashBoard嵌套路由动态添加
  },
  {
    path:"/test",
    name: "test",
    component: Test,
  },
  {
    path: "/test2",
    name: "test2",
    component: Test2,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由隔离
router.beforeEach((to, from, next) => {
  if (to.name === "login" || to.name === "signup") {
    next();
  } else {
    // 已登录则next, 未登录则重定向login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      // 以下为死循环, 需要设置vuex
      // ConfigRouter();
      // next({
      //   path:to.fullPath
      // })
      if (!store.state.isGetRouter) {
        // 先删除所有的嵌套路由(删除mainbox下的所有路由)
        router.removeRoute("mainbox");

        ConfigRouter();
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

const checkPermission = (item) => {
  if (item.reqAdmin) {
    return store.state.userInfo.role !== 2;
  }
  return true;
};

const ConfigRouter = () => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox,
      //DashBoard嵌套路由动态添加
    });
  }
    

  routescfg.forEach((item) => {
    checkPermission(item) && router.addRoute("mainbox", item);
  });

  // 改变state
  store.commit("changeGetRouter", true);
};

export default router;
