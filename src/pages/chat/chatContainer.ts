import { Component } from 'core/Block';
import connect from 'core/connectHoc';
import { closeAllSockets, getUserInfo } from 'reducers/authReducer';
import ChatPage from './chat';

const mstp = (state: Indexed<any>): Indexed => ({
    user: state.user,
});

const ChatPageContainer = connect(mstp, { getUserInfo, closeAllSockets });

export default ChatPageContainer(ChatPage as Component);
