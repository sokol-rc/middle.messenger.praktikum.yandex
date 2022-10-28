import { DialogType } from 'core/store/initial-store';
import { RootState } from 'index';
import { RegistrationData } from 'pages/registration/registration';
import { deleteAuthCookie, setAuthCookie } from 'services/cookie';
import apiHasErrors from 'utils/api/api-has-errors';
import {
    transformChatsList,
    transformMessages,
    transformUser,
    transformUsers,
} from 'utils/api/apiTransformers';
import AuthApi from 'utils/api/auth-api';
import ChatApi from 'utils/api/chatApi';
import { Options } from 'utils/api/httptransport';
import UserApi from 'utils/api/userApi';
import cloneDeep from 'utils/helpers/cloneDeep';
import {
    getDayById,
    getDayId,
    getDayTextFromDate,
} from 'utils/helpers/dateTime';
import searchInObject from 'utils/helpers/isContain';
import { isMessageInDialog } from 'utils/helpers/messageTools';
import { ActionsTypes } from './actionTypes';
import { DispatchThunk } from './thunkTypes';
import { AllUsersTransferedType } from './transferedTypes';



const ENABLE_LOADER = 'ENABLE_LOADER';
const DISABLE_LOADER = 'DISABLE_LOADER';
const SET_LOGIN_FORM_ERROR = 'SET_LOGIN_FORM_ERROR';
const SET_REGISTRATION_FORM_ERROR = 'SET_REGISTRATION_FORM_ERROR';
const SET_USER = 'SET_USER';
const SET_CHATS_LIST = 'SET_CHATS_LIST';
const CREATE_CHAT = 'CREATE_CHAT';
const DELETE_CHAT = 'DELETE_CHAT';
const SET_SOCKET = 'SET_SOCKET';
const SET_SOCKET_READY = 'SET_SOCKET_READY';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_USERS_DISPLAY_NAME = 'SET_USERS_DISPLAY_NAME';
const SET_OPENED_DIALOG = 'SET_OPENED_DIALOG';

export const authReducer = (
    state: RootState,
    action: ActionsTypes
): RootState => {
    const stateCopy = cloneDeep(state);

    switch (action.type) {
        case ENABLE_LOADER:
            stateCopy.isLoading = true;
            return stateCopy;
        case DISABLE_LOADER:
            stateCopy.isLoading = false;
            return stateCopy;
        case SET_LOGIN_FORM_ERROR:
            stateCopy.loginFormError = action.loginFormError;
            return stateCopy;
        case SET_REGISTRATION_FORM_ERROR:
            stateCopy.registrationFormError = action.registrationFormError;
            return stateCopy;
        case SET_USER:
            stateCopy.user = action.userTransferedObject;
            return stateCopy;
        case CREATE_CHAT:
            return stateCopy;
        case DELETE_CHAT:
            return stateCopy;
        case SET_CHATS_LIST:
            stateCopy.chats.chatsList = action.chatsList;
            stateCopy.chats.chatsList.forEach((list) => {
                if (
                    !searchInObject(list.id, 'chatId', stateCopy.chats.dialogs)
                ) {
                    stateCopy.chats.dialogs.push({
                        chatId: list.id,
                        chatInfoObject: list,
                        socket: null,
                        isSocketReady: false,
                        days: [],
                    });
                }
            });
            stateCopy.chats.chatsListLoaded = true;
            return stateCopy;
        case SET_SOCKET:
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {
                if (dialog.chatId === action.chatId && dialog.socket === null) {
                    console.log('socket to state');

                    dialog.socket = action.socket;
                }
                return dialog;
            });

            return stateCopy;
        case SET_SOCKET_READY:
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {
                if (dialog.chatId === action.chatId) {
                    dialog.isSocketReady = action.ready;
                }
                return dialog;
            });
            return stateCopy;
        case SET_MESSAGES:
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {
                if (action.messages[0].chat_id === dialog.chatId) {
                    action.messages.reverse().map((outsideMessage) => {
                        if (!isMessageInDialog(outsideMessage, dialog)) {
                            const dayId = getDayId(outsideMessage.time);
                            const currentDay = getDayById(dayId, dialog.days);
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
                    dialog.days = dialog.days.sort(
                        (a, b) => parseFloat(a.id) - parseFloat(b.id)
                    );
                }
                dialog.messagesLoaded = true;
                return dialog;
            });
            return stateCopy;
        case SET_USERS_DISPLAY_NAME:
            stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {
                if (dialog.chatId === action.chatId) {
                    dialog.usersDisplayName = action.allUsers.map((user) => {
                        const userDisplayName = user.displayName || user.login;

                        return { userId: user.id, userDisplayName };
                    });
                }
                return dialog;
            });
            return stateCopy;
        case SET_OPENED_DIALOG:
            stateCopy.chats.openedDialogId = action.nextDialogId;
            return stateCopy;
        default:
            return stateCopy;
    }
};
// ACTION CREATORS
export const actions = {
    enableLoader: () => ({ type: ENABLE_LOADER } as const),
    disableLoader: () => ({ type: DISABLE_LOADER } as const),
    setloginFormError: (loginFormError: string) =>
        ({
            type: SET_LOGIN_FORM_ERROR,
            loginFormError,
        } as const),
    setRegistrationFormError: (registrationFormError: string) =>
        ({
            type: SET_REGISTRATION_FORM_ERROR,
            registrationFormError,
        } as const),
    setUser: (userTransferedObject: any) =>
        ({
            type: SET_USER,
            userTransferedObject,
        } as const),
    setChatsList: (chatsList: any) =>
        ({
            type: SET_CHATS_LIST,
            chatsList,
        } as const),
    setSocket: (chatId: number, socket: any) =>
        ({
            type: SET_SOCKET,
            socket,
            chatId,
        } as const),
    setSocketReady: (chatId: number, ready: boolean) =>
        ({
            type: SET_SOCKET_READY,
            ready,
            chatId,
        } as const),
    setMessages: (messages) =>
        ({
            type: SET_MESSAGES,
            messages,
        } as const),
    setUsersDisplayName: (
        allUsers: Array<AllUsersTransferedType>,
        chatId: number
    ) =>
        ({
            type: SET_USERS_DISPLAY_NAME,
            allUsers,
            chatId,
        } as const),
    openDialog: (nextDialogId: number) =>
        ({
            type: SET_OPENED_DIALOG,
            nextDialogId,
        } as const),
    removeChatFromStore: (chatId: number) =>
        ({
            type: DELETE_CHAT,
            chatId,
        } as const),
    addChatToStore: () =>
        ({
            type: CREATE_CHAT,
        } as const),
};

