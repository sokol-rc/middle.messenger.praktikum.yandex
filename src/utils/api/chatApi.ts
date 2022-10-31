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
    headers: Record<string, string>;
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
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },

    async getChats(options: Options) {
        const response = await HTTPTransport.get<ChatListApiType>(
            `${this.apiUrl}chats`,
            {
                credentials: true,
                headers: this.headers,
                ...options,
            }
        );
        return response;
    },
    createChat(options: Options) {
        return HTTPTransport.post<CreateChatApiType>(`${this.apiUrl}chats`, {
            credentials: true,
            headers: this.headers,
            ...options,
        });
    },
    async deleteChat(options: Options) {
        const response = await HTTPTransport.delete<DefaultType>(
            `${this.apiUrl}chats`,
            {
                credentials: true,
                headers: this.headers,
                ...options,
            }
        );
        return response;
    },
    getTokenMessages(chatId: number) {
        const response = HTTPTransport.post<TokenApiType>(
            `${this.apiUrl}chats/token/${chatId}`,
            {
                headers: this.headers,
            }
        );
        return response;
    },
    async getAllUsersInChat(chatId: number) {
        const response = await HTTPTransport.get<UsersApiType>(
            `${this.apiUrl}chats/${chatId}/users`,
            {
                headers: this.headers,
            }
        );
        return response;
    },
    async addUserToChat(options: Options) {
        const response = await HTTPTransport.put<DefaultType>(
            `${this.apiUrl}chats/users`,
            {
                credentials: true,
                headers: this.headers,
                ...options,
            }
        );
        return response;
    },
};

export default ChatApi;
