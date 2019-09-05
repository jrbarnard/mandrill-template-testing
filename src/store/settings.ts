interface SettingsState {
  apiKey: string;
}

export default {
  namespaced: true,
  state: {
    apiKey: '',
  } as SettingsState,
  mutations: {
    setApiKey(state: SettingsState, apiKey: string) {
      state.apiKey = apiKey;
    },
  },
  actions: {
    //
  },
  getters: {
    //
  },
};
