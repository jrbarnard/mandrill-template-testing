import Templates from './templates';
import axios, { AxiosResponse } from 'axios';
import Users from './users';

interface Params {
    [k: string]: any;
}

class Mandrill {
    private apiKey: string;
    private root: string = 'https://mandrillapp.com/api/1.0/';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async get<T>(path: string, params: Params = {}): Promise<AxiosResponse<T>> {
        const mergedParams = Object.assign({}, params, {
            key: this.apiKey,
        });

        return axios.get<T>(this.root + '/' + path, {
            params: mergedParams,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public templates(): Templates {
        return new Templates(this);
    }

    public users(): Users {
        return new Users(this);
    }
}

export default Mandrill;
