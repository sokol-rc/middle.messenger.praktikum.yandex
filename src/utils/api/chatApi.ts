import HTTPTransport, { Options } from './httptransport';

type ChatApiType = {
    apiUrl: string;
    headers: Record<string, string>;
    getChats: (options: Options) => Promise<any>;
    createChat: (options: Options) => Promise<any>;
    getTokenMessages: (options: Options) => Promise<any>;
    deleteChat: (options: Options) => Promise<any>;
    addUserToChat: (options: Options) => Promise<any>;
    getAllUsersInChat: (chatId: number) => Promise<any>;
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
    deleteChat(options: Options) {
        return HTTPTransport.delete(`${this.apiUrl}chats`, {
            credentials: true,
			headers: this.headers,
			...options,
        });
    },
    getTokenMessages(chatId: number) {
        return HTTPTransport.post(`${this.apiUrl}chats/token/${chatId}`, {
            headers: this.headers,
        });
	},
	getAllUsersInChat(chatId: number) {
		return HTTPTransport.get(`${this.apiUrl}chats/${chatId}/users`, {
			headers: this.headers,
		});
	},
	addUserToChat(options: Options) {
		return HTTPTransport.put(`${this.apiUrl}chats/users`, {
			credentials: true,
			headers: this.headers,
			...options
		});
	}
};

export default ChatApi;
