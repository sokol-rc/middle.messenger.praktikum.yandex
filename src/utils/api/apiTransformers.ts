import {
    ChatListItemTransferedType,
    MessageTransferedType,
    MessageType,
    UserTransferedType,
} from 'reducers/transferedTypes';
import { getMessageTimeFromDate } from 'utils/helpers/dateTime';
import { antiXSS } from 'utils/helpers/defenders';
import { ChatListItemApiType, UserType } from './apiTypes';

export const transformUser = (data: UserType): UserTransferedType => ({
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
});

export const transformUsers = (dataArray: Array<UserType>) => {
    const transfered = dataArray.map((user) => transformUser(user));
    return transfered;
};

export const transformChatsList = (
    chatsList: Array<ChatListItemApiType>
): Array<ChatListItemTransferedType<UserTransferedType>> | null => {
    if (chatsList.length === 0) {
        return null;
    }
    const transferedChatList = chatsList.map((chatList) => {
        const rootProperties = {
            id: chatList.id,
            title: chatList.title,
            avatar: chatList.avatar,
            unreadCount: chatList.unread_count,
            lastMessage: null as unknown,
        };

        if (chatList.last_message !== null) {
            const date = getMessageTimeFromDate(chatList.last_message.time);
            const lastMessageContent = antiXSS(chatList.last_message.content);

            const transferedLastMessage = {
                user: {
                    firstName: chatList.last_message.user.first_name,
                    secondName: chatList.last_message.user.second_name,
                    avatar: chatList.last_message.user.avatar,
                    email: chatList.last_message.user.email,
                    login: chatList.last_message.user.login,
                    phone: chatList.last_message.user.phone,
                },
                time: date,
                content: lastMessageContent,
            };

            rootProperties.lastMessage = transferedLastMessage;
        }
        return rootProperties;
    });

    return transferedChatList;
};

export const transformMessages = (
    messages: Array<MessageType>
): Array<MessageTransferedType> => {
    const messagesTransfered = messages.map((message) => ({
        ...message,
        chatId: message.chat_id,
        userId: message.user_id,
        isRead: message.is_read,
        content: antiXSS(message.content),
    }));

    return messagesTransfered;
};
