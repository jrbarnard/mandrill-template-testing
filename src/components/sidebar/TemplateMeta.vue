<template>
    <div>
        <p><strong>Name: </strong>{{ currentTemplate.name }}</p>
        <p><strong>Slug: </strong>{{ currentTemplate.slug }}</p>
        <p><strong>From name: </strong>{{ currentTemplate.fromName }}</p>
        <p><strong>From email: </strong>{{ currentTemplate.fromEmail }}</p>

        <template v-if="currentTemplate.labels.length">
            <hr>
            <p><strong>Labels:</strong></p>
            <ul>
                <li
                    v-for="label in currentTemplate.labels"
                    :key="label"
                >{{ label }}</li>
            </ul>
        </template>

        <hr>
        <p><strong>Created at: </strong>{{ formattedDate(currentTemplate.createdAt) }}</p>
        <p><strong>Updated at: </strong>{{ formattedDate(currentTemplate.updatedAt) }}</p>
        <p><strong>Published at: </strong>{{ formattedDate(currentTemplate.publishedAt) }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TemplateModel from '@/models/template';

@Component
export default class TemplateMeta extends Vue {
    get currentTemplate(): TemplateModel {
        return this.$store.state.templates.currentTemplate;
    }

    public formattedDate(date: Date | null): string {
        if (!(date instanceof Date)) {
            return '';
        }

        return date.toString(); // TODO: Improve
    }
}
</script>
