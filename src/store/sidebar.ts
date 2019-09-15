import { VueConstructor } from 'vue';

interface SidebarState {
  show: boolean;
  component: string | null;
}

export default {
  namespaced: true,
  state: {
    show: false,
    component: null,
  } as SidebarState,
  mutations: {
    show(state: SidebarState) {
      state.show = true;
    },
    hide(state: SidebarState) {
      state.show = false;
    },
    setComponent(state: SidebarState, component: string | null) {
      state.component = component;
    },
  },
  actions: {
    //
  },
  getters: {
    //
  },
};
