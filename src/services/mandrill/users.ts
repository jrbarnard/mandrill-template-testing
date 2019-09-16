import Mandrill from './mandrill';

class Users {
    private client: Mandrill;

    constructor(client: Mandrill) {
        this.client = client;
    }

    public async ping2() {
        return this.client.post<null>('users/ping2');
    }
}

export default Users;
