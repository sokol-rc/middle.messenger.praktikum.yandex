import initialStore, { DialogType } from 'core/store/initial-store';
import { RootStateType } from 'index';
import { RegistrationData } from 'pages/registration/registration';
import { deleteAuthCookie, setAuthCookie } from 'services/cookie';
import {
    transformChatsList,
    transformMessages,
    transformUser,
    transformUsers,
} from 'utils/api/apiTransformers';
import AuthApi from 'utils/api/auth-api';
import ChatApi from 'utils/api/chatApi';
import UserApi from 'utils/api/userApi';
import cloneDeep from 'utils/helpers/cloneDeep';
import {
    getDayById,
    getDayId,
    getDayTextFromDate,
} from 'utils/helpers/dateTime';
import searchInObject from 'utils/helpers/isContain';
import isEmpty from 'utils/helpers/isEmpty';
import { isMessageInDialog } from 'utils/helpers/messageTools';
import { apiHasErrors } from 'utils/typeGuards/typeGuards';
import {
    ChangePasswordType,
    LoginDataType,
    SendMessageType,
    UserProfileType,
} from './thunkTypes';
import {
    ChatListItemTransferedType,
    MessageTransferedType,
    MessageType,
    UserTransferedType,
} from './transferedTypes';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsType<
    T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesType<T>>;
export type ActionsTypes = InferActionsType<typeof actions>;

export type RootReducerType = (
    state: RootStateType,
    action: ActionsTypes
) => RootStateType;

