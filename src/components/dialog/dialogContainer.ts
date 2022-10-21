import connect from "core/connectHoc";
import { createWebSocketConnection, sendMessage } from "reducers/authReducer";
import Dialog from "./dialog";

const mstp = (state: Indexed<any>): Indexed => ({
    isLoading: state.isLoading,
    store: window.store,
    user: window.store.getState().user,
    loginFormError: window.store.getState().loginFormError,
});

const DialogContainer = connect(mstp, { createWebSocketConnection, sendMessage});

export default DialogContainer(Dialog);
