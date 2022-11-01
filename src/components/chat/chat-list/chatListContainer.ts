import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { actions, createChat, getChatsList } from 'reducers/authReducer';
import ChatList from './chat-list';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    chatsList: state.chats.chatsList,
    openedDialogId: state.chats.openedDialogId,
});

const ChatListContainer = connect(mstp, {
    getChatsList,
    openDialog: actions.openDialog,
    createChat,
});

export default ChatListContainer(ChatList as Component);
