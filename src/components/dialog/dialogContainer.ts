import connect from "core/connectHoc";
import { createWebSocketConnection, getMessages, sendMessage } from "reducers/authReducer";
import Dialog from "./dialog";

function getopenedDialogById(objectsArray: Array<any>, id: number) {
	const found = objectsArray.find((o) => o.chatId === id)
	return found;
}
const mstp = (state: Indexed<any>): Indexed => {
	const dialog = getopenedDialogById(state.chats.dialogs, state.chats.openedDialogId);
	return { 
		isLoading: state.isLoading,
		user: state.user,
		socket: state.chats.socket,
		openedDialogId: state.chats.openedDialogId,
		openedDialog: dialog
	}

};

const DialogContainer = connect(mstp, { sendMessage, getMessages, createWebSocketConnection});

export default DialogContainer(Dialog);
