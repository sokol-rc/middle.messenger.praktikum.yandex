/* eslint-disable */
require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';

import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chat';

//components
import Button from './components/controls/button';
import Input from './components/input';
import { InputInner } from './components/input/inputInner';
import { InputError } from './components/input/error';
import { Avatar } from './components/person/avatar/avatar';
import { Error } from './components/error/error'
import { ChatList } from './components/chat/chat-list';
import { ChatItem } from './components/chat/chat-item';
import { PersonName } from './components/person/person-name';
import { MessagePreview } from './components/message/message-preview';
import { SidebarButton } from './components/controls/sidebar-button/sidebar-button';
import { Sidebar } from './components/sidebar';

import './styles/common/default.css';
import './styles/common/common.css';
import { ModalConfirm } from './components/modals/modal-confirm/';
import { Dialog } from './components/dialog';

registerComponent(Button);
registerComponent(Input);
registerComponent(InputInner);
registerComponent(InputError);
registerComponent(Error);
registerComponent(Avatar);
registerComponent(ChatList);
registerComponent(ChatItem);
registerComponent(PersonName);
registerComponent(Dialog);
registerComponent(MessagePreview);
registerComponent(SidebarButton);
registerComponent(Sidebar);
registerComponent(ModalConfirm);

document.addEventListener('DOMContentLoaded', () => {
    // renderDOM(new ErrorPage({errorNumber: 503}));
    renderDOM(new ChatPage());
});
