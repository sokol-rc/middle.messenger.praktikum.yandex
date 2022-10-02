/* eslint-disable */
require('babel-core/register');
import { renderDOM, registerComponent } from './core';

import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ErrorPage from './pages/errorPage';
import ChatPage from './pages/chat';
import ProfilePage from './pages/profile';

//components
import { Button } from './components/controls/button';
import { Input } from './components/input';
import { InputInner } from './components/input/inputInner';
import { InputError } from './components/input/error';
import { Avatar } from './components/person/avatar/avatar';
import { Error } from './components/error/error';
import { ChatList } from './components/chat/chat-list';
import { ChatItem } from './components/chat/chat-item';
import { PersonName } from './components/person/person-name';
import { MessagePreview } from './components/message/message-preview';
import { SidebarButton } from './components/controls/sidebar-button/sidebar-button';
import { Sidebar } from './components/sidebar';
import { ModalConfirm } from './components/modals/modal-confirm/';
import { Dialog } from './components/dialog';

import './styles/common/default.css';
import './styles/common/common.css';

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

const links: { [x: string]: any } = {
    '/login': LoginPage,
    '/registration': RegistrationPage,
    '/': ChatPage,
    '/profile': ProfilePage,
    '/404': ErrorPage,
    '/500': ErrorPage,
};

const routing = (route: string | Event) => {
    let href: string = '';
    if (typeof route === 'string') {
        href = route;
    } else {
        href = document.location.pathname;
    }
    if (href in links) {
        renderDOM(new links[href]());
    } else {
        renderDOM(new links[href]({ errorNumber: 404 }));
    }
};

(window as any).routing = routing;
document.addEventListener('DOMContentLoaded', routing);
