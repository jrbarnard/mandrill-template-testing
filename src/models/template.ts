export interface TemplateApiDatum {
    slug: string;
    publish_name: string;
    publish_code: string;
}

class Template {
    public static makeFromApi(datum: TemplateApiDatum): Template {
        const template = new Template();

        template.slug = datum.slug;
        template.name = datum.publish_name;
        template.code = datum.publish_code;

        return template;
    }

    public slug: string = '';
    public name: string = '';
    public code: string = '';
    public renderedCode: string = '';
}

export default Template;
