import { RegistrationData } from 'pages/registration/registration';
import { deleteAuthCookie, setAuthCookie } from 'services/cookie';
import apiHasErrors from 'utils/api/api-has-errors';
import { transformChatsList, transformUser } from 'utils/api/apiTransformers';
import AuthApi from 'utils/api/auth-api';
import ChatApi from 'utils/api/chatApi';
import { Options } from 'utils/api/httptransport';
import cloneDeep from 'utils/helpers/cloneDeep';
import isEqual from 'utils/helpers/isequal';

const ENABLE_LOADER = 'ENABLE_LOADER';
const DISABLE_LOADER = 'DISABLE_LOADER';
const SET_LOGIN_FORM_ERROR = 'SET_LOGIN_FORM_ERROR';
const SET_REGISTRATION_FORM_ERROR = 'SET_REGISTRATION_FORM_ERROR';
const SET_USER = 'SET_USER';
const SET_CHATS_LIST = 'SET_CHATS_LIST';
const SET_SOCKET = 'SET_SOCKET';

export const authReducer = (state, action) => {
    const stateCopy = { ...state };
    const stateCopyDeep = cloneDeep(state);
    // console.log(
    //     `Копии объектов authResucer равны?: ${isEqual(
    //         stateCopy,
    //         stateCopyDeep
    //     )}`
    // );

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
            stateCopy.chats.chatsList = action.chatsList
            return stateCopy;
        case SET_SOCKET:
            stateCopy.chats.socket = action.socket
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
export const setSocket = (socket: any) => ({
    type: SET_SOCKET,
    socket,
});

// THUNKS
export const doLogout = () => async (dispatch) => {
    dispatch(() => enableLoader());

    localStorage.removeItem('user');
    await AuthApi.logout();

    dispatch(() => disableLoader());
	dispatch(() => setUser({}));
	
	deleteAuthCookie();
	
    window.router.go('/login');
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

export const doRegistrtation = (registrationData: RegistrationData) => { 
	console.log('reducer: doRegistrtation');
	return async (dispatch) => { 
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
	}
}

// CHAT REDUCER

export const getChatsList = (options: Options) => { 
	console.log('reduce: getChatsList');
	
	return async (dispatch) => { 
		dispatch(() => enableLoader());
		const response = await ChatApi.getChats({ limit: 10 });

        if (apiHasErrors(response)) {
            console.log(response.responseText);
            const { reason } = JSON.parse(response.responseText);
			dispatch(() => disableLoader());
            return false;
		}

		const chatListTransferedObject = transformChatsList(response.responseText);
		dispatch(() => disableLoader());
		dispatch(() => setChatsList(chatListTransferedObject))
		return true;
		
	}

}

export const createWebSocketConnection = () => async (dispatch) => { 
		// TODO: заменить user_id, chat_id
		dispatch(() => enableLoader());
	const response = await ChatApi.getTokenMessages('430');

	if (apiHasErrors(response)) {
		console.log(response.responseText);
		const { reason } = JSON.parse(response.responseText);
		dispatch(() => disableLoader());
		return false;
	}
	const {token} = JSON.parse(response.responseText);
		
	const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/5456/430/${token}`); 

	socket.onopen = function() {
		console.log("Соединение установлено.");
		dispatch(() => setSocket(socket));
	  };
	  
	  socket.onclose = function(event) {
		if (event.wasClean) {
		  console.log('Соединение закрыто чисто');
		} else {
		  console.log('Обрыв соединения'); // например, "убит" процесс сервера
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	  };
	  
	  socket.onmessage = function(event) {
		console.log("Получены данные " + event.data);
	  };
	  
	  socket.onerror = function(error) {
		console.log("Ошибка " + error.message);
	  };
	}

export const sendMessage = (message) => (dispatch) => { 
	window.store.socket.send(JSON.stringify({
		content: 'Привет',
		type: 'message'
	}));
	}
