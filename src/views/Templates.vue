<template>
  <div class="templates">
    <div class="columns">
      <div class="column is-two-fifths has-background-white templates__options">
        <div class="templates__choose">
          <div class="field">
            <label for="template" class="label">Template</label>
            <div class="control select">
              <select id="template" v-model="currentTemplate">
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
        </div>
        
        <template v-if="currentTemplate">
          <hr>

          <div class="templates__merge-variables">
            <p class="label">Merge variables</p>
            <ul
              v-for="(mergeVariable, index) in mergeVariables"
              :key="mergeVariable.index"
            >
              <li class="field has-addons">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="mergeVariable.key"
                    placeholder="Key (e.g USER_NAME)"
                  >
                </div>
                <div class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    v-model="mergeVariable.value"
                    placeholder="Value (e.g Jeff Goldblum)"
                  >
                </div>
                <div class="control">
                  <a
                    class="button is-danger"
                    :disabled="index === 0 && mergeVariables.length < 2"
                    @click="removeMergeVariable(mergeVariable)"
                  >-</a>
                </div>
              </li>
            </ul>
            <div class="buttons is-right">
              <a class="button is-success is-marginless" @click="addMergeVariable">Add +</a>
            </div>
          </div>

          <hr>

          <div class="">
            <div class="buttons is-right">
              <a class="button is-success is-marginless" @click="renderTemplate">Render</a>
            </div>
          </div>
        </template>
      </div>

      <div class="template column">
        <Template
          :template="currentTemplate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notification, { NotificationTypes } from '@/models/notification';
import Template from '@/components/Template.vue';
import TemplateModel from '@/models/template';
import mandrill from 'mandrill-api';

interface MergeVariable {
  key: string;
  value: string;
  index: number;
}

@Component({
  components: {
    Template,
  },
})
export default class Templates extends Vue {
  private templates: TemplateModel[] = [];
  private mergeVariables: MergeVariable[] = [];
  private mergeVariableIndex: number = 0;
  private loading: boolean = false;

  get currentTemplate(): TemplateModel | null {
    return this.$store.state.templates.currentTemplate;
  }

  set currentTemplate(currentTemplate: TemplateModel | null) {
    this.$store.commit('templates/setCurrentTemplate', currentTemplate);
  }

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

    this.loadTemplates();

    // TODO:
    // Get templates and store
    // Faking at the moment for testing
    this.templates = [
      TemplateModel.makeFromApi({
        slug: 'test-slug',
        publish_name: 'Hello there',
        publish_code: '<h1>Some content!!</h1>',
      }),
      TemplateModel.makeFromApi({
        slug: 'test-slug-again',
        publish_name: 'Hello there also',
        publish_code: '<h1>Some other content!!</h1>',
      }),
    ];

    this.addMergeVariable();
  }

  public loadTemplates() {
    this.loading = true;
    const client = new mandrill.Mandrill(this.$store.state.settings.apiKey);

    client.templates.list({}, (response) => {
      this.loading = false;
      console.log(response);
      // TODO: Sort, issue with types
      this.templates = response.data.map((datum) => {
        return TemplateModel.makeFromApi(datum);
      })
    }, (response: any) => {
      this.$store.commit(
        'addNotification',
        new Notification(response.message, NotificationTypes.Danger)
      );
      this.loading = false;
    });
  }

  public addMergeVariable() {
    this.mergeVariables.push({
      key: '',
      value: '',
      index: this.mergeVariableIndex + 1,
    });

    this.mergeVariableIndex++;
  }

  public removeMergeVariable(mergeVariableToRemove: MergeVariable) {
    this.mergeVariables = this.mergeVariables.filter((mergeVariable: MergeVariable) => {
      return mergeVariableToRemove.index !== mergeVariable.index;
    });
  }

  public renderTemplate() {
    //
  }
}
</script>

<style lang="scss" scoped>
.template {
  padding: 0 0 0 20px;
}

.templates {
  &__options {
    padding-bottom: 20px;
  }

  &__choose {
    .select,
    select {
      width: 100%;
    }
  }

  &__merge-variables {
    margin-bottom: 10px;
    ul {
      margin-bottom: 10px;
    }
  }
}
</style>
