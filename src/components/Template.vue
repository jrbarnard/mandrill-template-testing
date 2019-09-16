<template>
  <div class="template-render">
    <div class="notification is-info" v-if="!syncedTemplate">
      No template currently loaded
    </div>
    <template v-else>
      <div class="options">
        <a href="#" @click="showSource = false">Rendered</a>
        <a href="#" @click="showSource = true">Source</a>
      </div>
      <div class="rendered" v-if="!showSource">
        <iframe :srcdoc="code"></iframe>
      </div>
      <div class="source" v-else>
        {{ code }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import TemplateModel from '@/models/template';
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class Template extends Vue {
  @PropSync('template', { type: Object }) private syncedTemplate!: TemplateModel;
  @PropSync('showRendered', { type: Boolean, default: false }) private syncedShowRendered!: boolean;

  private showSource = false;

  get code(): string {
    return this.syncedShowRendered ? this.syncedTemplate.renderedCode : this.syncedTemplate.code;
  }
}
</script>

<style lang="scss">
  .template-render {
    background-color: white;
    padding: 10px;
    height: 100%;

    .options {
      
    }

    .rendered, .source, iframe {
      width: 100%;
      height: 100%;
    }

    .source {
      overflow-y: auto;
    }
  }
</style>