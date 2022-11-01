import {
    ChatListApiType,
    CreateChatApiType,
    DefaultType,
    HTTPTransportResponseType,
    TokenApiType,
    UsersApiType,
} from './apiTypes';
import { BASE_URL } from './auth-api';
import HTTPTransport, { Options } from './httptransport';

type ChatApiType = {
    apiUrl: string;
    getChats: (
        options: Options
    ) => Promise<HTTPTransportResponseType<ChatListApiType>>;
    createChat: (
        options: Options
    ) => Promise<HTTPTransportResponseType<CreateChatApiType>>;
    getTokenMessages: (
        chatId: number
    ) => Promise<HTTPTransportResponseType<TokenApiType>>;
    deleteChat: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    addUserToChat: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    getAllUsersInChat: (
        chatId: number
    ) => Promise<HTTPTransportResponseType<UsersApiType>>;
};

const ChatApi: ChatApiType = {
    apiUrl: BASE_URL,

    async getChats(options) {
        const response = await HTTPTransport.get<ChatListApiType>(
            `${this.apiUrl}chats`,
            {
                ...options,
            }
        );
        return response;
    },
    createChat(options) {
        return HTTPTransport.post<CreateChatApiType>(`${this.apiUrl}chats`, {
            ...options,
        });
    },
    async deleteChat(options) {
        const response = await HTTPTransport.delete<DefaultType>(
            `${this.apiUrl}chats`,
            {
                ...options,
            }
        );
        return response;
    },
    getTokenMessages(chatId) {
        const response = HTTPTransport.post<TokenApiType>(
            `${this.apiUrl}chats/token/${chatId}`
        );
        return response;
    },
    async getAllUsersInChat(chatId) {
        const response = await HTTPTransport.get<UsersApiType>(
            `${this.apiUrl}chats/${chatId}/users`
        );
        return response;
    },
    async addUserToChat(options) {
        const response = await HTTPTransport.put<DefaultType>(
            `${this.apiUrl}chats/users`,
            {
                ...options,
            }
        );
        return response;
    },
};

export default ChatApi;
