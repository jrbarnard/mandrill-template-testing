export interface TemplateApiDatum {
    slug: string;
    publish_name: string;
    publish_code: string;
};

class Template {
    public slug: string = '';
    public name: string = '';
    public code: string = '';

    public static makeFromApi(datum: TemplateApiDatum): Template {
        let template = new Template();

        template.slug = datum.slug;
        template.name = datum.publish_name;
        template.code = datum.publish_code;

        return template;
    }
}

export default Template;