export const authReducer: RootReducerType = (state, action) => {
    const stateCopy = cloneDeep(state);

    switch (action.type) {
        case 'ENABLE_LOADER':
            stateCopy.isLoading = true;
            return stateCopy;
        case 'DISABLE_LOADER':
            stateCopy.isLoading = false;
            return stateCopy;
        case 'SET_LOGIN_FORM_ERROR':
            stateCopy.loginFormError = action.loginFormError;
            return stateCopy;
        case 'SET_INITIAL_STATE':
            return initialStore;
        case 'SET_REGISTRATION_FORM_ERROR':
            stateCopy.registrationFormError = action.registrationFormError;
            return stateCopy;
        case 'SET_USER':
            stateCopy.user = action.userTransferedObject;
            return stateCopy;
        case 'SET_CHATS_LIST':
            stateCopy.chats.chatsList = action.chatsList;
            if (isEmpty(stateCopy.chats.chatsList)) {
                return stateCopy;
            }
            stateCopy.chats.openedDialogId = action.chatsList[0].id;
            stateCopy.chats.chatsList.forEach(
                (list: ChatListItemTransferedType<UserTransferedType>) => {
                    if (
                        !searchInObject(
                            list.id,
                            'chatId',
                            stateCopy.chats.dialogs
                        )
                    ) {
                        stateCopy.chats.dialogs.push({
                            chatId: list.id,
                            chatInfoObject: list,
                            socket: null,
                            isSocketReady: false,
                            days: [],
                        });
                    }
                }
            );
            stateCopy.chats.chatsListLoaded = true;
            return stateCopy;
        case 'SET_SOCKET':
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map(
                (dialog: DialogType) => {
                    if (
                        dialog.chatId === action.chatId &&
                        dialog.socket === null
                    ) {
                        dialog.socket = action.socket;
                    }
                    return dialog;
                }
            );

            return stateCopy;
        case 'SET_SOCKET_READY':
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map(
                (dialog: DialogType) => {
                    if (dialog.chatId === action.chatId) {
                        dialog.isSocketReady = action.ready;
                    }
                    return dialog;
                }
            );
            return stateCopy;
        case 'SET_MESSAGES':
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map(
                (dialog: DialogType) => {
                    if (action.messages[0].chatId === dialog.chatId) {
                        action.messages.reverse().forEach((outsideMessage) => {
                            if (!isMessageInDialog(outsideMessage, dialog)) {
                                const dayId = getDayId(outsideMessage.time);
                                const currentDay = getDayById(
                                    dayId,
                                    dialog.days
                                );
                                const dayText = getDayTextFromDate(
                                    outsideMessage.time
                                );

                                if (currentDay === null) {
                                    dialog.days.push({
                                        id: dayId,
                                        dayText,
                                        messages: [outsideMessage],
                                    });
                                } else {
                                    currentDay.messages.push(outsideMessage);
                                }
                            }
                        });
                        dialog.days = dialog.days.sort((a, b) => {
                            if (a.id !== null && b.id !== null) {
                                return a.id - b.id;
                            }
                            return 0;
                        });
                        dialog.messagesLoaded = true;
                    }
                    return dialog;
                }
            );
            return stateCopy;
        case 'SET_USERS_DISPLAY_NAME':
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map(
                (dialog: DialogType) => {
                    if (dialog.chatId === action.chatId) {
                        dialog.usersDisplayName = action.allUsers.map(
                            (user) => {
                                const userDisplayName =
                                    user.displayName || user.login;

                                return { userId: user.id, userDisplayName };
                            }
                        );
                    }
                    return dialog;
                }
            );
            return stateCopy;
        case 'SET_OPENED_DIALOG':
            stateCopy.chats.openedDialogId = action.nextDialogId;
            return stateCopy;
        case 'REMOVE_SOCKET':
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map(
                (dialog: DialogType) => {
                    if (dialog.chatId === action.chatId) {
                        dialog.isSocketReady = false;
                        dialog.socket = null;
                    }
                    return dialog;
                }
            );

            return stateCopy;
        default:
            return stateCopy;
    }
};
// ACTION CREATORS
export const actions = {
    enableLoader: () => ({ type: 'ENABLE_LOADER' } as const),
    disableLoader: () => ({ type: 'DISABLE_LOADER' } as const),
    setloginFormError: (loginFormError: string) =>
        ({
            type: 'SET_LOGIN_FORM_ERROR',
            loginFormError,
        } as const),
    setRegistrationFormError: (registrationFormError: string) =>
        ({
            type: 'SET_REGISTRATION_FORM_ERROR',
            registrationFormError,
        } as const),
    setInitialState: () =>
        ({
            type: 'SET_INITIAL_STATE',
        } as const),
    setUser: (userTransferedObject: UserTransferedType | null) =>
        ({
            type: 'SET_USER',
            userTransferedObject,
        } as const),
    setChatsList: (
        chatsList: Array<ChatListItemTransferedType<UserTransferedType>>
    ) =>
        ({
            type: 'SET_CHATS_LIST',
            chatsList,
        } as const),
    setSocket: (chatId: number, socket: WebSocket) =>
        ({
            type: 'SET_SOCKET',
            socket,
            chatId,
        } as const),
    setSocketReady: (chatId: number, ready: boolean) =>
        ({
            type: 'SET_SOCKET_READY',
            ready,
            chatId,
        } as const),
    setMessages: (messages: Array<MessageTransferedType>) =>
        ({
            type: 'SET_MESSAGES',
            messages,
        } as const),
    setUsersDisplayName: (
        allUsers: Array<UserTransferedType>,
        chatId: number
    ) =>
        ({
            type: 'SET_USERS_DISPLAY_NAME',
            allUsers,
            chatId,
        } as const),
    openDialog: (nextDialogId: number) =>
        ({
            type: 'SET_OPENED_DIALOG',
            nextDialogId,
        } as const),
    removeSocket: (chatId: number) =>
        ({
            type: 'REMOVE_SOCKET',
            chatId,
        } as const),
};

export type Dispatch<A extends ActionsTypes> = {
    <T extends A>(action: T, ...extraArgs: any[]): A;
};
export type DispatchThunk = (a: Dispatch<ActionsTypes>) => void;

export const doLogout = () => async (dispatch: DispatchThunk) => {
    try {
        dispatch(() => actions.enableLoader());
        await AuthApi.logout();

        dispatch(() => actions.disableLoader());
        dispatch(() => actions.setInitialState());
        deleteAuthCookie();
        window.router.go('/');
    } catch (e) {
        console.log(`doSomething`, e);
    }
};

