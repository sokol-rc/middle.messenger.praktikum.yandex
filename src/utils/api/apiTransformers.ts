export const transformUser = (data: UserDTO): User => {
    data = JSON.parse(data);

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
export const transformChatsList = (chatsList: any): any => {
	chatsList = JSON.parse(chatsList);
	if (chatsList.length === 0) { 
		return null
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
			const date = new Date(chatList.last_message.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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
		console.log(chatList);
        return rootProperties;
    });

    return transferedChatList;
};