// THUNKS
export const doLogout = () => async (dispatch) => {
    dispatch(() => actions.enableLoader());

    localStorage.removeItem('user');
    await AuthApi.logout();

    dispatch(() => actions.disableLoader());
    dispatch(() => actions.setUser({}));

    deleteAuthCookie();

    window.router.go('/');
};

export const doLogin = (loginData: any) => async (dispatch) => {
    dispatch(() => actions.enableLoader());
    const response = await AuthApi.signin({ data: loginData });

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        dispatch(() => actions.disableLoader());
        dispatch(() => actions.setloginFormError(reason));
        return false;
    }

    const responseUser = await AuthApi.user();
    dispatch(() => actions.disableLoader());

    if (apiHasErrors(responseUser)) {
        console.log(responseUser.responseText);
        dispatch(() => actions.doLogout());
        return false;
    }
    const userTransferedObject = transformUser(responseUser.responseText);
    setAuthCookie();
    dispatch(() => actions.setUser(userTransferedObject));

    window.router.go('/');
    return true;
};

export const doRegistrtation =
    (registrationData: RegistrationData) => async (dispatch) => {
        dispatch(() => actions.enableLoader());

        const response = await AuthApi.signup({
            data: JSON.stringify(registrationData),
        });

        if (apiHasErrors(response)) {
            console.log(response.responseText);
            const { reason } = JSON.parse(response.responseText);
            dispatch(() => actions.disableLoader());
            dispatch(() => actions.setRegistrationFormError(reason));

            return false;
        }
        dispatch(() => actions.disableLoader());
        window.router.go('/');
        return true;
    };
export const saveUserInfo = (data) => async (dispatch) => {
    dispatch(() => actions.enableLoader());

    if ('avatar' in data && data.avatar !== '') {
        await UserApi.saveProfileAvatar({ data: data.avatar });
    }

    const response = await UserApi.saveProfile({ data });

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        dispatch(() => actions.disableLoader());
        // dispatch(() => setRegistrationFormError(reason));

        return false;
    }
    dispatch(() => actions.disableLoader());

    return true;
};

