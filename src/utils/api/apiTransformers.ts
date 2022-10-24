import { getMessageTimeFromDate } from 'utils/helpers/dateTime';

export const transformUser = (data: UserDTO): User => {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    return {
        id: data.id,
        login: data.login,
        firstName: data.first_name,
        secondName: data.second_name,
        displayName: data.display_name,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
    };
};

export const transformUsers = (dataArray) => {
	if (typeof dataArray === 'string') {
        dataArray = JSON.parse(dataArray);
    }  
    const transfered = dataArray.map((user) => transformUser(user));
    return transfered;
};
export const transformChatsList = (chatsList: any): any => {
    chatsList = JSON.parse(chatsList);
    if (chatsList.length === 0) {
        return null;
    }
    const transferedChatList = chatsList.map((chatList) => {
        const rootProperties = {
            id: chatList.id,
            title: chatList.title,
            avatar: chatList.avatar,
            unreadCount: chatList.unread_count,
            lastMessage: null,
        };

        if (chatList.last_message !== null) {
            const date = getMessageTimeFromDate(chatList.last_message.time);

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
                content: chatList.last_message.content,
            };
            rootProperties.lastMessage = transferedLastMessage;
        }
        return rootProperties;
    });

    return transferedChatList;
};

export const transformMessages = (messages) => {
    const messagesTransfered = messages.map((message) => ({
        ...message,
        chatId: message.chat_id,
        userId: message.user_id,
        isRead: message.is_read,
    }));

    return messagesTransfered;
};
