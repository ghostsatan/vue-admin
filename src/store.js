import Vue from 'vue';
import Vuex from 'vuex';
import { findIndex } from './util'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    options: [],
    activeIndex: '/Table',
    navTags: [],
    isNavMenuOpen: true
  },
  // 2019年12月20日14:32:51新增动态tab
  getters: {
    activeTag(state) {
      let tag = state.navTags.find((item) => {
        return item.active === true
      })
      return tag ? tag.index : ''
    },
    navTagIndexs(state) {
      return state.navTags.map((item) => {
        return item.index
      })
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    toggleMenuOpen(state, payload) {
      state.isNavMenuOpen = !state.isNavMenuOpen
    },
    addNavTags(state, view) {
      let index = findIndex(state.navTags, 'index', view.meta.index)

      state.navTags.forEach((item) => {
        item.active = false
      })

      if (index === -1) {
        state.navTags.push({
          index: view.meta.index,
          title: view.meta.title,
          active: true
        })
      } else {
        state.navTags[index].active = true
      }
    },
    removeOneNavTag(state, payload) {
      let index = state.navTags.findIndex((item) => {
        return item.index === payload.index
      })
      if (index === -1) {
        return
      }
      state.navTags.splice(index, 1)
    }
  },
  actions: {
    addNavTags({ state, commit }, view) {
      commit('addNavTags', view)
    },
    removeOneNavTag({ state, commit }, payload) {
      commit('removeOneNavTag', payload)
    }
  }
  // mutations: {
  //   setUserInfo (state, payload) {
  //     state.userInfo = payload;
  //   },
  //   // 添加tabs
  //   add_tabs (state, data) {
  //     console.log(state,data)
  //     this.state.options.push(data);
  //   },
  //   // 删除tabs
  //   delete_tabs (state, route) {
  //     let index = 0;
  //     for (let option of state.options) {
  //       if (option.route === route) {
  //         break;
  //       }
  //       index++;
  //     }
  //     this.state.options.splice(index, 1);
  //   },
  //   // 设置当前激活的tab
  //   set_active_index (state, index) {
  //     console.log(state,index);
  //     this.state.activeIndex = index;
  //   },
  //   // 设置详情信息
  //   save_detail_info (state, info) {
  //     this.state.userInfo = info;
  //   }
  // }
});

