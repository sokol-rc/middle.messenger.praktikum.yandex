import { RegistrationData } from 'pages/registration/registration';
import { parse } from 'path';
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
import isContain from 'utils/helpers/isContain';
import { isMessageInDialog } from 'utils/helpers/messageTools';

const ENABLE_LOADER = 'ENABLE_LOADER';
const DISABLE_LOADER = 'DISABLE_LOADER';
const SET_LOGIN_FORM_ERROR = 'SET_LOGIN_FORM_ERROR';
const SET_REGISTRATION_FORM_ERROR = 'SET_REGISTRATION_FORM_ERROR';
const SET_USER = 'SET_USER';
const SET_CHATS_LIST = 'SET_CHATS_LIST';
const SET_SOCKET = 'SET_SOCKET';
const SET_SOCKET_READY = 'SET_SOCKET_READY';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_USERS_DISPLAY_NAME = 'SET_USERS_DISPLAY_NAME';

export const authReducer = (state, action) => {
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
        case SET_CHATS_LIST:
            stateCopy.chats.chatsList = action.chatsList;
            action.chatsList.forEach((list) => {
                if (!isContain(list.id, 'chatId', stateCopy.chats.dialogs)) {
                    stateCopy.chats.dialogs.push({
                        chatId: list.id,
                        socket: null,
                        isSocketReady: false,
                        days: [],
                    });
                }
            });
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
                return dialog;
            });
			return stateCopy;
		case SET_USERS_DISPLAY_NAME:
			stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {
                if (dialog.chatId === action.chatId) {
					dialog.usersDisplayName = action.allUsers.map((user) => { 
						const userDisplayName = user.displayName || user.login;
						
						return {userId: user.id, userDisplayName}
					})
                }
                return dialog;
            });
			return stateCopy;
        default:
            return stateCopy;
    }
};
// ACTION CREATORS
export const enableLoader = () => ({ type: ENABLE_LOADER });
export const disableLoader = () => ({ type: DISABLE_LOADER });
export const setloginFormError = (loginFormError: string) => ({
    type: SET_LOGIN_FORM_ERROR,
    loginFormError,
});
export const setRegistrationFormError = (registrationFormError: string) => ({
    type: SET_REGISTRATION_FORM_ERROR,
    registrationFormError,
});
export const setUser = (userTransferedObject: any) => ({
    type: SET_USER,
    userTransferedObject,
});
export const setChatsList = (chatsList: any) => ({
    type: SET_CHATS_LIST,
    chatsList,
});
export const setSocket = (chatId: number, socket: any) => ({
    type: SET_SOCKET,
    socket,
    chatId,
});
export const setSocketReady = (chatId: number, ready: boolean) => ({
    type: SET_SOCKET_READY,
    ready,
    chatId,
});
export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    messages,
});
export const setUsersDisplayName = (allUsers, chatId) => ({
    type: SET_USERS_DISPLAY_NAME,
    allUsers,
    chatId,
});

// THUNKS
export const doLogout = () => async (dispatch) => {
    dispatch(() => enableLoader());

    localStorage.removeItem('user');
    await AuthApi.logout();

    dispatch(() => disableLoader());
    dispatch(() => setUser({}));

    deleteAuthCookie();

    window.router.go('/');
};

export const doLogin = (loginData: any) => async (dispatch) => {
    dispatch(() => enableLoader());
    const response = await AuthApi.signin({ data: loginData });

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        dispatch(() => disableLoader());
        dispatch(() => setloginFormError(reason));
        return false;
    }

    const responseUser = await AuthApi.user();
    dispatch(() => disableLoader());

    if (apiHasErrors(responseUser)) {
        console.log(responseUser.responseText);
        dispatch(() => doLogout());
        return false;
    }
    const userTransferedObject = transformUser(responseUser.responseText);
    setAuthCookie();
    dispatch(() => setUser(userTransferedObject));

    window.router.go('/');
    return true;
};

export const doRegistrtation =
    (registrationData: RegistrationData) => async (dispatch) => {
        dispatch(() => enableLoader());

        const response = await AuthApi.signup({ data: registrationData });

        if (apiHasErrors(response)) {
            console.log(response.responseText);
            const { reason } = JSON.parse(response.responseText);
            dispatch(() => disableLoader());
            dispatch(() => setRegistrationFormError(reason));

            return false;
        }
        dispatch(() => disableLoader());
        window.router.go('/');
        return true;
    };
export const saveUserInfo = (data) => async (dispatch) => {
    dispatch(() => enableLoader());

    if ('avatar' in data && data.avatar !== '') {
        await UserApi.saveProfileAvatar({ data: data.avatar });
    }

    const response = await UserApi.saveProfile({ data });

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        dispatch(() => disableLoader());
        // dispatch(() => setRegistrationFormError(reason));

        return false;
    }
    dispatch(() => disableLoader());

    return true;
};

export const getUserInfo = () => async (dispatch) => {
    dispatch(() => enableLoader());

    const response = AuthApi.user();
    response.then((response) => {
        if (apiHasErrors(response)) {
            console.log(response.responseText);
            const { reason } = JSON.parse(response.responseText);
            dispatch(() => disableLoader());
            return false;
        }
        dispatch(() => disableLoader());

        const userTransferedObject = transformUser(response.responseText);

        dispatch(() => setUser(userTransferedObject));
        return true;
    });
};

// CHAT REDUCER
//TODO загружать все сообщения чата, а не только 20 последних
export const getChatsList = (options: Options) => async (dispatch) => {
    dispatch(() => enableLoader());

    const response = await ChatApi.getChats({ limit: 10 });

    dispatch(() => disableLoader());

    if (apiHasErrors(response)) {
        console.log(response.responseText);
        const { reason } = JSON.parse(response.responseText);
        return false;
    }

    const chatListTransferedObject = transformChatsList(response.responseText);
    dispatch(() => setChatsList(chatListTransferedObject));
    return true;
};

// TODO: это нечто странное
export const createWebSocketConnection = (chatId) => async (dispatch) => {
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

    dispatch(() => setSocket(chatId, socket));
    let intervalSocketPing = null;

    socket.addEventListener('open', () => {
        console.log('Соединение установлено.');
        dispatch(() => setSocketReady(chatId, true));

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

        dispatch(() => setSocketReady(chatId, true));

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
            dispatch(() => setMessages(messagesTransferedArray));
        }

    });

    socket.addEventListener('error', (error) => {
        console.log(`Ошибка ${error.message}`);
    });
};

export const sendMessage = (data) => (dispatch) => {
    console.log(data.socket);

    data.socket.send(
        JSON.stringify({
            content: data.message.message,
            type: 'message',
        })
    );
};

export const getMessages = (chatId) => async (dispatch) => {
    if (window.store.state.chats.chatsList === null) {
        return false;
    }

    const dialogs = window.store.state.chats.dialogs;

    const dialog = dialogs.find((dialog) => dialog.chatId === chatId);
    if (dialog.isSocketReady === true) {
        dialog.socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            })
        );
	}
	const allUsersResponse = await ChatApi.getAllUsersInChat(chatId);
	const allUsersTransferedArray = transformUsers(allUsersResponse.responseText);
	 dispatch(() => setUsersDisplayName(allUsersTransferedArray, chatId))
	
};
