import { RegistrationData } from 'pages/registration/registration';
import { deleteAuthCookie, setAuthCookie } from 'services/cookie';
import apiHasErrors from 'utils/api/api-has-errors';
import { transformChatsList, transformUser } from 'utils/api/apiTransformers';
import AuthApi from 'utils/api/auth-api';
import ChatApi from 'utils/api/chatApi';
import { Options } from 'utils/api/httptransport';
import UserApi from 'utils/api/userApi';
import cloneDeep from 'utils/helpers/cloneDeep';
import isContain from 'utils/helpers/isContain';
import isEqual from 'utils/helpers/isequal';

const ENABLE_LOADER = 'ENABLE_LOADER';
const DISABLE_LOADER = 'DISABLE_LOADER';
const SET_LOGIN_FORM_ERROR = 'SET_LOGIN_FORM_ERROR';
const SET_REGISTRATION_FORM_ERROR = 'SET_REGISTRATION_FORM_ERROR';
const SET_USER = 'SET_USER';
const SET_CHATS_LIST = 'SET_CHATS_LIST';
const SET_SOCKET = 'SET_SOCKET';
const SET_SOCKET_READY = 'SET_SOCKET_READY';

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
			console.log(stateCopy);
			
			stateCopy.chats.dialogs = stateCopy.chats.dialogs.map((dialog) => {

                if (dialog.chatId === action.chatId) {
                    dialog.isSocketReady = action.ready;
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
    const response = await ChatApi.getTokenMessages(`${chatId}`);

    if (apiHasErrors(response)) {
        const { reason } = JSON.parse(response.responseText);
        console.log(reason);
        return false;
    }
    const { token } = JSON.parse(response.responseText);

    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/5456/${chatId}/${token}`
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
        console.log(`Получены данные ${event.data}`);
    });

    socket.addEventListener('error', (error) => {
        console.log(`Ошибка ${error.message}`);
    });
};

export const sendMessage = (message) => (dispatch) => {
    window.store.socket.send(
        JSON.stringify({
            content: 'Привет',
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
    if (dialog.socket !== null) {
		console.log('получаю сообщения');
		console.log(dialog.socket);
			const messages = dialog.socket.send(
				JSON.stringify({
					content: '0',
					type: 'get old',
				})
			);
			console.log(messages);
		


        // window.store.state.chats.socket.send(
        //     JSON.stringify({
        //         content: '0',
        //         type: 'get old',
        //     })
        // );
    }
};
