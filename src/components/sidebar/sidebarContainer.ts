import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { deleteChat } from 'reducers/authReducer';
import { selectOpenedDialogById } from 'utils/selectors/messagesSelectors';
import Sidebar from './sidebar';

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    chatInfo: state.chats.chatsList,
    openedDialogId: state.chats.openedDialogId,
    chatsListLoaded: state.chats.chatsListLoaded,
    openedDialog: selectOpenedDialogById(state),
});

const SideBarContainer = connect(mstp, { deleteChat });

export default SideBarContainer(Sidebar as Component);
