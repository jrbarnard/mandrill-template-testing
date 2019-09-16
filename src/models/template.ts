import { TemplateApiDatum } from '@/services/mandrill/templates';

class Template {
    public static makeFromApi(datum: TemplateApiDatum, draft: boolean = false): Template {
        const template = new Template();
        template.isDraft = draft;

        template.slug = datum.slug;
        template.labels = datum.labels;
        template.createdAt = new Date(datum.created_at);
        template.updatedAt = new Date(datum.updated_at);

        template.name = draft ? datum.name : datum.publish_name;
        template.code = draft ? datum.code : datum.publish_code;
        template.fromEmail = draft ? datum.from_email : datum.publish_from_email;
        template.fromName = draft ? datum.from_name : datum.publish_from_name;
        template.subject = draft ? datum.subject : datum.publish_subject;
        template.text = draft ? datum.text : datum.publish_text;
        template.publishedAt = draft ? null : new Date(datum.published_at);

        // If this isn't the draft then make the draft and set
        if (!draft) {
            template.draft = Template.makeFromApi(datum, true);
        }

        return template;
    }

    // General data
    public slug: string = '';
    public labels: string[] = [];
    public createdAt: Date | null = null;
    public updatedAt: Date | null = null;

    // Template data
    public name: string = '';
    public code: string = '';
    public fromEmail: string = '';
    public fromName: string = '';
    public subject: string = '';
    public text: string = '';
    public publishedAt: Date | null = null;

    // Draft data
    public draft: Template | null = null;

    // Non direct
    public renderedCode: string = '';
    public isDraft: boolean = false;
}

export default Template;
