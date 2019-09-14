<template>
  <div id="app">
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-brand">
          <router-link
            to="/"
            class="navbar-item brand-text"
          >Mandrill Templates</router-link>
          <!-- <div class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div> -->
        </div>
        <!-- <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <router-link
              to="/"
              class="navbar-item"
            >Home</router-link>
          </div>
        </div> -->
      </div>
    </nav>
    <div class="main container">
      <Notifications
        v-show="notifications.length"
        :prop-notifications="notifications"
        v-on:update:propNotifications="updateNotifications"
      />
      <router-view/>
    </div>
    <Sidebar
      v-if="showSidebar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notifications from '@/components/Notifications.vue';
import Notification from '@/models/notification';
import Sidebar from '@/components/Sidebar.vue';

@Component({
  components: {
    Notifications,
    Sidebar,
  },
})
export default class App extends Vue {
  get notifications(): Notification[] {
    return this.$store.state.notifications;
  }

  get showSidebar(): boolean {
    return this.$store.state.sidebar.show;
  }

  public updateNotifications(notifications: Notification[]) {
    this.$store.commit('setNotifications', notifications);
  }
}
</script>