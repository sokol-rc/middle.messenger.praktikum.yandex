import connect from 'core/connectHoc';
import { getUserInfo } from 'reducers/authReducer';
import ChatPage from './chat';

const mstp = (state: Indexed<any>): Indexed => ({
    store: window.store,
    user: window.store.getState().user,
});

const ChatPageContainer = connect(mstp, {getUserInfo});

export default ChatPageContainer(ChatPage);
