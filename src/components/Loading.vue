<template>
  <div class="loading">
    <progress class="progress is-small is-primary" max="100">15%</progress>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  // @Prop() private msg!: string;
}
</script>
