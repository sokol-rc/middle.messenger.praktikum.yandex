import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import {
    createWebSocketConnection,
    getMessages,
    sendMessage,
} from 'reducers/authReducer';
import { selectOpenedDialogById } from 'utils/selectors/messagesSelectors';
import Dialog from './dialog';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    chatListLoaded: state.chats.chatsListLoaded,
    user: state.user,
    openedDialogId: state.chats.openedDialogId,
    openedDialog: selectOpenedDialogById(state),
});

const DialogContainer = connect(mstp, {
    sendMessage,
    getMessages,
    createWebSocketConnection,
});

export default DialogContainer(Dialog as Component);
