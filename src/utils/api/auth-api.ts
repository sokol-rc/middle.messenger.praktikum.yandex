import HTTPTransport, { Options } from './httptransport';

type AuthApi = {
	apiUrl: string;
	headers: Record<string, string>;
    signin: (options: Options) => Promise<any>;
    signup: (options: Options) => Promise<any>;
    logout: () => Promise<any>;
    user: () => Promise<any>;
};

const AuthApi: AuthApi = {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
    headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
    signin(options: Options) {
		return HTTPTransport.post(`${this.apiUrl}auth/signin`, {credentials: true, headers: this.headers ,...options});
    },
    signup(options: Options) {
        return HTTPTransport.post(`${this.apiUrl}auth/signup`, {headers: this.headers ,...options});
    },
    logout() {
        return HTTPTransport.post(`${this.apiUrl}auth/logout`);
    },
    user() {
		return HTTPTransport.get(`${this.apiUrl}auth/user`);
    },
};

export default AuthApi;
