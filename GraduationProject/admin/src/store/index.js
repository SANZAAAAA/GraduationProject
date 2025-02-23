import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    isGetRouter: false,
    isSideCollapse: false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeGetRouter(state, value) {
      state.isGetRouter = value
    },
    changeSideCollapse(state) {
      state.isSideCollapse = !state.isSideCollapse
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    cleanUserInfo(state, value) {
      state.userInfo = {}
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isSideCollapse", "userInfo"] // 控制持久化的参数
  })],
})