export const doLogin =
    (loginData: LoginDataType) => async (dispatch: DispatchThunk) => {
        try {
            dispatch(() => actions.enableLoader());
            const response = await AuthApi.signin({ data: loginData });

            if (apiHasErrors(response.data)) {
                dispatch(() => actions.disableLoader());
                const { reason } = response.data;
                dispatch(() => actions.setloginFormError(reason));
                return false;
            }

            const responseUser = await AuthApi.user();
            dispatch(() => actions.disableLoader());

            if (apiHasErrors(responseUser.data)) {
                // dispatch(thunk)
                dispatch(() => doLogout() as unknown as ActionsTypes);
                return false;
            }

            const userTransferedObject = transformUser(responseUser.data);
            setAuthCookie();
            dispatch(() => actions.setUser(userTransferedObject));

            window.router.go('/messenger');
            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const doRegistrtation =
    (registrationData: RegistrationData) => async (dispatch: DispatchThunk) => {
        try {
            dispatch(() => actions.enableLoader());

            const response = await AuthApi.signup({
                data: registrationData,
            });

            if (apiHasErrors(response.data)) {
                dispatch(() => actions.disableLoader());
                const { reason } = response.data;
                dispatch(() => actions.setRegistrationFormError(reason));
                return false;
            }

            dispatch(() => actions.disableLoader());
            window.router.go('/messenger');
            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const saveUserInfo =
    (inputData: { data: UserProfileType; avatar: FormData | null }) =>
    async (dispatch: DispatchThunk) => {
        try {
            const { data, avatar } = inputData;
            dispatch(() => actions.enableLoader());
            if (avatar !== null) {
                await UserApi.saveProfileAvatar({ data: avatar });
            }

            await UserApi.saveProfile({
                data: JSON.stringify({
                    first_name: data.first_name,
                    second_name: data.second_name,
                    display_name: data.display_name,
                    login: data.login,
                    email: data.email,
                    phone: data.phone,
                }),
            });
            if (!isEmpty(data.newPassword) && !isEmpty(data.oldPassword)) {
                const changePssswordObject: ChangePasswordType = {
                    newPassword: data.newPassword,
                    oldPassword: data.oldPassword,
                };
                await UserApi.savePassword({
                    data: JSON.stringify(changePssswordObject),
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
            }

            dispatch(() => actions.disableLoader());

            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const getUserInfo = () => async (dispatch: DispatchThunk) => {
    try {
        dispatch(() => actions.enableLoader());

        const response = await AuthApi.user();

        if (apiHasErrors(response.data)) {
            dispatch(() => actions.disableLoader());
            return false;
        }
        dispatch(() => actions.disableLoader());

        const userTransferedObject = transformUser(response.data);

        dispatch(() => actions.setUser(userTransferedObject));
        return true;
    } catch (e) {
        console.log(`doSomething`, e);
        return false;
    }
};

// CHAT THUNKs

export const getChatsList = () => async (dispatch: DispatchThunk) => {
    try {
        dispatch(() => actions.enableLoader());
        const response = await ChatApi.getChats({ data: { limit: '10' } });

        dispatch(() => actions.disableLoader());

        if (apiHasErrors(response.data)) {
            return false;
        }
        const chatListTransferedObject = transformChatsList(response.data);

        if (chatListTransferedObject !== null) {
            dispatch(() => actions.setChatsList(chatListTransferedObject));
        } else {
            dispatch(() => actions.setChatsList([]));
        }
        return true;
    } catch (e) {
        console.log(`doSomething`, e);
        return false;
    }
};

export const createChat = () => async (dispatch: DispatchThunk) => {
    try {
        const response = await ChatApi.createChat({
            data: { title: 'Новый чатик' },
        });
        if (apiHasErrors(response.data)) {
            return false;
        }
        const newChatId = response.data.id;
        const userId = window.store.state.user.id;
        const userData = JSON.stringify({ users: [userId], chatId: newChatId });
        const responseAddUserToChat = await ChatApi.addUserToChat({
            data: userData,
        });

        if (apiHasErrors(responseAddUserToChat.data)) {
            return false;
        }

        dispatch(() => getChatsList() as unknown as ActionsTypes);
        return true;
    } catch (e) {
        console.log(`doSomething`, e);
        return false;
    }
};

export const deleteChat =
    (chatid: number) => async (dispatch: DispatchThunk) => {
        try {
            const response = await ChatApi.deleteChat({
                data: { chatId: `${chatid}` },
            });
            if (apiHasErrors(response.data)) {
                return false;
            }
            dispatch(() => getChatsList() as unknown as ActionsTypes);
            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const createWebSocketConnection =
    (chatId: number) => async (dispatch: DispatchThunk) => {
        try {
            const response = await ChatApi.getTokenMessages(chatId);

            if (apiHasErrors(response.data)) {
                return false;
            }
            const { token } = response.data;
            const userId = window.store.state.user.id;

            const socket = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
            );

            dispatch(() => actions.setSocket(chatId, socket));
            let intervalSocketPing: number | null = null;

            socket.addEventListener('open', () => {
                dispatch(() => actions.setSocketReady(chatId, true));

                intervalSocketPing = window.setInterval(() => {
                    socket.send(
                        JSON.stringify({
                            type: 'ping',
                        })
                    );
                }, 5000);
            });

            socket.addEventListener('close', (event) => {
                console.log('close');

                if (intervalSocketPing !== null) {
                    window.clearInterval(intervalSocketPing);
                }

                dispatch(() => actions.setSocketReady(chatId, false));

                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }
                console.log(`Код: ${event.code} причина: ${event.reason}`);
            });

            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                let messages: Array<MessageType> = [];
                if (typeof data === 'object' && data.type === 'message') {
                    messages.push({ ...data, chat_id: chatId });
                } else if (Array.isArray(data)) {
                    messages = data;
                }

                if (messages.length > 0) {
                    const messagesTransferedArray = transformMessages(messages);
                    dispatch(() =>
                        actions.setMessages(messagesTransferedArray)
                    );
                }
            });
            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const sendMessage = (data: SendMessageType) => () => {
    try {
        data.socket.send(
            JSON.stringify({
                content: data.message,
                type: 'message',
            })
        );
    } catch (e) {
        console.log(`doSomething`, e);
    }
};

export const getMessages =
    (chatId: number) => async (dispatch: DispatchThunk) => {
        try {
            const { dialogs }: { dialogs: Array<DialogType> } =
                window.store.state.chats;
            const dialog: DialogType | undefined = dialogs.find(
                (d: DialogType) => d.chatId === chatId
            );
            if (dialog) {
                const { socket, isSocketReady } = dialog;
                if (socket !== null && isSocketReady === true) {
                    socket.send(
                        JSON.stringify({
                            content: '0',
                            type: 'get old',
                        })
                    );
                }
            }

            const allUsersResponse = await ChatApi.getAllUsersInChat(chatId);

            if (apiHasErrors(allUsersResponse.data)) {
                return false;
            }
            const allUsersTransferedArray = transformUsers(
                allUsersResponse.data
            );
            dispatch(() =>
                actions.setUsersDisplayName(allUsersTransferedArray, chatId)
            );
            return true;
        } catch (e) {
            console.log(`doSomething`, e);
            return false;
        }
    };

export const closeAllSockets = () => (dispatch: DispatchThunk) => {
    try {
        const { dialogs } = window.store.state.chats;
        dialogs.forEach((dialog: DialogType) => {
            if (dialog.socket !== null) {
                dialog.socket.close();
                const { chatId } = dialog;
                if (chatId !== null) {
                    dispatch(() => actions.removeSocket(chatId));
                }
            }
        });
    } catch (e) {
        console.log(`doSomething`, e);
    }
};
