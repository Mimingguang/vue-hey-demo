import utils from 'hey-utils';
const state = {
  sidebar: {
    opened: utils.getCookie('sidebarStatus')
      ? !!+utils.getCookie('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  languages: 'zh',
  isSun: utils.getCookie('isSun') ? !!+utils.getCookie('isSun') : true
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      utils.saveCookie('sidebarStatus', 1);
    } else {
      utils.saveCookie('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    utils.saveCookie('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_LANGUAGES: (state, languages) => {
    state.languages = languages;
  },
  TOGGLE_ISSUN: state => {
    state.isSun = !state.isSun;
    if (state.isSun) {
      utils.saveCookie('isSun', 1);
    } else {
      utils.saveCookie('isSun', 0);
    }
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  toggleLanguages({ commit }, languages) {
    commit('TOGGLE_LANGUAGES', languages);
  },
  toggleIsSun({ commit }) {
    commit('TOGGLE_ISSUN');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
