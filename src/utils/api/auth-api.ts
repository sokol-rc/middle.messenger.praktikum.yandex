import HTTPTransport, { Options } from './httptransport';
import {
    DefaultType,
    HTTPTransportResponseType,
    UserApiType,
} from './apiTypes';

type AuthApiType = {
    apiUrl: string;
    headers: Record<string, string>;
    signin: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    signup: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    logout: () => Promise<any>;
    user: () => Promise<HTTPTransportResponseType<UserApiType>>;
};

const AuthApi: AuthApiType = {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    async signin(options: Options) {
        const response = await HTTPTransport.post<DefaultType>(
            `${this.apiUrl}auth/signin`,
            { headers: this.headers, ...options }
        );
        return response;
    },
    async signup(options: Options) {
        const response = await HTTPTransport.post<DefaultType>(
            `${this.apiUrl}auth/signup`,
            { headers: this.headers, ...options }
        );
        return response;
    },
    logout() {
        return HTTPTransport.post(`${this.apiUrl}auth/logout`);
    },
    async user() {
        const response = await HTTPTransport.get<UserApiType>(
            `${this.apiUrl}auth/user`
        );

        return response;
    },
};

export default AuthApi;
