import connect from "core/connectHoc";
import { getChatsList } from "reducers/authReducer";
import ChatList from "./chat-list";

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
	store: window.store,
	chatsList: window.store.getState().chats.chatsList
});

const ChatListContainer = connect(mstp, {getChatsList });

export default ChatListContainer(ChatList);
