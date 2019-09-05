<template>
  <div class="templates">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notification, { NotificationTypes } from '@/models/notification';

@Component
export default class Templates extends Vue {
  public mounted() {
    // Ensure we have api key already
    if (!this.$store.state.settings.apiKey) {
      const notification = new Notification('Requires an API key', NotificationTypes.Info);
      notification.removeAfter(2000).setDismissable(true);
      this.$store.commit(
        'addNotification',
        notification,
      );
      this.$router.push({
        name: 'home',
      });
    }
  }
}
</script>