import { UserProfileType } from 'reducers/thunkTypes';

export type HTTPTransportResponseType<T = any> = {
    data: T;
    status: number;
};
export enum ResponseCode {
    success = 200,
}
export type BadRequestType = {
	reason: string;
};

export type UserType = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};
export type UserApiType = UserType | BadRequestType;
export type UsersApiType = Array<UserType> | BadRequestType;

export type DefaultType = string | BadRequestType;

export type UserProfileApiType = UserProfileType | BadRequestType;

export type ChatListItemApiType = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
};

export type ChatListApiType = Array<ChatListItemApiType> | BadRequestType;

export type CreateChatApiType = { id: number } | BadRequestType;

export type AddUsersType = {
    users: Array<number>;
    chatId: number;
};

export type TokenApiType = {token: string} | BadRequestType
