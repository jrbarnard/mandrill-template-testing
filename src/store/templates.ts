import TemplateModel from '@/models/template';

interface TemplatesState {
  currentTemplate: TemplateModel | null;
}

export default {
  namespaced: true,
  state: {
    currentTemplate: null,
  } as TemplatesState,
  mutations: {
    setCurrentTemplate(state: TemplatesState, currentTemplate: TemplateModel | null) {
      state.currentTemplate = currentTemplate;
    },
  },
  actions: {
    //
  },
  getters: {
    //
  },
};
