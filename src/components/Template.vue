<template>
  <div>
    Hello I am a template
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Template extends Vue {
  // @Prop() private msg!: string;
}
</script>
