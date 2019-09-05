<template>
  <div class="notifications">
    <div
      class="notification"
      v-for="notification in notifications"
      :key="notification.getContent()"
      :class="getClasses(notification)"
    >
      <button
        class="delete"
        @click="removeNotification(notification)"
        v-if="notification.isDissmissable()"
      ></button>
      {{ notification.getContent() }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from 'vue-property-decorator';
import Notification from '@/models/notification';
import { setInterval } from 'timers';

@Component
export default class Notifications extends Vue {
  private notifications: Notification[] = [];
  @PropSync('propNotifications', { type: Array }) private syncedNotifications!: Notification[];

  public getClasses(notification: Notification) {
    const classes = {} as {
      [key: string]: boolean,
    };

    classes[notification.getTypeClass()] = true;

    return classes;
  }

  public addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.syncedNotifications = this.notifications;
  }

  public clearNotifications() {
    this.notifications = this.syncedNotifications = [];
  }

  public removeNotification(notification: Notification) {
    this.notifications = this.syncedNotifications = this.notifications.filter((setNotification: Notification) => {
      return setNotification.getContent() !== notification.getContent();
    });
  }

  @Watch('propNotifications')
  onPropNotificationsChange(value: Notification[], oldValue: Notification[]) {
    this.notifications = value;
  }

  @Watch('notifications')
  onNotificationsChange(value: Notification[], oldValue: Notification[]) {
    let diff = value.filter((datum) => !oldValue.includes(datum));
    
    diff.forEach((notification: Notification) => {
      if (notification.removeAfterCount) {
        setTimeout(() => {
          this.removeNotification(notification);
        }, notification.removeAfterCount);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  .notifications {
    margin-bottom: 20px;
  }
</style>
