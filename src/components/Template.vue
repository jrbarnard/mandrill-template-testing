<template>
  <div class="template-render">
    <div class="notification is-info" v-if="!syncedTemplate">
      No template currently loaded
    </div>
    <iframe :srcdoc="code" v-else></iframe>
  </div>
</template>

<script lang="ts">
import TemplateModel from '@/models/template';
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class Template extends Vue {
  @PropSync('template', { type: Object }) private syncedTemplate!: TemplateModel;
  @PropSync('showRendered', { type: Boolean, default: false }) private syncedShowRendered!: boolean;

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

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>