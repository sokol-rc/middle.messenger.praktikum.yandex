import HTTPTransport, { Options } from './httptransport';

type UserApiType = {
	apiUrl: string;
	headers: Record<string, string>;
    saveProfile: (options: Options) => Promise<any>;
    saveProfileAvatar: (options: Options) => Promise<any>;
    savePassword: (options: Options) => Promise<any>;
};

const UserApi: UserApiType = {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
    headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
    saveProfile(options: Options) {
		return HTTPTransport.post(`${this.apiUrl}user/profile`, {credentials: true, headers: this.headers ,...options});
    },
    saveProfileAvatar(options: Options) {
		return HTTPTransport.put(`${this.apiUrl}user/profile/avatar`, { headers: { 'accept': 'application/json' } ,...options});
    },
    savePassword() {
        return HTTPTransport.post(`${this.apiUrl}user/password`);
    },
};

export default UserApi;
