export type UserTransferedType = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

export type MessageType = {
    id: number;
    time: string;
    user_id: number;
    is_read: boolean;
    chat_id: number;
    content: string;
    type: 'message';
};
export type MessageTransferedType = {
    id: number;
    chatId: number;
    userId: number;
    isRead: boolean;
    time: string;
    user_id: number;
    content: string;
    type: 'message';
};

export type LastMessage<U = any> = {
        user: Partial<U>;
        time: string;
        content: string;
}
export type ChatListItemTransferedType<U> = {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    lastMessage: LastMessage<U> | unknown;
};
