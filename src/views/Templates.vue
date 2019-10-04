<template>
  <div class="templates">
    <div class="columns">
      <div class="column is-two-fifths has-background-white templates__options">
        <Loading v-if="showLoading"/>
        <div class="templates__choose">
          <div class="field">
            <label for="template" class="label">Template</label>
            <div class="control select">
              <select id="template" v-model="currentTemplate" :disabled="loadingTemplates || rendering">
                <option :value="null">Select a template</option>
                <option
                  v-for="template in templates"
                  :key="template.slug"
                  :value="template"
                >{{ template.name }}</option>
              </select>
            </div>
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
                    :disabled="disableMergeVariables"
                  >
                </div>
                <div class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    v-model="mergeVariable.value"
                    placeholder="Value (e.g Jeff Goldblum)"
                    :disabled="disableMergeVariables"
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
              <a
                v-if="currentTemplate && currentTemplate.renderedCode"
                class="button is-info is-marginless"
                @click="showRendered = false"
                :disabled="rendering"
              >Unrender</a>
              <a class="button is-success is-marginless" @click="renderTemplate" :disabled="rendering">Render</a>
            </div>
          </div>
        </template>
      </div>

      <div class="template column is-three-fifths">
        <Template
          :template="currentTemplate"
          :show-rendered="showRendered"
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
import Mandrill from '@/services/mandrill/mandrill';
import Loading from '@/components/Loading.vue';
import { TemplateApiDatum } from '@/services/mandrill/templates';

interface MergeVariable {
  key: string;
  value: string;
  index: number;
}

@Component({
  components: {
    Template,
    Loading,
  },
})
export default class Templates extends Vue {
  private templates: TemplateModel[] = [];
  private mergeVariables: MergeVariable[] = [];
  private mergeVariableIndex: number = 0;
  private loadingTemplates: boolean = false;
  private showRendered: boolean = false;
  private rendering: boolean = false;

  get currentTemplate(): TemplateModel | null {
    return this.$store.state.templates.currentTemplate;
  }

  set currentTemplate(currentTemplate: TemplateModel | null) {
    this.showRendered = false;

    this.$store.commit('templates/setCurrentTemplate', currentTemplate);

    // Show the sidebar when we select one (hide if not)
    this.$store.commit(currentTemplate ? 'sidebar/show' : 'sidebar/hide');
    this.$store.commit(
      'sidebar/setComponent',
      'sidebar-template-meta',
    );
  }

  get showLoading(): boolean {
    return this.loadingTemplates || this.rendering;
  }

  get disableMergeVariables(): boolean {
    return this.rendering;
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

    this.currentTemplate = null;
    this.loadTemplates();
    this.addMergeVariable();
  }

  public async loadTemplates() {
    this.loadingTemplates = true;
    const client = new Mandrill(this.$store.state.settings.apiKey);

    try {
      const templates = await client.templates().list();

      this.templates = templates.data.map((datum: TemplateApiDatum) => {
        return TemplateModel.makeFromApi(datum);
      });
      this.loadingTemplates = false;
    } catch (error) {
      this.$store.commit(
        'addNotification',
        new Notification(error.message, NotificationTypes.Danger),
      );
      this.loadingTemplates = false;
    }
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

  public async renderTemplate() {
    if (!(this.currentTemplate instanceof TemplateModel)) {
      return;
    }
    this.rendering = true;
    this.showRendered = false;

    const client = new Mandrill(this.$store.state.settings.apiKey);

    try {
      const renderedResponse = await client.templates().render({
        template_name: this.currentTemplate.slug,
        template_content: [{ name: '', content: '' }],
        merge_vars: this.mergeVariables.map((mergeVariable) => {
          return {
            name: mergeVariable.key,
            content: mergeVariable.value,
          };
        }),
      });

      this.showRendered = true;
      this.rendering = false;
      if (!this.currentTemplate) {
        return;
      }
      this.currentTemplate.renderedCode = renderedResponse.data.html;
    } catch (error) {
      this.rendering = false;
      this.$store.commit(
        'addNotification',
        new Notification(error.response.data.message, NotificationTypes.Danger),
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.template {
  padding: 0 0 0 20px;
  // display: flex;
}

.templates {
  height: 100%;

  > .columns {
    height: 100%;
  }

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
