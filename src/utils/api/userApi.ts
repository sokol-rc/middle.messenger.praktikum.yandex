import {
    DefaultType,
    HTTPTransportResponseType,
    UserProfileApiType,
} from './apiTypes';
import { BASE_URL } from './auth-api';
import HTTPTransport, { Options } from './httptransport';

type UserApiType = {
    apiUrl: string;
    saveProfile: (
        options: Options
    ) => Promise<HTTPTransportResponseType<UserProfileApiType>>;
    saveProfileAvatar: (
        options: Options
    ) => Promise<HTTPTransportResponseType<UserProfileApiType>>;
    savePassword: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
};

const UserApi: UserApiType = {
    apiUrl: BASE_URL,
    async saveProfile(options) {
        const response = await HTTPTransport.put<UserProfileApiType>(
            `${this.apiUrl}user/profile`,
            { ...options }
        );
        return response;
    },
    async saveProfileAvatar(options) {
        const response = await HTTPTransport.put<UserProfileApiType>(
            `${this.apiUrl}user/profile/avatar`,
            { headers: { accept: 'application/json' }, ...options }
        );
        return response;
    },
    async savePassword(options) {
        const response = await HTTPTransport.put<DefaultType>(
            `${this.apiUrl}user/password`,
            { headers: { accept: 'application/json' }, ...options }
        );
        return response;
    },
};

export default UserApi;
