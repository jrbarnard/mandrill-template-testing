import Mandrill from './mandrill';

export interface TemplateApiDatum {
    slug: string;
    name: string;
    code: string;
    created_at: string;
    draft_updated_at: string;
    from_email: string;
    from_name: string;
    labels: string[];
    subject: string;
    text: string;
    publish_name: string;
    publish_code: string;
    publish_from_email: string;
    publish_from_name: string;
    publish_subject: string;
    publish_text: string;
    published_at: string;
    updated_at: string;
}

export interface TemplateContent {
    name: string;
    content: string;
}

export interface TemplateRenderParams {
    template_name: string;
    template_content: TemplateContent[];
    merge_vars: TemplateContent[];
}

export interface TemplateRenderResponse {
    html: string;
}

class Templates {
    private client: Mandrill;

    constructor(client: Mandrill) {
        this.client = client;
    }

    public async list() {
        return this.client.get<TemplateApiDatum[]>('templates/list');
    }

    public async render(params: TemplateRenderParams) {
        return this.client.get<TemplateRenderResponse>('templates/render', params);
    }
}

export default Templates;
