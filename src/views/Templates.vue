<template>
  <div class="templates">
    <div class="columns">
      <div class="column is-one-quarter has-background-white">
        <div class="field">
          <label for="template" class="label">Template</label>
          <div class="control select">
            <select id="template" class="select">
              <option :value="null">Select a template</option>
              <option
                v-for="template in templates"
                :key="template.slug"
                :value="template"
              >{{ template.name }}</option>
            </select>
          </div>
          <!-- <p class="help is-danger" v-if="!apiKey">Please fill in this field.</p> -->
        </div>
        
        <hr>

        <div class="merge-variables">
          <p class="label">Merge variables <a href="#" @click="addMergeVariable">Add +</a></p>
          <div
            v-for="(mergeVariable, index) in mergeVariables"
            :key="mergeVariable.key"
          >
            <div class="columns">
              <div class="column is-half field">
                <label :for="index + '-key'">Key</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    :id="index + '-key'"
                    :value="mergeVariable.key"
                    @input="(key) => mergeVariable.key = key"
                  >
                </div>
              </div>
              <div class="column is-half field">
                <label :for="index + '-value'">Value</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    :id="index + '-value'"
                    :value="mergeVariable.value"
                    @input="(value) => mergeVariable.value = value"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="template column is-three-quarters">
        <Template/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notification, { NotificationTypes } from '@/models/notification';
import Template from '@/components/Template.vue';
import TemplateModel from '@/models/template';
import { mkdir } from 'fs';

interface MergeVariable {
  key: string;
  value: string;
}

@Component({
  components: {
    Template,
  },
})
export default class Templates extends Vue {
  private templates: TemplateModel[] = [];
  private mergeVariables: MergeVariable[] = [];

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
      return;
    }

    // TODO:
    // Get templates and store
    // Faking at the moment for testing
    this.templates = [
      TemplateModel.makeFromApi({
        slug: 'test-slug',
        publish_name: 'Hello there',
        publish_code: '<h1>Some content!!</h1>'
      }),
      TemplateModel.makeFromApi({
        slug: 'test-slug-again',
        publish_name: 'Hello there also',
        publish_code: '<h1>Some other content!!</h1>'
      }),
    ];

    this.addMergeVariable();
  }

  public addMergeVariable() {
    this.mergeVariables.push({
      key: '',
      value: '',
    });
  }
}
</script>

<style lang="scss" scoped>
.template {
  padding: 0 0 0 20px;
}
</style>
