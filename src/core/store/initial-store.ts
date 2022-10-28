import { Message, MessageType } from "reducers/transferedTypes";

type InitialStore = {
    isLoading: boolean;
    currentPage: null;
    user: Record<string, string>;
    chats: Record<string, any>;
    loginFormError: string;
    registrationFormError: string;
};

export type ChatsStoreType = {
    chatsList: any;
    chatsListLoaded: boolean;
    openedDialogId: number;
};

export type UserDisplayNameType = {
    userId: number | null;
    userDisplayName: string | null;
};

export type DayType = {
	id: null;
	messages: Array<MessageType>;
}
export type DialogType = {
    chatId: number | null;
    socket: any;
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
        openedDialogId: 430,
        dialogs: [
            {
                chatId: null,
                socket: null,
                isSocketReady: false,
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
