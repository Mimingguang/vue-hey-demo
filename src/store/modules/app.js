import Cookies from 'js-cookie'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  languages: 'zh',
  network: true,
  isSun: Cookies.get('isSun') ? !!+Cookies.get('isSun') : true
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_LANGUAGES: (state, languages) => {
    state.languages = languages;
  },
  TOGGLE_NETWORK: (state, network) => {
    state.network = network;
  },
  TOGGLE_ISSUN: state => {
    state.isSun = !state.isSun;
    if (state.isSun) {
      Cookies.set('isSun', 1);
    } else {
      Cookies.set('isSun', 0);
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
  toggleNetWork({ commit }, network) {
    commit('TOGGLE_NETWORK', network);
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
