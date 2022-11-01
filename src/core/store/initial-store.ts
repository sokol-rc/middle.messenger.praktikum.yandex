import { ChatListItemTransferedType, MessageTransferedType, UserTransferedType } from 'reducers/transferedTypes';

type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: Record<string, string>;
    chats: Record<string, any>;
    loginFormError: string;
    registrationFormError: string;
};

export type ChatsStoreType = {
    chatsList: Array<ChatListItemTransferedType<UserTransferedType>> | null;
    chatsListLoaded: boolean;
	openedDialogId: number;
	dialogs: Array<DialogType>
};

export type UserDisplayNameType = {
    userId: number | null;
    userDisplayName: string | null;
};

export type DayType = {
    id: null | number;
    dayText: string;
    messages: Array<MessageTransferedType>;
};
export type DialogType = {
    chatId: number | null;
	socket: WebSocket | null;
	chatInfoObject: ChatListItemTransferedType<UserTransferedType>
    isSocketReady: boolean;
    messagesLoaded: boolean;
    usersDisplayName: Array<UserDisplayNameType>;
    days: Array<DayType>;
};
const initialStore: InitialStore = {
    isLoading: false,
    currentPage: null,
    user: {},
    chats: {
        chatsList: null,
        chatsListLoaded: false,
		openedDialogId: 0,
        dialogs: [
            {
                chatId: null,
                socket: null,
				isSocketReady: false,
				chatInfoObject: null,
                messagesLoaded: false,
                usersDisplayName: [
                    {
                        userId: null,
                        userDisplayName: null,
                    },
                ],
                days: [
                    {
                        id: null,
                        messages: [],
                    },
                ],
            },
        ],
    },
    loginFormError: '',
    registrationFormError: '',
};

export default initialStore;
