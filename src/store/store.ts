import Vue from 'vue';
import Vuex from 'vuex';
import settings from './settings';
import templates from './templates';
import Notification from '@/models/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    templates,
  },
  state: {
    notifications: [] as Notification[],
  },
  mutations: {
    addNotification(state, notification: Notification) {
      state.notifications.push(notification);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    setNotifications(state, notifications: Notification[]) {
      state.notifications = notifications;
    },
  },
  actions: {

  },
});