export const getUserInfo = () => async (dispatch) => {
    dispatch(() => actions.enableLoader());

    const response = AuthApi.user();
    response.then((response) => {
        if (apiHasErrors(response)) {
            console.log(response.responseText);
            const { reason } = JSON.parse(response.responseText);
            dispatch(() => actions.disableLoader());
            return false;
        }
        dispatch(() => actions.disableLoader());

        const userTransferedObject = transformUser(response.responseText);

        dispatch(() => actions.setUser(userTransferedObject));
        return true;
    });
};

// CHAT REDUCER

export const createChat = () => async (dispatch) => {
    const responseCreateChat = await ChatApi.createChat({
        data: { title: 'Новый чатик' },
    });
    if (apiHasErrors(responseCreateChat)) {
        console.log(responseCreateChat.responseText);
        return false;
    }
    const newChatId = JSON.parse(responseCreateChat.responseText);
    const userId = window.store.state.user.id;
    const userData = JSON.stringify({ users: [userId], chatId: newChatId.id });
    const responseAddUserToChat = await ChatApi.addUserToChat({
        data: userData,
    });

    if (apiHasErrors(responseAddUserToChat)) {
        console.log(responseAddUserToChat.responseText);
        return false;
    }

    dispatch(() => actions.addChatToStore());
    return true;
};

export const deleteChat = (chatid: number) => async (dispatch) => {
    const response = await ChatApi.deleteChat({
        data: { chatId: `${chatid}` },
    });
    if (apiHasErrors(response)) {
        console.log(response.responseText);
        return false;
    }
    dispatch(() => actions.removeChatFromStore(chatid));
    return true;
};

// TODO загружать все сообщения чата, а не только 20 последних
export const getChatsList = (options: Options) => async (dispatch) => {
    dispatch(() => actions.enableLoader());

    const response = await ChatApi.getChats({ data: { limit: 10 } });

    dispatch(() => actions.disableLoader());

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        return false;
    }

    const chatListTransferedObject = transformChatsList(response.responseText);
    dispatch(() => actions.setChatsList(chatListTransferedObject));
    return true;
};

// TODO: это нечто странное
export const createWebSocketConnection = (chatId: number) => async (dispatch: DispatchThunk) => {
    // TODO: заменить user_id, chat_id
    const response = await ChatApi.getTokenMessages(chatId);

    if (apiHasErrors(response)) {
        const { reason } = JSON.parse(response.responseText);
        console.log(reason);
        return false;
    }
    const { token } = JSON.parse(response.responseText);
    const userId = window.store.state.user.id;

    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    dispatch(() => socket(chatId, socket));
    let intervalSocketPing = null;

    socket.addEventListener('open', () => {
        console.log('Соединение установлено.');
        dispatch(() => actions.setSocketReady(chatId, true));

        intervalSocketPing = setInterval(() => {
            socket.send(
                JSON.stringify({
                    type: 'ping',
                })
            );
        }, 5000);
    });

    socket.addEventListener('close', (event) => {
        if (intervalSocketPing !== null) {
            window.clearInterval(intervalSocketPing);
        }

        dispatch(() => actions.setSocketReady(chatId, true));

        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log(`Код: ${event.code} причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
        console.log(event.data);

        const data = JSON.parse(event.data);
        let messages = [];
        if (typeof data === 'object' && data.type === 'message') {
            messages.push({ ...data, chat_id: chatId });
        } else if (Array.isArray(data)) {
            messages = data;
        }

        if (messages.length > 0) {
            const messagesTransferedArray = transformMessages(messages);
            dispatch(() => actions.setMessages(messagesTransferedArray));
        }
    });

    socket.addEventListener('error', (error) => {
        console.log(`Ошибка ${error.message}`);
    });
};

export const sendMessage = (data: any) => (dispatch: DispatchThunk) => {
    data.socket.send(
        JSON.stringify({
            content: data.message,
            type: 'message',
        })
    );
};

export const getMessages =
    (chatId: number) => async (dispatch: DispatchThunk) => {
        const { dialogs }: { dialogs: Array<DialogType> } =
            window.store.state.chats;
        const dialog: DialogType | undefined = dialogs.find(
            (d: DialogType) => d.chatId === chatId
        );

        if (dialog && dialog.isSocketReady === true) {
            dialog.socket.send(
                JSON.stringify({
                    content: '0',
                    type: 'get old',
                })
            );
        }
        const allUsersResponse = await ChatApi.getAllUsersInChat(chatId);
        const allUsersTransferedArray: Array<AllUsersTransferedType> =
            transformUsers(allUsersResponse.responseText);
        dispatch(() =>
            actions.setUsersDisplayName(allUsersTransferedArray, chatId)
        );
    };
