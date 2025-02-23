import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'

import routescfg from './config'
import store from '@/store'
import Signup from '@/views/Signup.vue'

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
    //DashBoard嵌套路由动态添加
    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由隔离
router.beforeEach((to, from, next) => {
  if (to.name === "login" || to.name === "signup") {
    next();
  } else {
    // 已登录则next, 未登录则重定向login
    if (!localStorage.getItem("token")) {
      next({
        path:"/login"
      })
    } else {
      // 以下为死循环, 需要设置vuex
      // ConfigRouter();
      // next({
      //   path:to.fullPath
      // })
      if (!store.state.isGetRouter) {
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  routescfg.forEach(item => {
    router.addRoute("mainbox",item)
  })

  // 改变state
  store.commit("changeGetRouter", true)
}


export default router
