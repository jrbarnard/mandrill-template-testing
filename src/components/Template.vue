<template>
  <div class="template-render">
    <div class="notification is-info" v-show="!syncedTemplate">
      No template currently loaded
    </div>
    <template v-show="syncedTemplate">
      <div class="options" v-if="syncedTemplate">
        <a href="#" class="button is-info" @click="showSource = !showSource">
          {{ showSource ? 'View' : 'Source' }}
        </a>
        <template v-if="showSource">
          <!-- Minification -->
          <a href="#" class="button is-info" v-if="!unminified" @click="unminify">Unminify</a>
          <a href="#" class="button is-info" v-else @click="minify">Reset</a>
        </template>
      </div>
      <div class="rendered" v-show="!showSource">
        <iframe :srcdoc="code"></iframe>
      </div>
      <div class="source" v-show="showSource" ref="codemirrorTextarea">
        <!-- Codemirror output -->
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import beautify from 'js-beautify';
import TemplateModel from '@/models/template';
import { Component, PropSync, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Template extends Vue {
  @PropSync('template', { type: Object }) private syncedTemplate!: TemplateModel;
  @PropSync('showRendered', { type: Boolean, default: false }) private syncedShowRendered!: boolean;

  private showSource = false;
  private unminified = false;
  private codemirror!: CodeMirror.Editor;

  get code(): string {
    if (!this.syncedTemplate) {
      return '';
    }

    return this.syncedShowRendered ? this.syncedTemplate.renderedCode : this.syncedTemplate.code;
  }

  get raw(): string {
    if (!this.syncedTemplate) {
      return '';
    }

    return this.unminified ? this.syncedTemplate.beautifiedCode : this.syncedTemplate.code;
  }

  public mounted() {
    this.codemirror = CodeMirror(this.$refs.codemirrorTextarea as HTMLTextAreaElement, {
      value: this.raw,
      mode: 'text/html',
      theme: 'monokai',
      lineNumbers: true,
      // lineWrapping: true,
    });
  }

  public unminify() {
    if (this.syncedTemplate.beautifiedCode === '') {
      this.syncedTemplate.beautifiedCode = beautify.html(this.syncedTemplate.code);
    }

    this.unminified = true;
  }

  public minify() {
    this.unminified = false;
  }

  @Watch('raw')
  public updateCodeMirror(raw: string) {
    this.codemirror.setValue(raw);
  }

  @Watch('syncedTemplate.slug')
  public resetOptions() {
    this.showSource = false;
    this.unminified = false;
  }
}
</script>

<style lang="scss">
  .template-render {
    background-color: white;
    padding: 10px;
    height: 100%;
    position: relative;

    .options {
      display: none;
      position: absolute;
      left: 5px;
      top: 5px;
      z-index: 100;

      .button {
        margin-right: 10px;
      }
    }

    &:hover {
      .options {
        display: block;
      }
    }

    .rendered, .source, iframe {
      width: 100%;
      height: 100%;
    }

    .source {
      .CodeMirror {
        height: 100%;
      }
    }
  }
</style>