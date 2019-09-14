interface SidebarState {
  show: boolean;
}

export default {
  namespaced: true,
  state: {
    show: false, // default for now to test
  } as SidebarState,
  mutations: {
    show(state: SidebarState) {
        state.show = true;
    },
    hide(state: SidebarState) {
        state.show = false;
    },
  },
  actions: {
    //
  },
  getters: {
    //
  },
};
