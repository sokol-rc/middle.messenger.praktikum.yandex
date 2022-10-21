import HTTPTransport, { Options } from './httptransport';

type ChatApiType = {
    apiUrl: string;
    headers: Record<string, string>;
    getChats: (options: Options) => Promise<any>;
    createChat: (options: Options) => Promise<any>;
    getTokenMessages: (options: Options) => Promise<any>;
    deleteChat: () => Promise<any>;
};

const ChatApi: ChatApiType = {
    apiUrl: 'https://ya-praktikum.tech/api/v2/',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },

    getChats(options: Options) {
        return HTTPTransport.get(`${this.apiUrl}chats`, {
            credentials: true,
            headers: this.headers,
            ...options,
        });
    },
    createChat(options: Options) {
        return HTTPTransport.post(`${this.apiUrl}chats`, {
            credentials: true,
            headers: this.headers,
            ...options,
        });
    },
    deleteChat() {
        return HTTPTransport.delete(`${this.apiUrl}chats`, {
            credentials: true,
            headers: this.headers,
        });
    },
    getTokenMessages(path: string) {
        return HTTPTransport.post(`${this.apiUrl}chats/token/${path}`, {
            headers: this.headers,
        });
    },
    // signin(options: Options) {
    // 	return HTTPTransport.post(`${this.apiUrl}auth/signin`, {credentials: true, headers: this.headers ,...options});
    // },
    // signup(options: Options) {
    //     return HTTPTransport.post(`${this.apiUrl}auth/signup`, {headers: this.headers ,...options});
    // },
    // logout() {
    //     return HTTPTransport.post(`${this.apiUrl}auth/logout`);
    // },
    // user() {
    // 	return HTTPTransport.get(`${this.apiUrl}auth/user`);
    // },
};

export default ChatApi;
