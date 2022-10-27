import connect from 'core/connectHoc';
import { createChat, getChatsList, openDialog } from 'reducers/authReducer';
import ChatList from './chat-list';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    chatsList: state.chats.chatsList,
    openedDialogId: state.chats.openedDialogId,
});

const ChatListContainer = connect(mstp, {
    getChatsList,
    openDialog,
    createChat,
});

export default ChatListContainer(ChatList);