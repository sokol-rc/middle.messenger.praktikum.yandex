import {
    DefaultType,
    HTTPTransportResponseType,
    UserProfileApiType,
} from './apiTypes';
import HTTPTransport, { Options } from './httptransport';

type UserApiType = {
    apiUrl: string;
    headers: Record<string, string>;
    saveProfile: (
        options: Options
    ) => Promise<HTTPTransportResponseType<UserProfileApiType>>;
    saveProfileAvatar: (
        options: Options
    ) => Promise<HTTPTransportResponseType<UserProfileApiType>>;
    savePassword: (options: Options) => Promise<HTTPTransportResponseType<DefaultType>>;
};

const UserApi: UserApiType = {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    async saveProfile(options: Options) {
        const response = await HTTPTransport.post<UserProfileApiType>(
            `${this.apiUrl}user/profile`,
            { headers: this.headers, ...options }
        );
        return response;
    },
    async saveProfileAvatar(options: Options) {
        const response = await HTTPTransport.put<UserProfileApiType>(
            `${this.apiUrl}user/profile/avatar`,
            { headers: { accept: 'application/json' }, ...options }
        );
        return response;
    },
    async savePassword(options: Options) {
        const response = await HTTPTransport.post<DefaultType>(
            `${this.apiUrl}user/password`, { headers: { accept: 'application/json' }, ...options }
        );
        return response;
    },
};

export default UserApi;
