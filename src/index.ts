import Router from 'core/routing/router';
import { Store } from 'core/store/store';
import initialStore from 'core/store/initial-store';
import { initRouter } from 'services/initApp';
import { registerComponent } from './core';

import Button from './components/controls/button';
import Input from './components/input';
import InputInner from './components/input/input-inner/input-inner';
import InputError from './components/input/input-error/input-error';
import Avatar from './components/person/avatar/avatar';
import Error from './components/error/error';
import ChatList from './components/chat/chat-list';
import ChatListContainer from './components/chat/chat-list/chatListContainer';
import ChatItem from './components/chat/chat-item/chat-item';
import PersonName from './components/person/person-name';
import MessagePreview from './components/message/message-preview';
import SidebarButton from './components/controls/sidebar-button/sidebar-button';
import Sidebar from './components/sidebar';
import SideBarContainer from './components/sidebar/sidebarContainer';
import ModalConfirm from './components/modals/modal-confirm';
import Dialog from './components/dialog';
import DialogContainer from './components/dialog/dialogContainer';
import Form from './components/form';
import Link from './components/controls/link';
import DayContainer from './components/message/day-container';
import Message from './components/message/message';
import Loader from './components/loader';
import NavSidebar from './components/navSidebar';
import NavSidebarContainer from './components/navSidebar/navSidebarContainer';
import DivLikeInput from './components/divlikeinput';

import './styles/common/default.css';
import './styles/common/common.css';
import { authReducer } from './reducers/authReducer';

require('babel-core/register');

registerComponent(Button);
registerComponent(DivLikeInput);
registerComponent(Input);
registerComponent(InputInner);
registerComponent(InputError);
registerComponent(Error);
registerComponent(Avatar);
registerComponent(ChatList);
registerComponent(ChatListContainer);
registerComponent(ChatItem);
registerComponent(PersonName);
registerComponent(Dialog);
registerComponent(DialogContainer);
registerComponent(MessagePreview);
registerComponent(SidebarButton);
registerComponent(Sidebar);
registerComponent(SideBarContainer);
registerComponent(ModalConfirm);
registerComponent(Form);
registerComponent(Link);
registerComponent(DayContainer);
registerComponent(Message);
registerComponent(Loader);
registerComponent(NavSidebar);
registerComponent(NavSidebarContainer);

const store: Store = new Store(initialStore, authReducer);
export type RootStateType = ReturnType<typeof store.getState>;

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('.app');

    window.store = store;
    window.router = router;

    initRouter(router);
});
