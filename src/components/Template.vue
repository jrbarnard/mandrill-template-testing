<template>
  <div>
    <div class="notification is-info" v-if="!syncedTemplate">
      No template currently loaded
    </div>
    <iframe :srcdoc="syncedTemplate.code" v-else></iframe>
  </div>
</template>

<script lang="ts">
import TemplateModel from '@/models/template';
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class Template extends Vue {
  @PropSync('template', { type: Object }) private syncedTemplate!: TemplateModel;
}
</script>
