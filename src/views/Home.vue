<template>
  <div class="columns is-centered">

    <div class="column is-two-fifths">
      <div class="card has-card-header-background">
        <header class="card-header">
          <h2 class="card-header-title">Settings</h2>
        </header>
        <div class="card-content">
          <template>
            <Notifications
              ref="notifications"
            />
            <div class="field">
              <label for="api-key" class="label">Your Api Key</label>
              <div class="control">
                <input
                  id="api-key"
                  class="input"
                  type="text"
                  placeholder="Api Key"
                  v-model="apiKey"
                >
              </div>
              <!-- <p class="help is-danger" v-if="!apiKey">Please fill in this field.</p> -->
            </div>
            
            <hr>

            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{'is-loading': this.submitting}"
                  @click="submit"
                  :disabled="!apiKey || this.submitting"
                >Continue</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mandrill from 'mandrill-api';
import Notification, { NotificationTypes } from '@/models/notification';
import Notifications from '@/components/Notifications.vue';
import { setTimeout } from 'timers';

@Component({
  components: {
    Notifications,
  },
})
export default class Home extends Vue {
  private submitting: boolean = false;

  get apiKey(): string {
    return this.$store.state.settings.apiKey;
  }

  set apiKey(apiKey: string) {
    this.$store.commit('settings/setApiKey', apiKey);
  }

  get notificationRef() {
    return this.$refs.notifications as {
      [k: string]: any;
    };
  }

  public submit() {
    this.submitting = true;
    this.notificationRef.clearNotifications();
    const client = new mandrill.Mandrill(this.apiKey);

    this.notificationRef.addNotification(new Notification('Successfully set API Key', NotificationTypes.Success));
    setTimeout(() => {
      this.$router.push({
        name: 'templates',
      });
      this.submitting = false;
    }, 1000);

    // client.users.ping2({}, (response) => {
    //   this.notificationRef.addNotification(new Notification('Successfully set API Key', NotificationTypes.Success));
    //   this.submitting = false;
    // }, (response: any) => {
    //   this.notificationRef.addNotification(new Notification(response.message, NotificationTypes.Danger));
    //   this.submitting = false;

    //   setTimeout(() => {
    //     this.$router.push({
    //       name: 'templates',
    //     });
    //   }, 500);
    // });
  }
}
</script>
